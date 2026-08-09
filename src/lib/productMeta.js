const FIXED_WEIGHTS = { Cookies: '180g / 250g', 'Tea Cakes': '250g' };

export function getFixedWeight(cat) {
  return FIXED_WEIGHTS[cat] || null;
}
