import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function AboutLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider
      locale={locale}
      namespaces={[
        "AboutPage",
        "CompanyPages",
        "QuestionsSection",
        "ContactForm",
        "Footer.social",
      ]}
    >
      {children}
    </ScopedIntlProvider>
  );
}
