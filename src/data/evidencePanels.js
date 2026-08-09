// Evidence panels for /bulk-party-gifting — claim/methodology/source/date/limitations,
// per the AEO evidence-block format.

export const EVIDENCE_LAST_UPDATED = '2026-08-02';

export const EVIDENCE_PANELS = [
  {
    id: 'gluten-free-process',
    title: 'Evidence: 100% Gluten-Free Kitchen',
    claim: 'No wheat, barley, or rye flour is used or stored in the Noida kitchen.',
    methodology: 'All recipes are formulated from alternative flour blends (rice, almond, tapioca) from first development, rather than adapted from a wheat-based recipe.',
    source: 'Internal kitchen process, Vanille & Zimté, Noida.',
    date: '2026-07-08',
    limitations: 'Products are made in a home-style small-batch kitchen, not a certified allergen-free facility — recommended for gluten-avoidant guests, not medically diagnosed coeliac guests without direct confirmation.',
  },
  {
    id: 'shelf-life',
    title: 'Evidence: Shelf Life by Product Type',
    claim: 'Shelf-stable items (cookies, namkeen mix, tea cake) keep for 1 month at room temperature; refrigerated items (cheesecake, tres leches, tiramisu) keep for 15 days chilled.',
    methodology: 'In-house storage trial: product stored in an airtight container at room temperature or under refrigeration and checked for freshness through the shelf-life window stated above.',
    source: 'Internal product testing, Vanille & Zimté.',
    date: '2026-08-02',
    limitations: 'Shelf life assumes airtight storage out of direct sunlight/heat; actual freshness window may vary with ambient temperature during Delhi NCR summer months.',
  },
  {
    id: 'delivery-area',
    title: 'Evidence: Delhi NCR Delivery Coverage',
    claim: 'Bulk and party orders are delivered across Noida, Delhi, Gurugram, and Ghaziabad from the Noida kitchen.',
    methodology: 'Delivery via standard courier partners, dispatched the next business day after order confirmation; bulk/event orders scheduled to a specific delivery date on request.',
    source: 'Internal delivery/courier arrangement, Vanille & Zimté.',
    date: '2026-07-08',
    limitations: 'Courier charges apply on orders below ₹1000; exact delivery windows for a given pin code are confirmed on WhatsApp before the order is finalised.',
  },
];
