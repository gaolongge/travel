import { z } from 'zod';

// 作者信息请求
export const AuthorInfoRequestSchema = z.object({
  id: z.string().optional(),
});

// 作者响应
export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  bio: z.string(),
  location: z.string().nullable(),
  social: z.object({
    weibo: z.string().nullable(),
    wechat: z.string().nullable(),
    instagram: z.string().nullable(),
    email: z.string().nullable(),
  }),
  articleCount: z.number(),
});

// 作者信息响应
export const AuthorInfoResponseSchema = z.object({
  author: AuthorSchema,
});

export type AuthorInfoRequest = z.infer<typeof AuthorInfoRequestSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type AuthorInfoResponse = z.infer<typeof AuthorInfoResponseSchema>;
