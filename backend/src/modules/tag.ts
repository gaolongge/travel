import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

const router = Router();

// 获取标签列表
router.post('/list', async (_req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    const formattedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      color: tag.color,
      articleCount: tag._count.articles,
    }));

    res.json({ tags: formattedTags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

export default router;
