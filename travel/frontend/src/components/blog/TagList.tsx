import type { Tag as TagType } from '@/types';

interface TagListProps {
  tags: TagType[];
  selectedTagId?: string;
  onSelectTag: (tagId: string | undefined) => void;
}

export function TagList({ tags, selectedTagId, onSelectTag }: TagListProps) {
  return (
    <div className="space-y-3">
      <h3
        className="text-lg font-semibold px-2"
        style={{ fontFamily: 'var(--font-family-serif)' }}
      >
        标签分类
      </h3>
      <div className="flex flex-wrap lg:flex-col gap-2">
        <button
          onClick={() => onSelectTag(undefined)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            !selectedTagId
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          全部 ({tags.reduce((sum, t) => sum + (t.articleCount || 0), 0)})
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onSelectTag(tag.id === selectedTagId ? undefined : tag.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1.5 ${
              selectedTagId === tag.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <span>{tag.name}</span>
            <span className="text-xs opacity-70">({tag.articleCount || 0})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
