// app/[locale]/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactFrom from "../components/generalcomponent/ContactFrom";
const PAGE_COVERS = [
  "/images/homepage/antikoarkplan.webp",
  "/images/tiles/antikokesim.webp",
  "/images/slabs/newLight.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
];

const CARD_COVERS = [
  "/images/homepage/antikoarkplan.webp",
  "/images/tiles/antikokesim.webp",
    "/images/slabs/newLight.webp",
   "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
  "/images/homepage/antikoarkplan.webp",
];

// Slug'a göre stabil indeks (kart kapağı seçiminde çok işe yarar)
function hashSlug(slug = "") {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const POSTS_PER_PAGE = 20;
const POSTS_PER_PAGE_Mobile = 10;

const HUB_SLUGS = new Set([
  "travertine-guide",

]);

// --- BLOG LINK HELPERS (ürüne değil blog alt sayfalarına götürür) ---
function normalizePostSlug(raw = "") {
  // Dış link ise olduğu gibi bırak
  if (/^https?:\/\//i.test(raw)) return raw;

  // Baştaki slash ve olası locale/blog klasörlerini temizle
  let s = String(raw)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^(en|tr)\//i, "")
    .replace(/^blog\//i, "")
    .replace(/^travertines?\//i, ""); // eski klasörlü veriler için

  // Güvenli slug (bozuk karakterleri tireye çevir)
  s = s
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

  return s;
}



function buildBlogHref(locale, raw = "") {
  // Dış link ise dokunma
  if (/^https?:\/\//i.test(raw)) return raw;

  const slug = normalizePostSlug(raw);
  if (slug === "travertine-guide") {
   return `/${locale}/travertine-guide`;
  }
  return `/${locale}/blog/${slug}`;
  // return slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`;
}


export async function generateMetadata({ params, searchParams }) {
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

// Pagination Component
function Pagination({ currentPage, totalPages, locale }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5; // Gösterilecek sayfa sayısı
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center mt-12" aria-label="Pagination">
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        {currentPage > 1 && (
          <Link
            href={`/${locale}/blog?page=${currentPage - 1}`}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700"
          >
            ‹
          </Link>
        )}

        {/* First page */}
        {startPage > 1 && (
          <>
            <Link
              href={`/${locale}/blog?page=1`}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700"
            >
              1
            </Link>
            {startPage > 2 && (
              <span className="px-3 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            )}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <Link
            key={page}
            href={`/${locale}/blog?page=${page}`}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === page
                ? "bg-teal-600 text-white border border-teal-600"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            {page}
          </Link>
        ))}

        {/* Last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-3 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            )}
            <Link
              href={`/${locale}/blog?page=${totalPages}`}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700"
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next button */}
        {currentPage < totalPages && (
          <Link
            href={`/${locale}/blog?page=${currentPage + 1}`}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700"
          >
            ›
          </Link>
        )}
      </div>
    </nav>
  );
}

export default async function Page({ params, searchParams }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogIndex" });
  const allPosts = t.raw("posts") || [];
  
  // Sayfa numarasını al
  const page = parseInt(searchParams?.page) || 1;
  const currentPage = Math.max(1, page);
  
  // Toplam sayfa sayısını hesapla
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Mevcut sayfa için postları filtrele
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <main className="px-5 py-10 mt-10 lg:py-24">
      {/* Header */}
      <header className="mx-auto max-w-5xl">
        <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-2 text-neutral-700 max-w-3xl text-[12px] md:text-[14px] lg:text-[16px]">
          {t("intro")}
        </p>
        
        {/* Post count info */}
        {totalPosts > 0 && (
          <div className="mt-4 text-sm text-neutral-600">
            {totalPosts > POSTS_PER_PAGE 
              ? `Toplam ${totalPosts} yazıdan ${startIndex + 1}-${Math.min(endIndex, totalPosts)} arası gösteriliyor`
              : `Toplam ${totalPosts} yazı`
            }
          </div>
        )}
      </header>

      {/* Grid */}
      {posts.length > 0 ? (
        <section
          className="
            mx-auto mt-5 md:mt-10 max-w-7xl
            grid gap-6 sm:gap-7
            [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
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
       <Link href={buildBlogHref(locale, p.slug)} className="block focus:outline-none">

                {/* Cover */}
                <div className="relative w-full aspect-[16/10] bg-neutral-100">
   {(() => {
     // A) Post JSON'da varsa kullan (en.json/tr.json: posts[].cover ya da image)
     const postCover =
       p.cover?.src || p.cover || p.image || p.img || null;

     // B) Sayfa numarasına göre tek kapak (tüm kartlar aynı resmi kullanır)
     const pageCover =
       PAGE_COVERS[(currentPage - 1) % PAGE_COVERS.length];

     // C) Her kart için farklı kapak:
     //  - Stabil: slug hash'ine göre
     //  - Ya da sırayla: (startIndex + i) % CARD_COVERS.length
     const stableCardCover =
       CARD_COVERS[hashSlug(p.slug) % CARD_COVERS.length];

    // Seçim: A yoksa C'yi kullan; istersen B'yi tercih edebilirsin
     const coverSrc = postCover || stableCardCover; // alternatif: postCover || pageCover

     return (
       <Image
         src={coverSrc}
         alt={p.alt || p.title}
         fill
         sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
         className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
         priority={false}
       />
     );
   })()}
 </div>
             {/* <div className="relative w-full aspect-[16/10] bg-neutral-100">
                  <Image
                    src={"/images/homepage/antikoarkplan.webp"}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={false}
                  />
                </div> */}

                {/* Body */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 text-neutral-500 text-[12px] md:text-[14px] lg:text-[16px]">
                    {p.date ? <time dateTime={p.date}>{p.date}</time> : null}
                    {p.category ? (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 ">
                          {t(`categories.${p.category}`, { default: p.category })}
                        </span>
                      </>
                    ) : null}
                  </div>

                  <h2 className="mt-2  text-[16px] md:text-[18px] lg:text-[20px] font-semibold leading-snug line-clamp-2">
                    {p.title}
                  </h2>

                  <p className="mt-1 lg:mt-2 text-sm text-neutral-700 line-clamp-3 text-[12px] md:text-[14px] lg:text-[16px]">
                    {p.excerpt}
                  </p>

                  <span className="mt-2 lg:mt-3 inline-flex items-center gap-2 text-[12px] md:text-[14px] lg:text-[16px] font-medium text-teal-700">
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
      ) : (
        <div className="mx-auto mt-10 max-w-5xl text-center">
          <p className="text-neutral-600">Henüz blog yazısı bulunmuyor.</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        locale={locale}
      />

      <ContactFrom />
    </main>
  );
}