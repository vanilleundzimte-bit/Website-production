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

// The price of the *base* pack — the one product.weight names. Larger packs derive
// from this via getSizePrice, so this is the only authored number in the chain.
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
// packSizes below lives on the record for both of those reasons: a product either
// offers a choice of packs or it doesn't, visibly, in its own data, and each pack is
// an integer number of grams that arithmetic can actually use.
export const DEFAULT_PACK_WEIGHT = '200g';
const DEFAULT_PACK_GRAMS = 200;

export function getPackWeight(product) {
  return (product && product.weight) || DEFAULT_PACK_WEIGHT;
}

// The grams that product.price buys, parsed from `weight` rather than stored
// separately so the two can never disagree.
function basePackGrams(product) {
  const g = parseInt(getPackWeight(product), 10);
  return Number.isFinite(g) && g > 0 ? g : DEFAULT_PACK_GRAMS;
}

export function formatPackWeight(grams) {
  return Number.isFinite(grams) && grams > 0 ? `${grams}g` : null;
}

// Every product has at least one size: the pack its price is quoted for. A one-entry
// result is how callers know there is no choice to offer, which is why there is no
// `cat === 'Teacake'` test anywhere in this module.
export function getPackSizes(product) {
  const sizes = product && product.packSizes;
  if (!Array.isArray(sizes) || sizes.length === 0) return [basePackGrams(product)];
  const usable = sizes.filter(g => Number.isFinite(g) && g > 0);
  return usable.length ? usable.slice().sort((a, b) => a - b) : [basePackGrams(product)];
}

// Larger packs are priced strictly per gram off the *rounded* base, so the base-pack
// option in the modal is the same integer as the price on the shop card and the
// rounding still happens exactly once. A size that isn't one of the product's own
// falls back to the base pack rather than scaling a guess — that is what stops a 500g
// selection left over from a teacake from inflating a cookie 2.5x.
export function getSizePrice(product, grams) {
  const base = getPrice(product);
  if (base === null) return null;
  if (!getPackSizes(product).includes(grams)) return base;
  return Math.round((base * grams) / basePackGrams(product));
}

// Add-ons are line modifiers, not products: a pot of sauce has no photo, no category
// and no product page, so making it a 12th catalog entry would mint a prerendered
// route and a sitemap URL for something that can't be bought on its own. Priced here
// rather than read from catalog.json, which this module must never import — it
// carries per-batch manufacturing cost and this file ships to the browser.
const ADD_ONS = {
  'date-choco-sauce': {
    id: 'date-choco-sauce',
    label: 'Date choco. Sauce',
    weight: '50g',
    price: 50,
  },
};

export function getAddOn(product) {
  const id = product && product.addOn;
  if (!id) return null;
  const addOn = ADD_ONS[id];
  // Shout rather than silently drop the upsell: an unknown id is a typo in
  // products.js, and the last lookup in this file that failed quietly went unnoticed
  // for months.
  if (!addOn) console.warn(`[pricing] unknown addOn "${id}" on product "${product && product.id}"`);
  return addOn || null;
}

// ---- Line-aware reads ----
// A cart line is { lineId, product, qty, grams, sauce, dairyFree, notes }. It stores
// the customer's *choices* and nothing derived: prices are recomputed on every read so
// a line can never quote a rupee figure the catalog has since moved away from.

function lineGrams(item) {
  const g = item && item.grams;
  return getPackSizes(item.product).includes(g) ? g : basePackGrams(item.product);
}

export function lineWeight(item) {
  return formatPackWeight(lineGrams(item));
}

export function lineAddOn(item) {
  return item && item.sauce ? getAddOn(item.product) : null;
}

// What one unit of this line costs, add-on folded in. The add-on is priced per unit —
// three cakes with sauce means three pots — and its price is already an integer, so
// lineUnitPrice stays a whole rupee and lineUnitPrice * qty === lineTotal exactly.
export function lineUnitPrice(item) {
  const sizePrice = getSizePrice(item.product, lineGrams(item));
  if (sizePrice === null) return null;
  const addOn = lineAddOn(item);
  return sizePrice + (addOn ? addOn.price : 0);
}

export function lineTotal(item) {
  const unit = lineUnitPrice(item);
  return unit === null ? null : unit * item.qty;
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
