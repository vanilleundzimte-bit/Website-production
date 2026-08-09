import { useState } from 'react';
import VZCollection from '../components/ProductGrid';
import VZProductDetail from '../components/ProductDetail';
import Breadcrumbs from '../components/Breadcrumbs';
import { VZ_DATA } from '../data/products';
import { useCart } from '../lib/CartContext';
import { SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta() {
  const title = `The Collection — Gluten-Free Cakes, Cookies & Namkeen | ${SITE_NAME}`;
  const description = 'Browse the full gluten-free, plant-based collection: tea cakes, birthday cakes, cookies, cheesecakes, tres leches, tiramisu, and namkeen mix. Baked in Noida, delivered across Delhi NCR.';
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag('/shop'),
    ...socialMetaTags({ title, description }),
  ];
}

export default function ShopRoute() {
  const [openProduct, setOpenProduct] = useState(null);
  const { addToCart } = useCart();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'The Collection', path: '/shop' }]} />
      <VZCollection products={VZ_DATA.products} onOpen={setOpenProduct} headingTag="h1" />

      {openProduct && (
        <VZProductDetail
          product={openProduct}
          onClose={() => setOpenProduct(null)}
          onAdd={addToCart}
        />
      )}
    </>
  );
}
