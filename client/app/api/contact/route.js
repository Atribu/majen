// app/api/contact/route.js
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Nodemailer için gerekli

function htmlEscape(s = "") {
  return s.replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ));
}

export async function POST(req) {
  try {
    const { name, email, phone, subject, message, locale } = await req.json();

    // Basit sunucu tarafı doğrulama
    if (!name?.trim() || !email?.includes("@") || !message?.trim()) {
      return new Response(JSON.stringify({ error: "invalid_payload" }), { status: 400 });
    }

    // Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mail içeriği
    const to = process.env.MAIL_TO || "info@majen.com.tr";
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;

    const safe = {
      name: htmlEscape(name),
      email: htmlEscape(email),
      phone: htmlEscape(phone || ""),
      subject: htmlEscape(subject || ""),
      message: htmlEscape(message),
      locale: htmlEscape(locale || ""),
    };

    const textBody =
`Yeni iletişim formu mesajı:

Ad Soyad: ${safe.name}
E-posta: ${safe.email}
Telefon: ${safe.phone}
Dil: ${safe.locale}
Konu: ${safe.subject}

Mesaj:
${message}
`;

    const htmlBody = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 12px">Yeni İletişim Formu</h2>
        <table cellspacing="0" cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Ad Soyad</strong></td><td>${safe.name}</td></tr>
          <tr><td><strong>E-posta</strong></td><td>${safe.email}</td></tr>
          <tr><td><strong>Telefon</strong></td><td>${safe.phone || "-"}</td></tr>
          <tr><td><strong>Dil</strong></td><td>${safe.locale || "-"}</td></tr>
          <tr><td><strong>Konu</strong></td><td>${safe.subject || "-"}</td></tr>
        </table>
        <div style="margin-top:16px">
          <strong>Mesaj:</strong>
          <div style="white-space:pre-wrap;margin-top:8px">${safe.message}</div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      to,
      from,                           // SPF/DKIM için domaininle uyumlu tut
      replyTo: safe.email,            // cevapla dediğinde kullanıcıya gider
      subject: `[Majen] ${safe.subject || "Yeni ileti"} (${safe.locale || "n/a"})`,
      text: textBody,
      html: htmlBody,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error("[CONTACT ERROR]", e);
    return new Response(JSON.stringify({ error: "mail_failed" }), { status: 500 });
  }
}
