import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPost" });

  const post = t.raw(slug) || null;
  const fallbackTitle = t("back", { default: "Blog" });
  const title = post?.title || fallbackTitle;
  const description = (post?.sections?.[0]?.p || "").slice(0, 160);
  const canonical = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: canonical.replace(`/${locale}/`, `/en/`),
        tr: canonical.replace(`/${locale}/`, `/tr/`),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale,
      images: post?.cover ? [{ url: `${SITE_URL}${post.cover}` }] : undefined
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPost" });
  const post = t.raw(slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
      </main>
    );
  }

  // FAQ schema (varsa)
  const faq = Array.isArray(post.faq) ? post.faq : [];
  const faqLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    : null;

  return (
    <main className="max-w-3xl mx-auto px-5 py-10 lg:py-20">
      <article>
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-6" />
        ) : null}
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        {post.date ? <p className="text-sm text-neutral-500 mt-1">{post.date}</p> : null}

        <div className="prose max-w-none mt-6">
          {(post.sections || []).map((sec, i) => (
            <section key={i} className="mb-6">
              {sec.h2 ? <h2>{sec.h2}</h2> : null}
              {sec.p ? <p>{sec.p}</p> : null}
            </section>
          ))}
        </div>

        {faqLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        ) : null}

        <div className="mt-10">
          <a href={`/${locale}/blog`} className="text-blue-600 hover:underline">
            ← {t("back")}
          </a>
        </div>
      </article>
    </main>
  );
}