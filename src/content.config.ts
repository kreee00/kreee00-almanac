import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      // updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      coverImage: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      githubCalendar: z.string().optional(), // GitHub username for calendar
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
    }),
})

const experienceCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/experience' }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      title: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(), // If undefined, it's "Present"
      location: z.string(),
      logo: z.string().optional(),
      order: z.number().default(0),
    }),
})

const certificationsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/certifications' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      issuer: z.string(),
      issueDate: z.coerce.date(),
      expiryDate: z.coerce.date().optional(),
      credentialId: z.string().optional(),
      credentialUrl: z.string().optional(),
      badge: z.string().optional(),
      category: z.string().optional().default('Other'),
      status: z.enum(['Completed', 'In Progress']).optional().default('Completed'),
    }),
})

const educationCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/education' }),
  schema: ({ image }) =>
    z.object({
      institution: z.string(),
      degree: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      location: z.string(),
      logo: z.string().optional(),
      order: z.number().default(0),
    }),
})

const aboutCollection = defineCollection({
  loader: glob({ pattern: ['about.md', 'about.mdx'], base: './src/content' }),
  schema: z.object({
    title: z.string().default('About Me'),
  }),
})

const summaryCollection = defineCollection({
  loader: glob({ pattern: ['summary.md', 'summary.mdx'], base: './src/content' }),
  schema: z.object({
    title: z.string().default('Professional Summary'),
  }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
  experience: experienceCollection,
  certifications: certificationsCollection,
  education: educationCollection,
  about: aboutCollection,
  summary: summaryCollection,
}
