// Keys must match the `cat` values in data/products.js exactly ("Teacake", "Cookie").
// They previously read "Tea Cakes"/"Cookies", which matched nothing — so no weight
// ever reached a product page, the cart, or the WhatsApp enquiry message.
const FIXED_WEIGHTS = { Cookie: '180g / 250g', Teacake: '250g' };

export function getFixedWeight(cat) {
  return FIXED_WEIGHTS[cat] || null;
}
