import CompanyDetailPage, { generateCompanyMetadata } from "../_components/CompanyDetailPage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateCompanyMetadata(locale, "stoneProcessing");
}

export default async function StoneProcessingPage({ params }) {
  const { locale } = await params;
  return <CompanyDetailPage locale={locale} pageKey="stoneProcessing" />;
}
