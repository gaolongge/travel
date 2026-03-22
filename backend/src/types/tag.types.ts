import { z } from 'zod';

// 标签列表请求
export const TagListRequestSchema = z.object({});

// 标签响应
export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  color: z.string().nullable(),
  articleCount: z.number(),
});

// 标签列表响应
export const TagListResponseSchema = z.object({
  tags: z.array(TagSchema),
});

export type TagListRequest = z.infer<typeof TagListRequestSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type TagListResponse = z.infer<typeof TagListResponseSchema>;
