import { VZ_DATA } from './src/data/products.js';
import { STATIC_ROUTES } from './src/lib/siteRoutes.js';

export default {
  ssr: false,
  appDirectory: 'src',
  async prerender() {
    return [
      ...STATIC_ROUTES.map(r => r.path),
      ...VZ_DATA.products.map(p => `/shop/${p.id}`),
    ];
  },
};
