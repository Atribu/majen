import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function ContactLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider locale={locale} namespaces={["ContactForm"]}>
      {children}
    </ScopedIntlProvider>
  );
}
