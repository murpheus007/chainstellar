import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      platform: z.enum(['Substack', 'Medium', 'Article']),
      originalUrl: z.string().url(),
      image: z.string(),
      publishedDate: z.string(),
    }),
  }),
};
