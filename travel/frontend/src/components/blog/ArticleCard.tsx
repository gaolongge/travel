import { Link } from 'react-router-dom';
import type { Article } from '@/types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { HoverLift } from '@/components/MotionPrimitives';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <HoverLift>
      <Link to={`/article/${article.id}`} className="block">
        <article
          className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          style={{ transition: 'var(--duration-normal) var(--ease-default)' }}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4 md:p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <h2
              className="text-lg md:text-xl font-semibold mb-2 line-clamp-2"
              style={{ fontFamily: 'var(--font-family-serif)' }}
            >
              {article.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {format(new Date(article.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}
              </span>
              <span>{article.readTime} 分钟阅读</span>
            </div>
          </div>
        </article>
      </Link>
    </HoverLift>
  );
}
