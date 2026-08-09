import { createContext, useContext, useState } from 'react';
import { openWhatsApp } from './whatsapp';
import { getFixedWeight } from './productMeta';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = selection => {
    setCart(c => [...c, { lineId: crypto.randomUUID(), ...selection }]);
    setShowCart(true);
  };

  const removeFromCart = lineId => setCart(c => c.filter(item => item.lineId !== lineId));

  const updateQty = (lineId, qty) =>
    setCart(c => c.map(item => item.lineId === lineId ? { ...item, qty: Math.max(1, qty) } : item));

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const enquireOnWhatsApp = () => {
    const lines = cart.map(item => {
      const weight = getFixedWeight(item.product.cat);
      const parts = [`${item.qty}x ${item.product.name}`];
      if (weight) parts.push(`(${weight})`);
      if (item.dairyFree) parts.push('- dairy-free');
      if (item.notes) parts.push(`- note: "${item.notes}"`);
      return `• ${parts.join(' ')}`;
    }).join('\n');
    openWhatsApp(`Hi Vanille & Zimté! I'd like to enquire about:\n${lines}\n\nCould you share availability and pricing?`);
  };

  const value = {
    cart, showCart, setShowCart, cartCount,
    addToCart, removeFromCart, updateQty, enquireOnWhatsApp,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
