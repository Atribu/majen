// app/en/travertine/page.jsx
import Image from "next/image";
import Link from "next/link";
import QuestionsSection from "../components/generalcomponent/QuestionsSection";
import { getTranslations } from "next-intl/server";
import TravertineBlog from "./components/TravertineBlog";
import { localizedBlogPath } from "@/lib/blogPageRoutes";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isTR = locale === "tr";
  const canonical = `https://majen.com.tr${localizedBlogPath(locale, "travertine-guide")}`;
  const title = isTR
    ? "Traverten Rehberi | Türler, Renkler ve Kullanım Alanları"
    : "Travertine from Turkey | Complete Guide to Turkish Travertines";
  const description = isTR
    ? "Traverten blok, plaka, karo ve döşeme türlerini; renk, yüzey işlemi, kullanım ve ihracat ayrıntılarıyla keşfedin."
    : "Discover Turkish travertines: blocks, slabs, tiles and pavers. Learn types, colors, finishes, applications and export details.";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      locale,
      images: [{ url: "/media/travertine-hero.webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://majen.com.tr/media/travertine-hero.webp"],
      creator: "@majenstone",
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
        const isTR = locale === "tr";

         const t  = await getTranslations({ locale, namespace: "BlogPost.Questions" });

           const items = [
        { q: t("q1"), a: t("answer1") },
        { q: t("q2"), a: t("answer2") },
        { q: t("q3"), a: t("answer3") },
        { q: t("q4"), a: t("answer4") },
          { q: t("q5"), a: t("answer5") },
            { q: t("q6"), a: t("answer6") }
      ];


        const baseUrl = "https://majen.com.tr";
  const path = localizedBlogPath(locale, "travertine-guide");
  const canonicalUrl = `${baseUrl}${path}`;

  // FAQ'ı items'tan üret (verdiğin 4 soru yapısına da uyumlu)
  const faqEntities = items.slice(0, 4).map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  }));

  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#post`,
      headline: isTR
        ? "Traverten Rehberi | Türler, Renkler ve Kullanım Alanları"
        : "Travertine from Turkey | Complete Guide to Turkish Travertines",
      description: isTR
        ? "Traverten türleri, renkleri, yüzey işlemleri, kullanım alanları ve ihracat süreçleri rehberi."
        : "Guide to Turkish travertine: types, colors, finishes, applications and export.",
      inLanguage: locale,
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Majen" },
      publisher: {
        "@type": "Organization",
        name: "Majen",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/media/logo.png`,
        },
      },
      image: `${baseUrl}/media/travertine-hero.webp`,
      datePublished: "2025-01-15",
      dateModified: "2025-09-25",
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqEntities,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isTR ? "Ana Sayfa" : "Home", item: `${baseUrl}/${locale}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/${locale}/blog` },
        { "@type": "ListItem", position: 3, name: isTR ? "Traverten" : "Travertine", item: canonicalUrl },
      ],
    },
  ];


  return (
    <main className="min-h-screen bg-white text-slate-900">
    
      <TravertineBlog />

      {/* SUPPLY & EXPORT */}
      <section id="supply" className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-center gap-7 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">
              {isTR ? "Türkiye’den Tedarik & İhracat" : "Supply & Export from Turkey"}
            </h2>
            <p className="mt-2 text-slate-700">
              {isTR
                ? "Traverteni Türkiye’deki ocaklardan, kontrollü sınıflandırma ve paketleme standartlarıyla doğrudan tedarik ediyoruz. Lojistik ekibimiz hedef pazara uygun sevkiyat planlamasını yürütür."
                : "We supply travertine directly from Turkish quarries with strict grading and packaging standards. Our logistics team ships globally with optimized transit times and Incoterms depending on destination."}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>{isTR ? "Toplu sipariş desteği" : "Bulk supply support"}</li>
              <li>{isTR ? "Özel ebat ve yüzey seçenekleri" : "Custom sizes and surface selections"}</li>
              <li>{isTR ? "Güvenli kasa ve palet paketlemesi" : "Crate and palletized packaging for safety"}</li>
            </ul>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold">{isTR ? "Numune Talep Edin" : "Request Samples"}</h3>
            <p className="mt-2 text-slate-600">
              {isTR
                ? "Renk ve yüzey seçenekleri için numune panoları hazırlanabilir. Ortalama hazırlık süresi 3–7 gündür."
                : "Sample boards are available for colors and finishes. Lead time is typically 3–7 days."}
            </p>
            <Link href="#get-quote" className="mt-3 inline-block rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">
              {isTR ? "Şimdi Talep Edin" : "Request Now"}
            </Link>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <QuestionsSection span={isTR ? "Traverten Rehberi" : "Travertine Guide"} items={items} />

      {/* CTA */}
      <section id="get-quote" className="py-14">
        <div className="mx-auto w-[92%] max-w-[1400px]">
          <div className="grid items-center gap-3 rounded-2xl border border-slate-200 bg-indigo-50/40 p-6 md:grid-cols-[1fr_auto_auto]">
           <div className="flex flex-col">
             <h3 className="text-xl font-semibold">
               {isTR ? "Projeniz İçin Uygun Türk Travertenini Bulun" : "Get the Best Turkish Travertine for Your Project"}
             </h3>
            <p className="text-slate-600">
              {isTR
                ? "İhtiyacınız olan renk, ebat, yüzey işlemi ve teslim noktasını iletin; stok ve hazırlık süresiyle yanıtlayalım."
                : "Send us your required colors, sizes, finishes and destination. We’ll reply with availability and lead times."}
            </p>
           </div>

            <div className="flex flex-wrap gap-3">
              <Link href={locale === "tr" ? "/tr/iletisim" : "/en/contactus"} className="rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">
                {isTR ? "Teklif Alın" : "Get a Quote"}
              </Link>
              <Link
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === "tr" ? "WhatsApp’tan yazın" : "Message us on WhatsApp"}
                className="rounded-full border border-teal-700 px-5 py-3 font-semibold text-teal-700 hover:bg-teal-50"
              >
                {locale === "tr" ? "WhatsApp’tan yazın" : "Message us on WhatsApp"}
              </Link>
              <Link
                href="mailto:info@majen.com.tr"
                aria-label={locale === "tr" ? "E-posta gönderin" : "Send an email"}
                className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-white"
              >
                {locale === "tr" ? "E-posta gönderin" : "Send an email"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal nav */}
      <footer className="py-10">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <nav className="flex flex-wrap gap-3">
            {[
              [localizedBlogPath(locale, "travertine-tiles"), isTR ? "Traverten Karolar" : "Travertine Tiles"],
              [localizedBlogPath(locale, "travertine-slabs"), isTR ? "Traverten Plakalar" : "Travertine Slabs"],
              [localizedBlogPath(locale, "travertine-blocks"), isTR ? "Traverten Bloklar" : "Travertine Blocks"],
              [localizedBlogPath(locale, "travertine-pavers"), isTR ? "Traverten Döşemeler" : "Travertine Pavers"],
              [localizedBlogPath(locale, "travertine-mosaics"), isTR ? "Traverten Mozaikler" : "Travertine Mosaics"],
              [localizedBlogPath(locale, "ivory-travertine"), isTR ? "Fildişi Traverten" : "Ivory Travertine"],
              [`/${locale}/${isTR ? "traverten" : "travertine"}`, isTR ? "Gümüş Traverten" : "Silver Travertine"],
              [`/${locale}/${isTR ? "traverten" : "travertine"}`, "Noce Travertine"],
              [localizedBlogPath(locale, "polished-travertine"), isTR ? "Parlak Traverten" : "Polished Travertine"],
              [localizedBlogPath(locale, "honed-travertine"), isTR ? "Honlanmış Traverten" : "Honed Travertine"],
              [localizedBlogPath(locale, "tumbled-travertine"), isTR ? "Eskitilmiş Traverten" : "Tumbled Travertine"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="text-teal-700 hover:underline">{label}</Link>
            ))}
          </nav>
        </div>
      </footer>

      {/* JSON-LD (Breadcrumb + FAQ) */}
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
          }),
        }}
      />
    </main>
  );
}
