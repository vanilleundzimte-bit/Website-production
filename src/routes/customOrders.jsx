import Breadcrumbs from '../components/Breadcrumbs';
import VZOrderForm from '../components/OrderForm';
import { SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta() {
  const title = `Custom Orders — Gluten-Free Cakes | ${SITE_NAME}`;
  const description = 'Tell us about your celebration — custom gluten-free, plant-based cakes and gifting, baked to order in Noida and delivered across Delhi NCR.';
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag('/custom-orders'),
    ...socialMetaTags({ title, description }),
  ];
}

export default function CustomOrdersRoute() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Custom Orders', path: '/custom-orders' }]} />
      <VZOrderForm headingTag="h1" />
    </>
  );
}
