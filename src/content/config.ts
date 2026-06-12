import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      platform: z.enum(['Substack', 'Medium', 'Article', 'X/Twitter']),
      originalUrl: z.string().url(),
      image: z.string(),
      publishedDate: z.string(),
      slug: z.string().optional(),
      tweetCount: z.number().optional(),
    }),
  }),
};
