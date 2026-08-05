import ScopedIntlProvider from "../components/ScopedIntlProvider";

export default async function GalleryLayout({ children, params }) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider
      locale={locale}
      namespaces={["Gallery", "ContactForm", "Footer.social"]}
    >
      {children}
    </ScopedIntlProvider>
  );
}
