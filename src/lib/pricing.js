// Money for the shop. Every price is a whole rupee, and every downstream figure is
// derived from an integer, so a displayed unit price times a quantity always equals
// the displayed subtotal.

// Formatting is hand-rolled rather than Intl.NumberFormat('en-IN') so the string is
// byte-identical between the build-time prerender and hydration — a mismatch there
// makes React throw away the prerendered markup and repaint the price. It also
// survives the stripped-down in-app WebViews this site's traffic arrives in, the
// same reason CartContext guards crypto.randomUUID. Grouping is Indian (1,19,600).
export function formatINR(value) {
  if (!Number.isFinite(value)) return null;
  const n = Math.round(value);
  const digits = String(Math.abs(n));
  const head = digits.length > 3 ? digits.slice(0, -3) : '';
  const tail = digits.length > 3 ? digits.slice(-3) : digits;
  const grouped = head ? `${head.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${tail}` : tail;
  return `${n < 0 ? '-' : ''}₹${grouped}`;
}

// Rounds once, here, at the data boundary. Rounding the line subtotal instead would
// let an item render as "₹263 each" beside a 3x subtotal of ₹788. A missing or
// unusable price means "not priced yet" — callers render nothing rather than "₹0".
export function getPrice(product) {
  const p = product && product.price;
  return Number.isFinite(p) && p > 0 ? Math.round(p) : null;
}

// Weight is read off the product, not off a category map. The category map this
// replaced silently matched nothing for months because its keys drifted, and it
// carried '180g / 250g' — two SKUs in one string, which no price can attach to.
export const DEFAULT_PACK_WEIGHT = '200g';

export function getPackWeight(product) {
  return (product && product.weight) || DEFAULT_PACK_WEIGHT;
}

export function lineTotal(item) {
  const price = getPrice(item.product);
  return price === null ? null : price * item.qty;
}

// allPriced is false if any line has no price, so callers can suppress the total
// rather than quote a number that silently leaves an item out.
export function cartTotal(cart) {
  let total = 0;
  let allPriced = true;
  for (const item of cart) {
    const line = lineTotal(item);
    if (line === null) allPriced = false;
    else total += line;
  }
  return { total, allPriced };
}
