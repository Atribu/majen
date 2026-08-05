import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { pickMessages } from "@/lib/i18nMessages";

export default async function ScopedIntlProvider({
  children,
  locale,
  namespaces,
  messages: scopedMessages,
}) {
  const messages = scopedMessages || (await getMessages({ locale }));
  const clientMessages = scopedMessages
    ? scopedMessages
    : pickMessages(messages, namespaces);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
