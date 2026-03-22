import { useState } from 'react';
import { useArticles, useTags } from '@/hooks/use-blog';
import { ArticleCard, TagList, AuthorCard } from '@/components/blog';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Compass, Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function Index() {
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const { articles, total, loading, loadingMore, loadMore, hasMore } = useArticles(ITEMS_PER_PAGE, selectedTagId);
  const { tags, loading: tagsLoading } = useTags();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Compass className="w-8 h-8 text-primary" />
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: 'var(--font-family-serif)' }}
                >
                  旅途笔记
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                记录每一次远行，收藏每一份感动
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <AuthorCard />
            <div className="hidden lg:block">
              {!tagsLoading && (
                <TagList
                  tags={tags}
                  selectedTagId={selectedTagId}
                  onSelectTag={(id) => {
                    setSelectedTagId(id);
                  }}
                />
              )}
            </div>
          </aside>

          {/* Article Grid */}
          <div className="flex-1">
            {/* Mobile Tag Filter */}
            <div className="lg:hidden mb-6 overflow-x-auto pb-2">
              {!tagsLoading && (
                <TagList
                  tags={tags}
                  selectedTagId={selectedTagId}
                  onSelectTag={(id) => {
                    setSelectedTagId(id);
                  }}
                />
              )}
            </div>

            {/* Articles */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="aspect-[16/10]" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : articles && articles.length > 0 ? (
              <>
                <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </Stagger>
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="min-w-32"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          加载中...
                        </>
                      ) : (
                        '加载更多'
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">暂无文章</p>
              </div>
            )}

            {/* Article count */}
            {total > 0 && (
              <div className="text-center mt-6 text-sm text-muted-foreground">
                已显示 {articles.length} / {total} 篇文章
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
