"use client";

import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

type InquireFormProps = {
  carpetRef?: string;
};

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function InquireForm({ carpetRef }: InquireFormProps) {
  const t = useTranslations("form");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [refValue, setRefValue] = useState(carpetRef ?? "");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = t("required");
    if (!email.trim()) {
      next.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = t("invalidEmail");
    }
    if (!message.trim()) next.message = t("required");
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          carpetRef: refValue.trim() || undefined,
          locale,
        }),
      });

      if (!res.ok) {
        setFormError(t("error"));
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      if (!carpetRef) setRefValue("");
      setErrors({});
    } catch {
      setFormError(t("error"));
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full border border-rule bg-paper px-3 py-2.5 font-body text-base text-ink placeholder:text-ink-muted/60 focus-visible:border-madder";
  const labelClass = "font-ui text-xs tracking-[0.14em] uppercase text-ink-muted";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="inquire-name" className={labelClass}>
          {t("name")}
        </label>
        <input
          id="inquire-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
          aria-invalid={Boolean(errors.name)}
          className={fieldClass}
        />
        {errors.name ? (
          <p className="mt-1.5 font-body text-sm text-madder" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="inquire-email" className={labelClass}>
          {t("email")}
        </label>
        <input
          id="inquire-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          aria-invalid={Boolean(errors.email)}
          className={fieldClass}
        />
        {errors.email ? (
          <p className="mt-1.5 font-body text-sm text-madder" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="inquire-ref" className={labelClass}>
          {t("carpetRef")}
        </label>
        <input
          id="inquire-ref"
          name="carpetRef"
          type="text"
          value={refValue}
          onChange={(e) => setRefValue(e.target.value)}
          disabled={submitting || Boolean(carpetRef)}
          readOnly={Boolean(carpetRef)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="inquire-message" className={labelClass}>
          {t("message")}
        </label>
        <textarea
          id="inquire-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} resize-y min-h-[8rem]`}
        />
        {errors.message ? (
          <p className="mt-1.5 font-body text-sm text-madder" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p className="font-body text-sm text-madder" role="alert">
          {formError}
        </p>
      ) : null}

      {success ? (
        <p className="font-body text-base text-ink" role="status">
          {t("success")}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-11 items-center border border-madder px-6 font-ui text-sm tracking-[0.14em] uppercase text-madder transition-colors hover:border-madder-deep hover:bg-madder hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? t("sending") : t("send")}
      </button>
    </form>
  );
}
