import { getMessages } from "next-intl/server";
import ScopedIntlProvider from "../../components/ScopedIntlProvider";
import { pickMessages } from "@/lib/i18nMessages";
import { resolveBlogPageKey } from "@/lib/blogPageRoutes";

export default async function BlogPostLayout({ children, params }) {
  const { locale, slug } = await params;
  const messages = await getMessages({ locale });
  const pageKey = resolveBlogPageKey(locale, slug);
  const namespaces = [
    "blog.common",
    "QuestionsSection",
    "ContactForm",
    "Footer.social",
  ];

  if (pageKey) namespaces.push(`blog.pages.${pageKey}`);

  return (
    <ScopedIntlProvider
      locale={locale}
      messages={pickMessages(messages, namespaces)}
    >
      {children}
    </ScopedIntlProvider>
  );
}
