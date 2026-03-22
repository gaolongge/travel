import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/MotionPrimitives';
import { Button } from '@/components/ui/button';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <FadeIn>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Compass className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-family-serif)' }}
          >
            迷路了？
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            看起来你误入了一片未知的领域。别担心，让我们带你回到正确的方向。
          </p>
          <Button asChild size="lg">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
