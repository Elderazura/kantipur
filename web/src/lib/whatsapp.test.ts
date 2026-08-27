import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds wa.me link with encoded text", () => {
    const url = buildWhatsAppUrl("9779851020298", "Hello from TC 7081");
    expect(url).toBe("https://wa.me/9779851020298?text=Hello%20from%20TC%207081");
  });
});
