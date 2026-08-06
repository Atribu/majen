import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.majen.com.tr").replace(/\/$/, "");

const pageContent = {
  tr: {
    eyebrow: "Majen Projeleri",
    title: "Öne Çıkan Projeler",
    intro:
      "Doğal taşın mimariyle buluştuğu seçili projeleri ve uygulama detaylarını keşfedin.",
    sectionEyebrow: "Seçili Uygulamalar",
    sectionTitle: "Travertenin mekâna kattığı karakter",
    sectionText:
      "Konut, konaklama ve ticari projelerde kullanılan Majen travertenlerinin farklı ölçek ve yüzeylerdeki uygulamalarını inceleyin.",
    viewProject: "Projeyi incele",
    placeholderLocation: "Konum bilgisi",
    projects: [
      { title: "Proje Başlığı 01", category: "Konut", year: "2026" },
      { title: "Proje Başlığı 02", category: "Konaklama", year: "2026" },
      { title: "Proje Başlığı 03", category: "Ticari", year: "2026" },
      { title: "Proje Başlığı 04", category: "Peyzaj", year: "2026" },
      { title: "Proje Başlığı 05", category: "Konut", year: "2026" },
      { title: "Proje Başlığı 06", category: "Ticari", year: "2026" },
    ],
  },
  en: {
    eyebrow: "Majen Projects",
    title: "Featured Projects",
    intro:
      "Discover selected projects and application details where natural stone meets architecture.",
    sectionEyebrow: "Selected Applications",
    sectionTitle: "The character travertine brings to a space",
    sectionText:
      "Explore Majen travertine applications across different scales and finishes in residential, hospitality and commercial projects.",
    viewProject: "View project",
    placeholderLocation: "Location details",
    projects: [
      { title: "Project Title 01", category: "Residential", year: "2026" },
      { title: "Project Title 02", category: "Hospitality", year: "2026" },
      { title: "Project Title 03", category: "Commercial", year: "2026" },
      { title: "Project Title 04", category: "Landscape", year: "2026" },
      { title: "Project Title 05", category: "Residential", year: "2026" },
      { title: "Project Title 06", category: "Commercial", year: "2026" },
    ],
  },
};

const projectImages = [
  "/images/homepage/Antik/Antiktasarim1.webp",
  "/images/homepage/Light/Lighttasarim1.webp",
  "/images/homepage/Ivory/Ivorytasarim1.webp",
  "/images/design/design1.webp",
  "/images/design/design2.webp",
  "/images/design/design3.webp",
];

function isProjectsPageEnabled() {
  // Keep this route unpublished until approved project content is available.
  return process.env.FEATURED_PROJECTS_ENABLED === "true";
}

export async function generateMetadata({ params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const content = pageContent[locale];
  const path = locale === "tr" ? "/tr/projeler" : "/en/projects";

  return {
    title: `${content.title} | Majen`,
    description: content.intro,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        tr: `${SITE_URL}/tr/projeler`,
        en: `${SITE_URL}/en/projects`,
        "x-default": `${SITE_URL}/en/projects`,
      },
    },
    robots: {
      index: false,
      follow: false,
      noarchive: true,
    },
  };
}

export default async function ProjectsPage({ params }) {
  if (!isProjectsPageEnabled()) notFound();

  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const content = pageContent[locale];

  return (
    <main className="bg-[#f5f3ee] text-neutral-950">
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden pt-28">
        <Image
          src="/images/homepage/antikoarkplan.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />

        <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 text-white md:px-8 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
            {content.intro}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="mb-9 grid gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00877b]">
                {content.sectionEyebrow}
              </p>
              <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight md:text-4xl">
                {content.sectionTitle}
              </h2>
            </div>
            <p className="max-w-2xl leading-7 text-neutral-600 md:justify-self-end">
              {content.sectionText}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.projects.map((project, index) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <Image
                    src={projectImages[index]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                    <span className="inline-flex rounded-full border border-white/35 bg-black/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                    <div className="mt-3 flex items-center justify-between gap-4 text-sm text-white/80">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {content.placeholderLocation}
                      </span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold md:px-6">
                  <span>{content.viewProject}</span>
                  <ArrowUpRight
                    className="h-5 w-5 text-[#00877b] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
