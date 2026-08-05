import CompanyDetailPage, { generateCompanyMetadata } from "../_components/CompanyDetailPage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateCompanyMetadata(locale, "stonePhilosophy");
}

export default async function StonePhilosophyPage({ params }) {
  const { locale } = await params;
  return <CompanyDetailPage locale={locale} pageKey="stonePhilosophy" />;
}
