import { Link } from 'react-router-dom';
import { useAuthor } from '@/hooks/use-blog';
import { FadeIn } from '@/components/MotionPrimitives';
import { MapPin, Mail, Instagram } from 'lucide-react';

export function AuthorCard() {
  const { author, loading } = useAuthor();

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-5 shadow-sm animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-24 mb-2" />
            <div className="h-4 bg-muted rounded w-32" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!author) return null;

  return (
    <FadeIn>
      <div className="bg-card rounded-lg p-5 shadow-sm">
        <Link to="/about" className="flex items-center gap-4 mb-4 group">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
          />
          <div>
            <h3
              className="text-lg font-semibold group-hover:text-primary transition-colors"
              style={{ fontFamily: 'var(--font-family-serif)' }}
            >
              {author.name}
            </h3>
            {author.location && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {author.location}
              </p>
            )}
          </div>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {author.bio}
        </p>
        <div className="flex items-center gap-3">
          {author.social.email && (
            <a
              href={`mailto:${author.social.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {author.social.instagram && (
            <a
              href={author.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
