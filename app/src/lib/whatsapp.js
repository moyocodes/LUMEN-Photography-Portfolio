export const WHATSAPP_NUMBER = "2347032467160"

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export const DEFAULT_BOOKING_MESSAGE =
  "Hi TTMP! I'd like to book a shoot with you. Could you let me know your availability?"
