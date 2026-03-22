// 文章类型
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

// 标签类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  articleCount?: number;
}

// 作者类型
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string | null;
  social: {
    weibo: string | null;
    wechat: string | null;
    instagram: string | null;
    email: string | null;
  };
  articleCount: number;
}

// 相邻文章
export interface AdjacentArticle {
  prev: {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    createdAt: string;
  } | null;
  next: {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    createdAt: string;
  } | null;
}
