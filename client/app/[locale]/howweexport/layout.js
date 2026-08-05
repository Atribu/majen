import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function ExportLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider
      locale={locale}
      namespaces={[
        "TravertinePage",
        "HowWeExportPage",
        "Fob",
        "Cif",
        "Exw",
        "QuestionsSection",
        "ContactForm",
        "Footer.social",
      ]}
    >
      {children}
    </ScopedIntlProvider>
  );
}
