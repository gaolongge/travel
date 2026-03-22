import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { ArticleListRequestSchema, ArticleDetailRequestSchema, AdjacentArticleRequestSchema } from '../types/article.types';

const router = Router();

// 获取文章列表
router.post('/list', async (req: Request, res: Response) => {
  try {
    const { page, pageSize, tagId } = ArticleListRequestSchema.parse(req.body);
    const skip = (page - 1) * pageSize;

    const where = tagId ? { tags: { some: { tagId } } } : {};

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: {
            include: { tag: true },
          },
          author: {
            select: { id: true, name: true, avatar: true },
          },
        },
      }),
      prisma.article.count({ where }),
    ]);

    const formattedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      readTime: article.readTime,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      tags: article.tags.map((t) => ({
        id: t.tag.id,
        name: t.tag.name,
        slug: t.tag.slug,
        color: t.tag.color,
      })),
      author: article.author,
    }));

    res.json({
      articles: formattedArticles,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// 获取文章详情
router.post('/detail', async (req: Request, res: Response) => {
  try {
    const { id, slug } = ArticleDetailRequestSchema.parse(req.body);

    if (!id && !slug) {
      return res.status(400).json({ error: 'Either id or slug is required' });
    }

    const article = await prisma.article.findFirst({
      where: id ? { id } : { slug },
      include: {
        tags: {
          include: { tag: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage,
      readTime: article.readTime,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      tags: article.tags.map((t) => ({
        id: t.tag.id,
        name: t.tag.name,
        slug: t.tag.slug,
        color: t.tag.color,
      })),
      author: article.author,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// 获取相邻文章
router.post('/adjacent', async (req: Request, res: Response) => {
  try {
    const { id } = AdjacentArticleRequestSchema.parse(req.body);

    const currentArticle = await prisma.article.findUnique({
      where: { id },
      select: { createdAt: true },
    });

    if (!currentArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const [prev, next] = await Promise.all([
      prisma.article.findFirst({
        where: { createdAt: { gt: currentArticle.createdAt } },
        orderBy: { createdAt: 'asc' },
        select: { id: true, title: true, slug: true, coverImage: true, createdAt: true },
      }),
      prisma.article.findFirst({
        where: { createdAt: { lt: currentArticle.createdAt } },
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, coverImage: true, createdAt: true },
      }),
    ]);

    res.json({
      prev: prev || null,
      next: next || null,
    });
  } catch (error) {
    console.error('Error fetching adjacent articles:', error);
    res.status(500).json({ error: 'Failed to fetch adjacent articles' });
  }
});

export default router;
