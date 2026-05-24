import Link from "next/link";

type Article = {
  slug: string;
  pillar: string;
  pillarSlug: string;
  title: string;
  teaser: string;
};

type RelatedArticlesProps = {
  articles: Article[];
};

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="not-prose my-16 border-t border-[var(--color-surface)] pt-10">
      <p className="text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] mb-6">
        Related reading
      </p>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${article.pillarSlug}/${article.slug}`}
            className="group flex-shrink-0 w-64 bg-[var(--color-surface)] p-6 hover:bg-[var(--color-accent-tint)] transition-colors"
          >
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-2">
              {article.pillar}
            </p>
            <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--color-accent)] transition-colors">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
