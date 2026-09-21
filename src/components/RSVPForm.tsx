"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { SectionHeading, Reveal } from "./Section";

const ATTENDANCE = [
  "С удовольствием",
  "К сожалению, не получится",
  "Сообщим позже",
];

const DRINKS = [
  "Вино красное",
  "Вино белое",
  "Игристое",
  "Водка",
  "Коньяк",
  "Б/а напитки",
];

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-sand bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-cocoa/50 outline-none transition focus:border-gold focus:bg-white/80 focus:ring-2 focus:ring-gold/25";

const labelCls =
  "mb-3 block font-serif text-lg font-semibold text-ink";

function RadioCard({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
        checked
          ? "border-rosewood bg-blush/50 text-ink shadow-[0_8px_20px_-12px_rgba(169,104,104,0.6)]"
          : "border-sand bg-white/50 text-cocoa hover:border-gold/60"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#a96868]"
      />
      {value}
    </label>
  );
}

export default function RSVPForm() {
  const [attendance, setAttendance] = useState(ATTENDANCE[0]);
  const [name, setName] = useState("");
  const [whenLater, setWhenLater] = useState("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleDrink = (d: string) =>
    setDrinks((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance,
          name,
          whenLater,
          drinks,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Ошибка отправки");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Ошибка отправки");
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="relative px-5 py-16 sm:px-6 sm:py-32">
      <SectionHeading overline="Ждём вашего ответа" title="Подтверждение" />

      <Reveal className="mx-auto max-w-2xl">
        <form
          onSubmit={submit}
          className="glass texture-paper space-y-6 rounded-3xl p-5 shadow-[0_24px_60px_-30px_rgba(70,62,53,0.45)] sm:space-y-8 sm:p-10"
        >
          <fieldset>
            <legend className={labelCls}>Сможете ли вы быть с нами?</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {ATTENDANCE.map((v) => (
                <RadioCard
                  key={v}
                  name="attendance"
                  value={v}
                  checked={attendance === v}
                  onChange={() => setAttendance(v)}
                />
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="name" className={labelCls}>
              Имя и фамилия
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              className={inputCls}
            />
          </div>

          <AnimatePresence initial={false}>
            {attendance === "Сообщим позже" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <label htmlFor="whenLater" className={labelCls}>
                  Когда примерно сообщите?
                </label>
                <input
                  id="whenLater"
                  value={whenLater}
                  onChange={(e) => setWhenLater(e.target.value)}
                  placeholder="Например: до конца февраля"
                  className={inputCls}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {attendance !== "К сожалению, не получится" && (
              <motion.fieldset
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <legend className={labelCls}>Предпочтения по напиткам</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {DRINKS.map((d) => {
                    const on = drinks.includes(d);
                    return (
                      <label
                        key={d}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition ${
                          on
                            ? "border-olive bg-sage/25 text-ink"
                            : "border-sand bg-white/50 text-cocoa hover:border-gold/60"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleDrink(d)}
                          className="h-4 w-4 accent-[#7c8a6f]"
                        />
                        {d}
                      </label>
                    );
                  })}
                </div>
              </motion.fieldset>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-rosewood px-6 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-ivory shadow-[0_16px_36px_-14px_rgba(169,104,104,0.7)] transition hover:bg-[#965858] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
            {status === "sending" ? "Отправляем…" : "Отправить ответ"}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-sage/25 px-4 py-3 text-center text-sm text-olive"
              >
                <CheckCircle2 className="h-5 w-5" />
                Спасибо! Ваш ответ отправлен — мы получили его в Telegram.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-rose/20 px-4 py-3 text-center text-sm text-rosewood"
              >
                <XCircle className="h-5 w-5" />
                Не удалось отправить{errorMsg ? `: ${errorMsg}` : ""}. Попробуйте
                ещё раз или напишите нам напрямую.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </Reveal>
    </section>
  );
}
