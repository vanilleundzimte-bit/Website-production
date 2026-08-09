import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.jsx'),
  route('shop', 'routes/shop.jsx'),
  route('shop/:productId', 'routes/shopProduct.jsx'),
  route('bulk-party-gifting', 'routes/bulkPartyGifting.jsx'),
  route('custom-orders', 'routes/customOrders.jsx'),
  route('our-story', 'routes/ourStory.jsx'),
  route('faq', 'routes/faq.jsx'),
];
