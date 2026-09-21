import { NextResponse } from "next/server";

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректные данные" },
      { status: 400 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Telegram-бот не настроен на сервере" },
      { status: 500 }
    );
  }

  const drinks = Array.isArray(body.drinks)
    ? body.drinks.map(esc).filter(Boolean).join(", ")
    : "";

  const lines = [
    "💍 <b>Новый ответ на приглашение</b>",
    "",
    `<b>ФИО:</b> ${esc(body.name) || "—"}`,
    `<b>Присутствие:</b> ${esc(body.attendance) || "—"}`,
    esc(body.whenLater) ? `<b>Когда сообщит:</b> ${esc(body.whenLater)}` : null,
    `<b>Напитки:</b> ${drinks || "—"}`,
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { ok: false, error: esc(err?.description) || "Ошибка Telegram API" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
