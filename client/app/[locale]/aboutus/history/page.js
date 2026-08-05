import CompanyDetailPage, { generateCompanyMetadata } from "../_components/CompanyDetailPage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateCompanyMetadata(locale, "history");
}

export default async function HistoryPage({ params }) {
  const { locale } = await params;
  return <CompanyDetailPage locale={locale} pageKey="history" />;
}
