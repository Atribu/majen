import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function TravertineLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider
      locale={locale}
      namespaces={[
        "TravertinePage",
        "ContactForm",
        "QuestionsSection",
        "Footer.social",
      ]}
    >
      {children}
    </ScopedIntlProvider>
  );
}
