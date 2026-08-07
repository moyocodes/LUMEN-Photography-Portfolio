import { CONTACT } from "@/lib/siteConfig"

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encoded}`
}

export const DEFAULT_BOOKING_MESSAGE =
  "Hi LUMEN! I'd like to book a shoot with you. Could you let me know your availability?"
