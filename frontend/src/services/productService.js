import { loadJSON, saveJSON, seedProducts, seedCategories, generateId, IS_PREVIEW } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getCategories() {
  if (IS_PREVIEW) {
    await delay();
    const cats = loadJSON('categories', seedCategories);
    return { data: cats };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/categories');
  return { data: response.data };
}

export async function getProducts(params = {}) {
  if (IS_PREVIEW) {
    await delay();
    let products = loadJSON('products', seedProducts);
    const cats = loadJSON('categories', seedCategories);

    if (params.search) {
      const s = params.search.toLowerCase();
      products = products.filter(p => p.title.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s));
    }
    if (params.category) products = products.filter(p => p.category_id === params.category);
    if (params.condition) products = products.filter(p => p.condition === params.condition);
    if (params.minPrice) products = products.filter(p => p.price >= Number(params.minPrice));
    if (params.maxPrice) products = products.filter(p => p.price <= Number(params.maxPrice));
    if (params.location) products = products.filter(p => (p.location || '').toLowerCase().includes(params.location.toLowerCase()));

    if (params.sort === 'price_asc') products.sort((a, b) => a.price - b.price);
    else if (params.sort === 'price_desc') products.sort((a, b) => b.price - a.price);
    else products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 20;
    const total = products.length;
    const pages = Math.ceil(total / limit);
    const paginated = products.slice((page - 1) * limit, page * limit);

    return { data: { products: paginated, pagination: { page, limit, total, pages }, categories: cats } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/products', { params });
  return { data: response.data };
}

export async function getProductById(id) {
  if (IS_PREVIEW) {
    await delay();
    const products = loadJSON('products', seedProducts);
    const product = products.find(p => p.product_id === id);
    if (!product) throw new Error('Product not found');
    return { data: product };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/products/' + id);
  return { data: response.data };
}

export async function createProduct(data) {
  if (IS_PREVIEW) {
    await delay();
    const products = loadJSON('products', seedProducts);
    const currentUser = loadJSON('currentUser', {});
    const newProduct = {
      product_id: generateId('prod_'),
      ...data,
      price: Number(data.price),
      seller_id: currentUser.user_id,
      seller_name: currentUser.name,
      seller_rating: currentUser.rating_avg || 0,
      seller_verified: currentUser.verified || false,
      image: null,
      created_at: new Date().toISOString(),
    };
    products.unshift(newProduct);
    saveJSON('products', products);
    return { data: newProduct };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.post('/products', data);
  return { data: response.data };
}

export async function updateProduct(id, data) {
  if (IS_PREVIEW) {
    await delay();
    const products = loadJSON('products', seedProducts);
    const idx = products.findIndex(p => p.product_id === id);
    if (idx === -1) throw new Error('Product not found');
    products[idx] = { ...products[idx], ...data };
    saveJSON('products', products);
    return { data: products[idx] };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.put('/products/' + id, data);
  return { data: response.data };
}

export async function deleteProduct(id) {
  if (IS_PREVIEW) {
    await delay();
    let products = loadJSON('products', seedProducts);
    products = products.filter(p => p.product_id !== id);
    saveJSON('products', products);
    return { data: { message: 'Product deleted' } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.delete('/products/' + id);
  return { data: response.data };
}
