// app/[locale]/blog/travertines/[slug]/page.js
import DynamicTravertinePage from "./DynamicTravertinePage";

export default async function Page({ params }) {
  // Next.js 15: params bir Promise — unwrap et
  const { slug, locale } = await params;

  // İstersen locale'i de prop olarak iletebilirsin; client tarafında useLocale ile de alırsın
  return <DynamicTravertinePage slug={slug} localeFromServer={locale} />;
}
