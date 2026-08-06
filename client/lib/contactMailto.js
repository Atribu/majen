const CONTACT_EMAIL = "info@majen.com.tr";

export function buildContactMailto({ locale, values, pageUrl }) {
  const isTurkish = locale?.startsWith("tr");
  const subject = values.subject.trim() ||
    (isTurkish
      ? `${values.productGroup} Tedarik Talebi`
      : `${values.productGroup} Supply Inquiry`);

  const body = isTurkish
    ? [
        "Merhaba Majen Ekibi,",
        "",
        "Aşağıdaki proje / tedarik talebi hakkında bilgi almak istiyorum.",
        "",
        `Talep konusu: ${subject}`,
        `Ürün grubu: ${values.productGroup}`,
        `Firma: ${values.company.trim()}`,
        `Teslimat ülkesi: ${values.country.trim()}`,
        `Tahmini miktar: ${values.quantity.trim() || "Belirtilmedi"}`,
        `Ad Soyad: ${values.name.trim()}`,
        `E-posta: ${values.email.trim()}`,
        `Telefon: ${values.phone.trim() || "Belirtilmedi"}`,
        `Sayfa bağlantısı: ${pageUrl}`,
        "",
        "Proje / Tedarik detayları:",
        values.message.trim(),
        "",
        "Saygılarımla,",
      ]
    : [
        "Hello Majen Team,",
        "",
        "I would like to receive information about the project / supply inquiry below.",
        "",
        `Inquiry subject: ${subject}`,
        `Product group: ${values.productGroup}`,
        `Company: ${values.company.trim()}`,
        `Destination country: ${values.country.trim()}`,
        `Estimated quantity: ${values.quantity.trim() || "Not specified"}`,
        `Full name: ${values.name.trim()}`,
        `Email: ${values.email.trim()}`,
        `Phone: ${values.phone.trim() || "Not specified"}`,
        `Page URL: ${pageUrl}`,
        "",
        "Project / Supply details:",
        values.message.trim(),
        "",
        "Best regards,",
      ];

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join("\n"))}`;
}
