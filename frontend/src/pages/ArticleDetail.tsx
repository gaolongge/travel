import { useParams, Link } from 'react-router-dom';
import { useArticle, useAdjacentArticles, useAuthor } from '@/hooks/use-blog';
import { MarkdownRenderer, AuthorCard } from '@/components/blog';
import { FadeIn, HoverLift } from '@/components/MotionPrimitives';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ArrowLeft, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { article, loading, error } = useArticle(id);
  const { adjacent } = useAdjacentArticles(id || '');
  const { author } = useAuthor();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="aspect-video rounded-lg mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-5 w-1/2 mb-8" />
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">文章不存在</h1>
          <Button asChild>
            <Link to="/">返回首页</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-4xl">
            <FadeIn>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs px-3 py-1 rounded-full bg-primary/90 text-primary-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1
                className="text-2xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-family-serif)' }}
              >
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span>{article.author.name}</span>
                <span>·</span>
                <span>{format(new Date(article.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} 分钟阅读
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
          <article className="flex-1 min-w-0">
            {/* Back Button */}
            <FadeIn>
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回列表
                </Link>
              </Button>
            </FadeIn>

            {/* Content */}
            <FadeIn>
              <MarkdownRenderer content={article.content} />
            </FadeIn>

            {/* Adjacent Articles */}
            {adjacent && (adjacent.prev || adjacent.next) && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adjacent.prev && (
                    <HoverLift>
                      <Link
                        to={`/article/${adjacent.prev.id}`}
                        className="group flex gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1" />
                        <div className="min-w-0">
                          <span className="text-xs text-muted-foreground">上一篇</span>
                          <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {adjacent.prev.title}
                          </p>
                        </div>
                      </Link>
                    </HoverLift>
                  )}
                  {adjacent.next && (
                    <HoverLift>
                      <Link
                        to={`/article/${adjacent.next.id}`}
                        className="group flex gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-right"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-xs text-muted-foreground">下一篇</span>
                          <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {adjacent.next.title}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1" />
                      </Link>
                    </HoverLift>
                  )}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            {author && (
              <div className="sticky top-24">
                <AuthorCard />
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
