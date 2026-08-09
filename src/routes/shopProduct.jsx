import { useParams, Link } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductDetailContent from '../components/ProductDetailContent';
import { JsonLd, buildProductSchema, buildBreadcrumbSchema } from '../seo/schema';
import { VZ_DATA } from '../data/products';
import { PRODUCT_DESCRIPTIONS } from '../data/productDescriptions';
import { useCart } from '../lib/CartContext';
import { SITE_URL, SITE_NAME, canonicalTag, socialMetaTags } from '../lib/siteConfig';

export function meta({ params }) {
  const product = VZ_DATA.products.find(p => p.id === params.productId);
  if (!product) return [{ title: `Product not found | ${SITE_NAME}` }];
  const extra = PRODUCT_DESCRIPTIONS[product.id];
  const title = `${product.name} — Gluten-Free ${product.cat} | ${SITE_NAME}`;
  const description = (extra?.description || product.blurb).slice(0, 155);
  return [
    { title },
    { name: 'description', content: description },
    canonicalTag(`/shop/${product.id}`),
    ...socialMetaTags({ title, description }),
  ];
}

export default function ShopProductRoute() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const product = VZ_DATA.products.find(p => p.id === productId);
  const extra = product ? PRODUCT_DESCRIPTIONS[product.id] : null;

  if (!product) {
    return (
      <section className="vz-section">
        <div className="vz-section-head">
          <h1 className="vz-section-title">Product not found</h1>
          <p className="vz-section-lede">
            That product doesn't exist (any more). <Link to="/shop">Back to the collection →</Link>
          </p>
        </div>
      </section>
    );
  }

  const url = `${SITE_URL}/shop/${product.id}`;

  return (
    <section className="vz-section">
      <Breadcrumbs crumbs={[
        { name: 'Home', path: '/' },
        { name: 'The Collection', path: '/shop' },
        { name: product.name, path: `/shop/${product.id}` },
      ]} />

      <div className="vz-product-page" style={{ marginTop: 28 }}>
        <div className="vz-modal-art" style={{ background: product.color }}>
          {product.photo
            ? <img src={product.photo} alt={product.name} className="vz-modal-photo" />
            : (
              <>
                <img src="/assets/pattern.png" alt="" className="vz-modal-pattern" width="530" height="370" />
                <img src="/assets/logo-mark.png" alt="" className="vz-modal-mark" width="465" height="654" />
              </>
            )}
        </div>
        <div>
          <ProductDetailContent
            product={product}
            longDescription={extra?.description}
            onAdd={addToCart}
          />
          {extra?.bulkSuitable && (
            <p className="vz-related-bulk">
              This is one of our shelf-stable picks for bulk gifting.{' '}
              <Link to="/bulk-party-gifting">See bulk &amp; party gifting options →</Link>
            </p>
          )}
        </div>
      </div>

      <JsonLd data={buildProductSchema(product, { url, description: extra?.description })} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'The Collection', path: '/shop' },
        { name: product.name, path: `/shop/${product.id}` },
      ])} />
    </section>
  );
}
