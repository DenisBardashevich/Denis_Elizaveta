# Денис и Елизавета — свадебное приглашение

Интерактивный сайт-приглашение: Next.js 16 (App Router), Tailwind CSS v4, Framer Motion.

## Локальный запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000) и кликни по конверту.

## Telegram-уведомления (RSVP)

Форма отправляет ответы гостей в Telegram через `/api/rsvp`. Нужны переменные окружения:

```bash
cp .env.example .env.local
```

| Переменная           | Где взять                                        |
| -------------------- | ------------------------------------------------ |
| `TELEGRAM_BOT_TOKEN` | @BotFather → `/newbot`                           |
| `TELEGRAM_CHAT_ID`   | напиши боту @userinfobot — он покажет твой id    |

Не забудь сначала нажать «Start» у своего бота — иначе он не сможет писать тебе.

## Деплой на Vercel

1. Запушь репозиторий на GitHub.
2. На [vercel.com](https://vercel.com) → **Add New → Project** → импортируй репозиторий.
3. В **Environment Variables** добавь `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
4. Deploy. Каждый пуш в `main` будет автоматически обновлять сайт.

## Структура

```
src/
  app/
    page.tsx          — сборка страницы + конверт-оверлей
    api/rsvp/route.ts — отправка формы в Telegram
  components/
    Envelope.tsx      — интерактивный конверт (hero)
    Hero.tsx          — имена, дата, таймер
    Countdown.tsx     — обратный отсчёт до 08.07.2027
    Timeline.tsx      — программа дня + эффекты при доскролле
    Gallery.tsx       — фотогалерея + лайтбокс
    Location.tsx      — карта и фото усадьбы
    RSVPForm.tsx      — форма подтверждения
    AmbientHearts.tsx — падающие сердечки на фоне
```
