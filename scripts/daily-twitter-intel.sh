#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

DATE=$(date -u +%Y-%m-%d)
OUT="intel/twitter/${DATE}.md"
TRANSCRIPTS_DIR="intel/twitter/transcripts"
mkdir -p intel/twitter "$TRANSCRIPTS_DIR"

API_KEY="${TWITTERAPI_IO_KEY:?Missing TWITTERAPI_IO_KEY env var}"
ACCOUNTS=("dotta" "gregisenberg" "startupideaspod" "ColosseumOrg")

WHISPER_BIN="${WHISPER_BIN:-$(command -v whisper || echo whisper)}"
FFMPEG_BIN="${FFMPEG_BIN:-$(command -v ffmpeg || echo ffmpeg)}"

# Cleanup temp files on exit
trap 'rm -f /tmp/tweet_video_*.mp4 /tmp/tweet_audio_*.wav /tmp/video_queue_*.txt' EXIT

echo "# Twitter Intel — ${DATE}" > "$OUT"
echo "" >> "$OUT"

for ACCOUNT in "${ACCOUNTS[@]}"; do
  echo "## @${ACCOUNT}" >> "$OUT"
  echo "" >> "$OUT"

  # Fetch tweets and extract text + video URLs
  RESPONSE=$(curl -s "https://api.twitterapi.io/twitter/user/last_tweets?userName=${ACCOUNT}&limit=10" \
    -H "X-API-Key: ${API_KEY}")

  # Write tweet intel + detect videos
  echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    tweets = data.get('data', {}).get('tweets', [])
    if not tweets:
        print('No recent tweets found.')
        print()
    for t in tweets:
        text = t.get('text', '').replace('\n', '\n> ')[:500]
        url = t.get('url', '')
        tweet_id = t.get('id', '')
        created = t.get('createdAt', '?')
        likes = t.get('likeCount', 0)
        rts = t.get('retweetCount', 0)
        views = t.get('viewCount', 0)
        replies = t.get('replyCount', 0)
        is_reply = t.get('isReply', False)
        reply_to = t.get('inReplyToUsername', '')

        # Check for video in extended entities
        has_video = False
        video_url = ''
        duration_sec = 0
        ext = t.get('extendedEntities', {})
        for m in ext.get('media', []):
            if m.get('type') == 'video':
                has_video = True
                duration_sec = m.get('video_info', {}).get('duration_millis', 0) // 1000
                # Pick highest bitrate mp4
                variants = m.get('video_info', {}).get('variants', [])
                mp4s = [v for v in variants if v.get('content_type') == 'video/mp4']
                if mp4s:
                    # Prefer 360p (832k) for fast downloads, fall back to lowest available
                    target = [v for v in mp4s if v.get('bitrate', 0) == 832000]
                    best = target[0] if target else min(mp4s, key=lambda v: v.get('bitrate', 999999999))
                    video_url = best.get('url', '')

        # Also check quoted tweet for videos
        qt = t.get('quoted_tweet') or t.get('quotedTweet') or {}
        if qt and not has_video:
            qext = qt.get('extendedEntities', {})
            for m in qext.get('media', []):
                if m.get('type') == 'video':
                    has_video = True
                    duration_sec = m.get('video_info', {}).get('duration_millis', 0) // 1000
                    variants = m.get('video_info', {}).get('variants', [])
                    mp4s = [v for v in variants if v.get('content_type') == 'video/mp4']
                    if mp4s:
                        target = [v for v in mp4s if v.get('bitrate', 0) == 832000]
                        best = target[0] if target else min(mp4s, key=lambda v: v.get('bitrate', 999999999))
                        video_url = best.get('url', '')

        print(f'### [{created}]({url})')
        print(f'> {text}')
        print(f'')
        print(f'Likes: {likes} | RT: {rts} | Replies: {replies} | Views: {views}')
        if is_reply and reply_to:
            print(f'Reply to: @{reply_to}')
        if has_video:
            mins = duration_sec // 60
            secs = duration_sec % 60
            print(f'VIDEO DETECTED: {mins}m{secs}s')
            print(f'TRANSCRIPT: [transcripts/{tweet_id}.md](transcripts/{tweet_id}.md)')
            # Output video info to stderr for the bash script to pick up
            import sys as _s
            _s.stderr.write(f'VIDEO|{tweet_id}|{video_url}|{duration_sec}\n')
        print()
