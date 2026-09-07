import { createContext, useContext, useState } from 'react';
import { whatsappUrl } from './whatsapp';
import { formatINR, getPrice, getPackWeight, cartTotal } from './pricing';

const CartContext = createContext(null);

// crypto.randomUUID is only defined in secure contexts, and is missing from the
// older in-app WebViews a share link can land in — where it would throw and take
// "Add to box" down with it. Any collision-free-enough id works for a line key.
let lineCounter = 0;
function nextLineId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  lineCounter += 1;
  return `line-${Date.now()}-${lineCounter}`;
}

// Price goes last on each line so the money lands in a consistent place in the
// WhatsApp bubble, and reuses the same ASCII "- " separator as the dairy-free and
// note modifiers rather than an em dash, which costs 9 characters once
// percent-encoded into the wa.me URL.
function buildEnquiryMessage(cart) {
  const lines = cart.map(item => {
    const weight = getPackWeight(item.product);
    const price = getPrice(item.product);
    const parts = [`${item.qty}x ${item.product.name}`];
    if (weight) parts.push(`(${weight})`);
    if (item.dairyFree) parts.push('- dairy-free');
    if (item.notes) parts.push(`- note: "${item.notes}"`);
    if (price !== null) parts.push(`- ${formatINR(price)} each = ${formatINR(price * item.qty)}`);
    return `• ${parts.join(' ')}`;
  }).join('\n');

  // Same rule as the cart's total row: quote a total only when every line has a
  // price, so the figure can never be short of an item.
  const { total, allPriced } = cartTotal(cart);
  const totalLine = allPriced && total > 0
    ? `\n\nEstimated total: ${formatINR(total)} (excl. courier)`
    : '';

  return `Hi Vanille & Zimté! I'd like to enquire about:\n${lines}${totalLine}\n\nCould you confirm availability and the final total?`;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = selection => {
    setCart(c => [...c, { lineId: nextLineId(), ...selection }]);
    setShowCart(true);
  };

  const removeFromCart = lineId => setCart(c => c.filter(item => item.lineId !== lineId));

  const updateQty = (lineId, qty) =>
    setCart(c => c.map(item => item.lineId === lineId ? { ...item, qty: Math.max(1, qty) } : item));

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Handed to the cart as an href rather than an onClick: the cart's contents are
  // already known at render time, so the CTA can be a plain link and skip every
  // popup blocker between the customer and their order.
  const enquiryUrl = cart.length ? whatsappUrl(buildEnquiryMessage(cart)) : null;

  const value = {
    cart, showCart, setShowCart, cartCount,
    addToCart, removeFromCart, updateQty, enquiryUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
