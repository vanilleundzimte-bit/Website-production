export const WHATSAPP_NUMBER = '919599611077';

export function openWhatsApp(message) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}
