import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquireSchema, commissionSummary } from "@/lib/inquire";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = inquireSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn(
      "[inquire] RESEND_API_KEY is not set — email delivery unavailable (dev: set key in web/.env.local)",
    );
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Set RESEND_API_KEY to enable inquiries.",
      },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const to = process.env.INQUIRE_TO_EMAIL?.trim() || "aglalit@gmail.com";
  const cc = process.env.INQUIRE_CC_EMAIL?.trim();
  const from =
    process.env.INQUIRE_FROM_EMAIL?.trim() ||
    "Kantipur Carpets <onboarding@resend.dev>";

  // Lead the subject with the audience so enquiries triage in the inbox.
  const audience = data.projectType ? `[${data.projectType}] ` : "";
  const subject = data.carpetRef
    ? `${audience}Enquiry: ${data.carpetRef}`
    : `${audience}Enquiry from ${data.name}`;

  const summary = commissionSummary(data);
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.locale ? `Locale: ${data.locale}` : null,
    summary ? `\n--- Project ---\n${summary}` : null,
    "",
    data.message,
  ].filter((line): line is string => line !== null);

  const attachments = (data.attachments ?? []).map((a) => ({
    filename: a.filename,
    content: a.content,
  }));

  const resend = new Resend(apiKey);
  const { data: sent, error } = await resend.emails.send({
    from,
    to,
    ...(cc ? { cc } : {}),
    replyTo: data.email,
    subject,
    text: lines.join("\n"),
    ...(attachments.length ? { attachments } : {}),
  });

  if (error) {
    console.error("[inquire] Resend error", { at: new Date().toISOString() });
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 502 });
  }

  console.info("[inquire] sent", { id: sent?.id, at: new Date().toISOString() });
  return NextResponse.json({ ok: true, id: sent?.id ?? null });
}
