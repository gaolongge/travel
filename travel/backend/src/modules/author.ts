import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

const router = Router();

// 获取作者信息
router.post('/info', async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.findFirst({
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({
      author: {
        id: author.id,
        name: author.name,
        avatar: author.avatar,
        bio: author.bio,
        location: author.location,
        social: {
          weibo: author.weibo,
          wechat: author.wechat,
          instagram: author.instagram,
          email: author.email,
        },
        articleCount: author._count.articles,
      },
    });
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
});

export default router;
