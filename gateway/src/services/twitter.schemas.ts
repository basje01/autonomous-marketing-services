import { z } from "zod";

// === twitterapi.io Response Schemas ===
// Validated against twitterapi-io-expert SKILL.md (52 endpoints).
// Auth: x-api-key header on every request.
// Base URL: https://api.twitterapi.io

// --- Media ---

export const tweetMediaVariantSchema = z.object({
  content_type: z.string(),
  bitrate: z.number().nullish(),
  url: z.string(),
});

export const tweetVideoInfoSchema = z.object({
  duration_millis: z.number().default(0),
  variants: z.array(tweetMediaVariantSchema).default([]),
});

export const tweetMediaSchema = z.object({
  type: z.string(),
  video_info: tweetVideoInfoSchema.nullish(),
});

export const tweetExtendedEntitiesSchema = z.object({
  media: z.array(tweetMediaSchema).default([]),
});

// --- Author (embedded UserInfo) ---

export const tweetAuthorSchema = z.object({
  type: z.string().default("user"),
  userName: z.string(),
  url: z.string().nullish(),
  id: z.string(),
  name: z.string(),
  isBlueVerified: z.boolean().default(false),
  verifiedType: z.string().nullish(),
  profilePicture: z.string().nullish(),
  description: z.string().nullish(),
  location: z.string().nullish(),
  followers: z.number().default(0),
  following: z.number().default(0),
  createdAt: z.string().nullish(),
});

// --- Tweet ---

const baseTweetSchema = z.object({
  type: z.string().default("tweet"),
  id: z.string(),
  url: z.string().default(""),
  text: z.string().default(""),
  source: z.string().nullish(),
  lang: z.string().nullish(),
  createdAt: z.string().default(""),
  retweetCount: z.number().default(0),
  replyCount: z.number().default(0),
  likeCount: z.number().default(0),
  quoteCount: z.number().default(0),
  viewCount: z.number().default(0),
  bookmarkCount: z.number().default(0),
  isReply: z.boolean().default(false),
  inReplyToId: z.string().nullish(),
  inReplyToUserId: z.string().nullish(),
  inReplyToUsername: z.string().nullish(),
  conversationId: z.string().nullish(),
  isLimitedReply: z.boolean().nullish(),
  author: tweetAuthorSchema.nullish(),
  extendedEntities: tweetExtendedEntitiesSchema.nullish(),
});

// Quoted/retweeted tweets use the same shape but we avoid infinite recursion
// by using z.lazy only one level deep.
export const tweetSchema: z.ZodType = baseTweetSchema.extend({
  quoted_tweet: baseTweetSchema.nullable().optional(),
  retweeted_tweet: baseTweetSchema.nullable().optional(),
});

export type Tweet = z.infer<typeof baseTweetSchema> & {
  quoted_tweet?: z.infer<typeof baseTweetSchema> | null;
  retweeted_tweet?: z.infer<typeof baseTweetSchema> | null;
};

// --- API Responses ---

export const userTweetsResponseSchema = z.object({
  status: z.string().optional(),
  msg: z.string().optional(),
  data: z.object({
    pin_tweet: z.unknown().optional(),
    tweets: z.array(tweetSchema).default([]),
  }).default({ tweets: [] }),
  has_next_page: z.boolean().default(false),
  next_cursor: z.string().optional(),
});

export const tweetsByIdsResponseSchema = z.object({
  tweets: z.array(tweetSchema).default([]),
  status: z.string().optional(),
  msg: z.string().optional(),
  code: z.number().optional(),
});

// --- Account Registry ---

export const accountSchema = z.object({
  username: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export const accountsFileSchema = z.object({
  description: z.string().optional(),
  accounts: z.array(accountSchema).min(1),
});

export type Account = z.infer<typeof accountSchema>;
