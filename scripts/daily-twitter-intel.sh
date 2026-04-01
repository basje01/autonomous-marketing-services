#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

DATE=$(date -u +%Y-%m-%d)
TRANSCRIPTS_DIR="intel/twitter/transcripts"
mkdir -p intel/twitter "$TRANSCRIPTS_DIR"

API_KEY="${TWITTERAPI_IO_KEY:?Missing TWITTERAPI_IO_KEY env var}"

WHISPER_BIN="${WHISPER_BIN:-$(command -v whisper || echo whisper)}"
FFMPEG_BIN="${FFMPEG_BIN:-$(command -v ffmpeg || echo ffmpeg)}"

VIDEO_QUEUE="/tmp/video_queue_${DATE}.txt"

# Cleanup temp files on exit
trap 'rm -f /tmp/tweet_video_*.mp4 /tmp/tweet_audio_*.wav "$VIDEO_QUEUE"' EXIT

# === Phase 1: Fetch tweets via TypeScript service ===
# Delegates to the industrial-grade TwitterClient with Zod validation,
# retries, rate-limit awareness, and llms.txt-formatted output.

echo "[daily-twitter-intel] Fetching tweets via TypeScript service..."
npx tsx scripts/fetch-tweets.ts daily --video-queue "$VIDEO_QUEUE"

echo "[daily-twitter-intel] Tweets saved to intel/twitter/${DATE}.md + .json"

# === Phase 2: Video transcription (ffmpeg + whisper) ===
# Reads the video queue produced by Phase 1 and transcribes each video.

if [ -f "$VIDEO_QUEUE" ] && [ -s "$VIDEO_QUEUE" ]; then
  echo "[daily-twitter-intel] Processing video queue..."

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

    # Skip very short clips (<30s)
    if [ "$DURATION" -lt 30 ] 2>/dev/null; then
      echo "  [skip] ${TWEET_ID} too short (${DURATION}s)"
      continue
    fi

    echo "  [transcribe] ${TWEET_ID} (${DURATION}s)..."

    TMP_VIDEO="/tmp/tweet_video_${TWEET_ID}.mp4"
    TMP_AUDIO="/tmp/tweet_audio_${TWEET_ID}.wav"

    if curl -sL --max-time 180 -o "$TMP_VIDEO" "$VIDEO_URL" 2>/dev/null && [ -s "$TMP_VIDEO" ]; then
      if "$FFMPEG_BIN" -i "$TMP_VIDEO" -vn -acodec pcm_s16le -ar 16000 -ac 1 "$TMP_AUDIO" -y 2>/dev/null; then
        TRANSCRIPT=$("$WHISPER_BIN" "$TMP_AUDIO" --model small --language en --output_format txt --output_dir /tmp 2>/dev/null && cat "/tmp/$(basename "$TMP_AUDIO" .wav).txt" 2>/dev/null || echo "(transcription failed)")

        cat > "$TRANSCRIPT_FILE" << TEOF
# Transcript: ${TWEET_ID}

**Source**: https://x.com/i/status/${TWEET_ID}
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

      rm -f "$TMP_VIDEO" "$TMP_AUDIO" "/tmp/$(basename "$TMP_AUDIO" .wav).txt"
    else
      echo "    -> download failed for ${TWEET_ID}"
    fi
  done < "$VIDEO_QUEUE"
else
  echo "[daily-twitter-intel] No videos to transcribe"
fi

echo ""
echo "[daily-twitter-intel] Complete — intel/twitter/${DATE}.md"
echo "Transcripts in ${TRANSCRIPTS_DIR}/"
