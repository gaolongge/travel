import { Link } from 'react-router-dom';
import { useAuthor, useArticles } from '@/hooks/use-blog';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Instagram, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function About() {
  const { author, loading: authorLoading } = useAuthor();
  const { articles, loading: articlesLoading } = useArticles(1, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1
              className="text-3xl md:text-4xl font-bold text-center mb-2"
              style={{ fontFamily: 'var(--font-family-serif)' }}
            >
              关于我
            </h1>
            <p className="text-center text-muted-foreground">
              记录旅途，分享故事
            </p>
          </FadeIn>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {authorLoading ? (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex-1 space-y-4 text-center md:text-left">
              <Skeleton className="h-8 w-32 mx-auto md:mx-0" />
              <Skeleton className="h-5 w-48 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : author ? (
          <div className="space-y-12">
            {/* Author Info */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/20"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-family-serif)' }}
                  >
                    {author.name}
                  </h2>
                  {author.location && (
                    <p className="text-muted-foreground flex items-center gap-1 justify-center md:justify-start mb-4">
                      <MapPin className="w-4 h-4" />
                      {author.location}
                    </p>
                  )}
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
                    {author.bio}
                  </p>
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    {author.social.email && (
                      <a
                        href={`mailto:${author.social.email}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Email</span>
                      </a>
                    )}
                    {author.social.instagram && (
                      <a
                        href={author.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        <span className="text-sm">Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">{author.articleCount}</div>
                  <div className="text-sm text-muted-foreground">篇文章</div>
                </div>
                <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">12+</div>
                  <div className="text-sm text-muted-foreground">个城市</div>
                </div>
                <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">5+</div>
                  <div className="text-sm text-muted-foreground">个国家</div>
                </div>
                <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">∞</div>
                  <div className="text-sm text-muted-foreground">份回忆</div>
                </div>
              </div>
            </FadeIn>

            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: 'var(--font-family-serif)' }}
                >
                  最新文章
                </h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">查看全部</Link>
                </Button>
              </div>
              {articlesLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              ) : articles && articles.length > 0 ? (
                <Stagger className="space-y-4" staggerDelay={0.1}>
                  {articles.slice(0, 3).map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="flex gap-4 p-4 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {article.readTime} 分钟
                          </span>
                          <span>{format(new Date(article.createdAt), 'yyyy-MM-dd', { locale: zhCN })}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Stagger>
              ) : null}
            </div>

            {/* Contact */}
            <FadeIn>
              <div className="bg-secondary/50 rounded-lg p-8 text-center">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'var(--font-family-serif)' }}
                >
                  与我联系
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  如果你有任何问题、建议或合作意向，欢迎随时与我联系。
                </p>
                <Button asChild>
                  <a href={`mailto:${author.social.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    发送邮件
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        ) : null}
      </main>
    </div>
  );
}
