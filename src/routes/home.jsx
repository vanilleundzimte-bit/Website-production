import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import VZHero from '../components/Hero';
import VZCollection from '../components/ProductGrid';
import VZBundlePromo from '../components/BundlePromo';
import VZTestimonials from '../components/Testimonials';
import VZNewsletter from '../components/Newsletter';
import VZProductDetail from '../components/ProductDetail';
import { VZ_DATA } from '../data/products';
import { useCart } from '../lib/CartContext';
import { SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta() {
  const title = `${SITE_NAME} — gluten-free baking, Noida & Delhi NCR`;
  const description = 'Gluten-free, plant-based cakes, cookies, and namkeen — home-baked in Noida, delivered fresh across Delhi NCR. Custom orders and bulk party gifting welcome.';
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag('/'),
    ...socialMetaTags({ title, description }),
  ];
}

export default function HomeRoute() {
  const [openProduct, setOpenProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <VZHero onShop={() => navigate('/shop')} onCustom={() => navigate('/custom-orders')} />
      <VZCollection products={VZ_DATA.products} onOpen={setOpenProduct} />
      <VZBundlePromo onShop={() => navigate('/shop')} />

      <section className="vz-section vz-section-tonal">
        <div className="vz-section-head">
          <span className="vz-eyebrow" style={{ color: 'var(--vz-cinnamon-text)' }}>our story</span>
          <h2 className="vz-section-title">
            A bakery for everyone <em>at the table.</em>
          </h2>
          <p className="vz-section-lede">
            Vanille &amp; Zimté began with one quiet conviction — that no one should be the afterthought at a celebration.{' '}
            <Link to="/our-story" style={{ color: 'var(--vz-blue-ink)', fontWeight: 500 }}>Read our full story →</Link>
          </p>
        </div>
      </section>

      <VZTestimonials />
      <VZNewsletter />

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
