import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function BlogLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider
      locale={locale}
      namespaces={[
        "BlogIndex",
        "blog.common",
        "QuestionsSection",
        "ContactForm",
        "Footer.social",
      ]}
    >
      {children}
    </ScopedIntlProvider>
  );
}
