import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function GuideLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider
      locale={locale}
      namespaces={["BlogIndex", "blog.common", "QuestionsSection"]}
    >
      {children}
    </ScopedIntlProvider>
  );
}
