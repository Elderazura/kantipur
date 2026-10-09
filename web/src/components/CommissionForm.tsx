"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { PROJECT_TYPES, INTENTS, MAX_ATTACHMENT_BYTES } from "@/lib/inquire";

type Attachment = { filename: string; content: string; size: number };
type Status = "idle" | "sending" | "sent" | "error";

const STEPS = ["who", "need", "space", "detail"] as const;

/** Read a File as bare base64 (no data: prefix), for Resend attachments. */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

const labelCls =
  "block font-ui text-[0.74rem] tracking-[0.2em] uppercase text-ink-muted";
const inputCls =
  "mt-2 w-full border-b border-rule bg-transparent pb-2.5 font-body text-base text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-ink";

export default function CommissionForm() {
  const t = useTranslations("commission");
  const tForm = useTranslations("form");
  const locale = useLocale();
  const reduce = useReducedMotion();

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<Attachment[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const [form, setForm] = useState({
    projectType: "",
    intent: "",
    dimensions: "",
    location: "",
    timeline: "",
    material: "",
    name: "",
    email: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Each step gates the next, so the enquiry that lands is actually qualified.
  const canAdvance =
    (step === 0 && form.projectType !== "") ||
    (step === 1 && form.intent !== "") ||
    step === 2 ||
    (step === 3 && form.name.trim() !== "" && form.email.trim() !== "" && form.message.trim() !== "");

  async function onFiles(list: FileList | null) {
    if (!list?.length) return;
    setFileError(null);
    const picked = Array.from(list).slice(0, 3);
    const total = picked.reduce((n, f) => n + f.size, 0);
    if (total > MAX_ATTACHMENT_BYTES) {
      setFileError(t("fileTooLarge"));
      return;
    }
    try {
      const encoded = await Promise.all(
        picked.map(async (f) => ({
          filename: f.name,
          content: await toBase64(f),
          size: f.size,
        })),
      );
      setFiles(encoded);
    } catch {
      setFileError(t("fileFailed"));
    }
  }

  async function submit() {
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          projectType: form.projectType || undefined,
          intent: form.intent || undefined,
          dimensions: form.dimensions || undefined,
          location: form.location || undefined,
          timeline: form.timeline || undefined,
          material: form.material || undefined,
          attachments: files.length ? files : undefined,
          locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(tForm("error"));
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-rule bg-surface px-6 py-14 text-center sm:px-10">
        <p className="font-display text-2xl text-ink sm:text-3xl">{t("thanksTitle")}</p>
        <p className="mx-auto mt-4 max-w-[44ch] font-body text-base text-ink-muted">
          {t("thanksBody")}
        </p>
      </div>
    );
  }

  // Enter should move the brief along, not do nothing — so this is a real
  // form, with the step buttons as its submit control.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canAdvance || status === "sending") return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else void submit();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-rule bg-surface">
      {/* Progress — four marks, current one filled */}
      <ol className="flex border-b border-rule" aria-label={t("progressLabel")}>
        {STEPS.map((key, i) => (
          <li key={key} className="flex-1">
            <div
              className={`flex items-center gap-2.5 border-e border-rule px-3 py-3.5 last:border-e-0 sm:px-5 ${
                i === step ? "bg-ink text-paper" : "text-ink-muted"
              }`}
            >
              <span className="font-ui text-[0.74rem] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="hidden font-ui text-[0.74rem] tracking-[0.16em] uppercase sm:inline">
                {t(`step_${key}`)}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="px-5 py-8 sm:px-10 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h3 className="font-display text-xl text-ink sm:text-2xl">
              {t(`${STEPS[step]}Title`)}
            </h3>

            {/* 01 — audience */}
            {step === 0 ? (
              <fieldset className="mt-7 grid gap-px border border-rule bg-rule sm:grid-cols-2">
                <legend className="sr-only">{t("whoTitle")}</legend>
                {PROJECT_TYPES.map((p) => (
                  <label
                    key={p}
                    className={`cursor-pointer bg-surface px-5 py-4 font-body text-base transition-colors hover:bg-paper ${
                      form.projectType === p ? "bg-ink text-paper hover:bg-ink" : "text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={p}
                      checked={form.projectType === p}
                      onChange={(e) => set("projectType")(e.target.value)}
                      className="sr-only"
                    />
                    {t(`type_${p}`)}
                  </label>
                ))}
              </fieldset>
            ) : null}

            {/* 02 — intent */}
            {step === 1 ? (
              <fieldset className="mt-7 grid gap-px border border-rule bg-rule sm:grid-cols-2">
                <legend className="sr-only">{t("needTitle")}</legend>
                {INTENTS.map((i) => (
                  <label
                    key={i}
                    className={`cursor-pointer bg-surface px-5 py-4 font-body text-base transition-colors hover:bg-paper ${
                      form.intent === i ? "bg-ink text-paper hover:bg-ink" : "text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value={i}
                      checked={form.intent === i}
                      onChange={(e) => set("intent")(e.target.value)}
                      className="sr-only"
                    />
                    {t(`intent_${i}`)}
                  </label>
                ))}
              </fieldset>
            ) : null}

            {/* 03 — the space */}
            {step === 2 ? (
              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                {(["dimensions", "location", "timeline", "material"] as const).map((k) => (
                  <div key={k}>
                    <label className={labelCls} htmlFor={k}>
                      {t(`field_${k}`)}
                    </label>
                    <input
                      id={k}
                      className={inputCls}
                      placeholder={t(`ph_${k}`)}
                      value={form[k]}
                      onChange={(e) => set(k)(e.target.value)}
                    />
                  </div>
                ))}
                <p className="font-body text-sm text-ink-muted sm:col-span-2">
                  {t("spaceNote")}
                </p>
              </div>
            ) : null}

            {/* 04 — who to reply to, plus references */}
            {step === 3 ? (
              <div className="mt-7 grid gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="name">
                      {tForm("name")}
                    </label>
                    <input
                      id="name"
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">
                      {tForm("email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputCls}
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="message">
                    {tForm("message")}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`${inputCls} resize-y`}
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="attachments">
                    {t("field_uploads")}
                  </label>
                  <input
                    id="attachments"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.dwg,.dxf"
                    onChange={(e) => onFiles(e.target.files)}
                    className="mt-3 block w-full font-body text-sm text-ink-muted file:me-4 file:border file:border-rule file:bg-paper file:px-4 file:py-2 file:font-ui file:text-[0.74rem] file:uppercase file:tracking-[0.16em] file:text-ink hover:file:bg-surface"
                  />
                  <p className="mt-2 font-body text-xs text-ink-muted">{t("uploadNote")}</p>
                  {files.length ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {files.map((f) => (
                        <li
                          key={f.filename}
                          className="border border-rule px-3 py-1.5 font-ui text-[0.74rem] tracking-[0.1em] text-ink-muted"
                        >
                          {f.filename}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {fileError ? (
                    <p className="mt-2 font-body text-xs text-madder">{fileError}</p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {error ? <p className="mt-6 font-body text-sm text-madder">{error}</p> : null}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-rule pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="min-h-11 font-ui text-[0.74rem] tracking-[0.18em] uppercase text-ink-muted transition-colors hover:text-ink disabled:invisible"
          >
            {t("back")}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="submit"
              disabled={!canAdvance}
              className="inline-flex min-h-12 items-center gap-2.5 border border-ink px-6 py-3 font-ui text-[0.74rem] tracking-[0.18em] uppercase text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-rule disabled:text-ink-muted disabled:hover:bg-transparent"
            >
              {t("next")}
              <span aria-hidden className="rtl:rotate-180">→</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canAdvance || status === "sending"}
              className="inline-flex min-h-12 items-center gap-2.5 bg-ink px-7 py-3 font-ui text-[0.74rem] tracking-[0.18em] uppercase text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "sending" ? tForm("sending") : t("send")}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
