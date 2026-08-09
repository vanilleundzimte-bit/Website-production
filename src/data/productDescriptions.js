// Expanded per-product copy for the /shop/:productId pages — kept separate from
// src/data/products.js so catalog metadata and long-form copy don't collide.
//
// `bulkSuitable: true` marks shelf-stable products cross-linked from the
// /bulk-party-gifting page (room-temperature favours); `false` marks refrigerated
// centrepiece items that should not be framed as travel-friendly party favours.

export const PRODUCT_DESCRIPTIONS = {
  'lemon-thyme': {
    bulkSuitable: true,
    description: "Lemon & Thyme Tea Cake is a gluten-free tea cake baked in small batches from rice, almond, and tapioca flours, brightened with fresh lemon zest and a whisper of thyme. It's portioned for quiet, unhurried moments — a slice with afternoon chai, a gift box for a teatime gathering, or a shelf-stable addition to a bulk party favour box. Being gluten-free, it holds its crumb well beyond the day it's baked, making it a practical pick for gifting several boxes at once without worrying about same-day delivery. Pair it with cookies or namkeen mix for a mixed favour box.",
  },
  'cardamom-rose': {
    bulkSuitable: true,
    description: "Cardamom Rose Cookies are gluten-free, dairy-free cookies — crisp at the edge, soft at the heart, six to a box — built around warm cardamom and a delicate rose finish. Because they're baked to be shelf-stable at room temperature, they're one of the most popular picks for bulk gifting: birthday return favours, office party boxes, and kitty party gifts that need to travel and wait before anyone opens them. Each box is portioned for easy individual gifting, so a single bulk order can be split guest-by-guest without repacking. Ask about mixed boxes if your group has varied tastes.",
  },
  'pistachio-no-3': {
    bulkSuitable: false,
    description: "Pistachio No. 3 is a gluten-free celebration cake built as a showstopper centrepiece rather than a party favour — layered, generously finished, and made to order for the one table it's meant for. It's the right choice when the celebration needs a single striking cake rather than many small boxes: a birthday, a milestone, an anniversary. Because it's a fresh, refrigerated bake, it's best ordered for a specific date rather than stockpiled in advance. Pair it with a box of Cardamom Rose Cookies or Masala Namkeen Mix if you also want individual party favours for guests.",
  },
  'vanilla-bean': {
    bulkSuitable: false,
    description: "Vanilla Bean Cheesecake is a fully plant-based, gluten-free cheesecake — silky and rich without dairy, built for a sit-down celebration rather than a mailed gift. As a refrigerated item, it has a shorter fresh-eating window than the shelf-stable cookies and namkeen mix, so it's best ordered close to your event date rather than days ahead. It works well as the centrepiece of a birthday or dinner party table, alongside a smaller box of gluten-free cookies for guests who'd like to take something home.",
  },
  'tres-leches': {
    bulkSuitable: false,
    description: "Coconut Tres Leches reworks the classic soaked sponge dairy-free and gluten-free, staying impossibly moist without traditional milk-soak dairy. It's a refrigerated, made-to-order centrepiece best suited to a specific gathering date rather than advance bulk gifting — order it close to your event so it arrives at its best. For office parties or kitty parties where you also want individual take-home favours, pair one Coconut Tres Leches centrepiece with a bulk box of Cinnamon Spice Cookies for guests.",
  },
  'masala-namkeen': {
    bulkSuitable: true,
    description: "Masala Namkeen Mix is a savoury, gluten-free snack mix — spiced, snackable, and built to sit at room temperature for the length of an event and well beyond it. It's one of the most shelf-stable products in the collection, which makes it a natural fit for office party gifting, kitty party return favours, and any bulk order that needs to survive same-day handling without refrigeration. It also gives non-dessert-inclined guests a savoury option inside a mixed gifting box alongside the cookies and tea cake.",
  },
  tiramisu: {
    bulkSuitable: false,
    description: "Espresso Tiramisu takes the classic Italian dessert fully plant-based and gluten-free, layered with espresso-soaked sponge and a dairy-free mascarpone-style cream. It's a refrigerated, made-to-order dessert meant for a specific sit-down occasion — a dinner party or date night — rather than bulk party favours, since it doesn't hold up to travel or multi-day storage the way the cookies and namkeen mix do. Order it for a confirmed date rather than stockpiling ahead of an event.",
  },
  'spiced-cookie': {
    bulkSuitable: true,
    description: "Cinnamon Spice Cookies are a small-batch, gluten-free, dairy-free cookie with a quiet cinnamon heat — built to keep at room temperature, which makes them a dependable pick for bulk party gifting. They work as birthday return favours, office party boxes, or kitty party gifts, packed individually so a single bulk order can be split guest-by-guest. Combine with Cardamom Rose Cookies and Masala Namkeen Mix for a varied mixed box that covers both sweet and savoury tastes.",
  },
  'gift-bag': {
    bulkSuitable: true,
    description: "The Gift Bag is a hand-finished packaging add-on — add it to any order when what's inside deserves a proper presentation, not just a box. Because it travels well and needs no refrigeration, it's an easy add to bulk and party gifting orders alongside shelf-stable cookies, tea cake, or namkeen mix. Ask us to pair it with your order over WhatsApp.",
  },
};
