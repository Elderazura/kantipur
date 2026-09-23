import { z } from "zod";

/** Who is asking — routes the enquiry and sets the tone of the reply. */
export const PROJECT_TYPES = [
  "privateResidence",
  "hospitality",
  "designer",
  "collector",
  "trade",
] as const;

/** What they need — decides whether this is a sale or a commission. */
export const INTENTS = [
  "existingDesign",
  "bespokeDesign",
  "multiplePieces",
  "consultation",
] as const;

const MAX_ATTACHMENTS = 3;
/** Keep the JSON body well inside the route body limit once base64-encoded. */
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

export const attachmentSchema = z.object({
  filename: z.string().min(1).max(200),
  /** base64, no data: prefix */
  content: z.string().min(1),
  size: z.number().int().positive().max(MAX_ATTACHMENT_BYTES),
});

export const inquireSchema = z.object({
  // Always required — the simple product-page form sends only these.
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
  carpetRef: z.string().max(300).optional(),
  locale: z.string().max(5).optional(),

  // Commission flow — optional so the short form still validates.
  projectType: z.enum(PROJECT_TYPES).optional(),
  intent: z.enum(INTENTS).optional(),
  dimensions: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  timeline: z.string().max(200).optional(),
  material: z.string().max(200).optional(),
  attachments: z.array(attachmentSchema).max(MAX_ATTACHMENTS).optional(),
});

export type InquirePayload = z.infer<typeof inquireSchema>;

/** Human-readable summary of the commission fields, for the email body. */
export function commissionSummary(d: InquirePayload): string {
  const rows: [string, string | undefined][] = [
    ["Project type", d.projectType],
    ["Looking for", d.intent],
    ["Dimensions", d.dimensions],
    ["Location", d.location],
    ["Timeline", d.timeline],
    ["Material preference", d.material],
    ["Design reference", d.carpetRef],
  ];
  return rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
