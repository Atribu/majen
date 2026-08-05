import { getMessages } from "next-intl/server";
import ScopedIntlProvider from "../../components/ScopedIntlProvider";
import { pickProductMessages } from "@/lib/i18nMessages";

export default async function BlockLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <ScopedIntlProvider
      locale={locale}
      messages={pickProductMessages(messages, "blocks")}
    >
      {children}
    </ScopedIntlProvider>
  );
}
