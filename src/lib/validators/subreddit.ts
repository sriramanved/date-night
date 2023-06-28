import { z } from "zod";

export const SubredditValidator = z.object({
  name: z
  .string()
  .min(3, {
    message: 'Subreddit name must be at least 3 characters long',
  })
  .max(21, {
    message: 'Subreddit name must be less than 21 characters long',
  })
  .regex(/^\S+$/, {
    message: 'Spaces are not allowed in subreddit name',
  }),
});

export const SubredditSubscriptionValidator = z.object({
  subredditId: z.string(),
});

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;
export type SubscribeToSubredditPayload = z.infer<
  typeof SubredditSubscriptionValidator
>;
