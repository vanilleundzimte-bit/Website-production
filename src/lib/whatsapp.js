export const WHATSAPP_NUMBER = '919599611077';

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Every "Continue on WhatsApp" CTA funnels through here, so how it navigates decides
// whether the site can take an order at all.
//
// `window.open(url, '_blank', 'noopener,noreferrer')` looks harmless but the third
// argument is what breaks it: passing a window-features string makes the browser
// classify the call as a *popup* rather than a new tab. iOS Safari blocks popups by
// default, and the in-app browsers a bakery's Instagram traffic arrives in block them
// outright — so the button did nothing at all for most phone users, silently.
//
// On touch devices we navigate the current tab instead: wa.me hands off to the
// installed WhatsApp app, and the site stays in history so Back returns to it.
// Desktop keeps a real new tab, via a synthetic anchor click (ordinary navigation,
// not a popup) so the user doesn't lose the page they were building an order on.
export function openWhatsApp(message) {
  const url = whatsappUrl(message);

  if (typeof window === 'undefined') return;

  if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
    window.location.href = url;
    return;
  }

  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
