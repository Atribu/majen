// app/[locale]/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogIndex" });
  const title = t("title", { default: "Travertine Blog" });
  const description = t("intro", { default: "Guides and insights…" }).slice(0, 160);
  const canonical = `${SITE_URL}/${locale}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: `${SITE_URL}/en/blog`, tr: `${SITE_URL}/tr/blog` },
    },
    openGraph: { title, description, url: canonical, type: "website", locale },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogIndex" });
  const posts = t.raw("posts") || [];

  return (
    <main className="px-5 py-10 lg:py-24">
      {/* Header */}
      <header className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-neutral-700 max-w-3xl">{t("intro")}</p>
      </header>

      {/* Grid */}
      <section
        className="
          mx-auto mt-8 md:mt-10 max-w-7xl
          grid gap-6 sm:gap-7
          [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
        "
      >
        {posts.map((p) => (
          <article
            key={p.slug}
            className="
              group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white
              shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)]
              transition-transform hover:-translate-y-0.5
            "
          >
            <Link href={`/${locale}/blog/${p.slug}`} className="block focus:outline-none">
              {/* Cover */}
              <div className="relative w-full aspect-[16/10] bg-neutral-100">
                <Image
                  src={p.cover || "/images/blog/placeholder.webp"}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={false}
                />
              </div>

              {/* Body */}
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  {p.date ? <time dateTime={p.date}>{p.date}</time> : null}
                  {p.category ? (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5">
                        {t(`categories.${p.category}`, { default: p.category })}
                      </span>
                    </>
                  ) : null}
                </div>

                <h2 className="mt-2 text-lg md:text-xl font-semibold leading-snug line-clamp-2">
                  {p.title}
                </h2>

                <p className="mt-2 text-sm md:text-[15px] text-neutral-700 line-clamp-3">
                  {p.excerpt}
                </p>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                  {t("readMore")}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  >
                    <path d="M7 5l5 5-5 5" />
                  </svg>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}