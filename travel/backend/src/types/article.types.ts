import { z } from 'zod';

// 文章列表请求
export const ArticleListRequestSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(10),
  tagId: z.string().optional(),
});

// 文章详情请求
export const ArticleDetailRequestSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
});

// 相邻文章请求
export const AdjacentArticleRequestSchema = z.object({
  id: z.string(),
});

// 文章响应
export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  coverImage: z.string(),
  readTime: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tags: z.array(z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    color: z.string().nullable(),
  })),
  author: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
});

// 文章列表响应
export const ArticleListResponseSchema = z.object({
  articles: z.array(ArticleSchema.omit({ content: true })),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

// 相邻文章响应
export const AdjacentArticleResponseSchema = z.object({
  prev: ArticleSchema.omit({ content: true }).nullable(),
  next: ArticleSchema.omit({ content: true }).nullable(),
});

export type ArticleListRequest = z.infer<typeof ArticleListRequestSchema>;
export type ArticleDetailRequest = z.infer<typeof ArticleDetailRequestSchema>;
export type AdjacentArticleRequest = z.infer<typeof AdjacentArticleRequestSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleListResponse = z.infer<typeof ArticleListResponseSchema>;
export type AdjacentArticleResponse = z.infer<typeof AdjacentArticleResponseSchema>;