except Exception as e:
    print(f'Error fetching @${ACCOUNT}: {e}')
    print()
" >> "$OUT" 2>/tmp/video_queue_${ACCOUNT}.txt || echo "Error fetching @${ACCOUNT}" >> "$OUT"

  echo "---" >> "$OUT"
  echo "" >> "$OUT"

  # Process video queue — download + transcribe
  if [ -f "/tmp/video_queue_${ACCOUNT}.txt" ] && [ -s "/tmp/video_queue_${ACCOUNT}.txt" ]; then
    while IFS='|' read -r TAG TWEET_ID VIDEO_URL DURATION; do
      if [ "$TAG" != "VIDEO" ] || [ -z "$VIDEO_URL" ]; then
        continue
      fi

      TRANSCRIPT_FILE="${TRANSCRIPTS_DIR}/${TWEET_ID}.md"

      # Skip if already transcribed
      if [ -f "$TRANSCRIPT_FILE" ]; then
        echo "  [skip] ${TWEET_ID} already transcribed"
        continue
      fi

      # Skip very short clips (<30s) — not worth transcribing
      if [ "$DURATION" -lt 30 ] 2>/dev/null; then
        echo "  [skip] ${TWEET_ID} too short (${DURATION}s)"
        continue
      fi

      echo "  [transcribe] ${TWEET_ID} (${DURATION}s) from @${ACCOUNT}..."

      # Download video (360p for speed)
      TMP_VIDEO="/tmp/tweet_video_${TWEET_ID}.mp4"
      TMP_AUDIO="/tmp/tweet_audio_${TWEET_ID}.wav"

      # Download video (360p preferred for speed)
      if curl -sL --max-time 180 -o "$TMP_VIDEO" "$VIDEO_URL" 2>/dev/null && [ -s "$TMP_VIDEO" ]; then
        # Extract audio
        if "$FFMPEG_BIN" -i "$TMP_VIDEO" -vn -acodec pcm_s16le -ar 16000 -ac 1 "$TMP_AUDIO" -y 2>/dev/null; then
          # Transcribe with Whisper (small model for speed on daily runs)
          TRANSCRIPT=$("$WHISPER_BIN" "$TMP_AUDIO" --model small --language en --output_format txt --output_dir /tmp 2>/dev/null && cat "/tmp/$(basename "$TMP_AUDIO" .wav).txt" 2>/dev/null || echo "(transcription failed)")

          # Write transcript file
          cat > "$TRANSCRIPT_FILE" << TEOF
# Transcript: @${ACCOUNT} — ${TWEET_ID}

**Source**: https://x.com/${ACCOUNT}/status/${TWEET_ID}
**Duration**: $((DURATION / 60))m$((DURATION % 60))s
**Transcribed**: $(date -u +%Y-%m-%dT%H:%M:%SZ)
**Model**: whisper-small

---

${TRANSCRIPT}
TEOF

          echo "    -> saved to ${TRANSCRIPT_FILE} ($(wc -l < "$TRANSCRIPT_FILE") lines)"
        else
          echo "    -> ffmpeg failed for ${TWEET_ID}"
        fi

        # Cleanup temp files
        rm -f "$TMP_VIDEO" "$TMP_AUDIO" "/tmp/$(basename "$TMP_AUDIO" .wav).txt"
      else
        echo "    -> download failed for ${TWEET_ID}"
      fi
    done < "/tmp/video_queue_${ACCOUNT}.txt"
  fi

  rm -f "/tmp/video_queue_${ACCOUNT}.txt"
done

echo ""
echo "Twitter intel saved to ${OUT}"
echo "Transcripts in ${TRANSCRIPTS_DIR}/"
