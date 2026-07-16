import { loadJSON, saveJSON, seedProducts, seedWishlist, IS_PREVIEW } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getWishlist() {
  if (IS_PREVIEW) {
    await delay();
    const products = loadJSON('products', seedProducts);
    const wishlist = loadJSON('wishlist', seedWishlist);
    return { data: products.filter(p => wishlist.includes(p.product_id)) };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/wishlist');
  return { data: response.data };
}

export async function addToWishlist(productId) {
  if (IS_PREVIEW) {
    await delay();
    const wishlist = loadJSON('wishlist', seedWishlist);
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      saveJSON('wishlist', wishlist);
    }
    return { data: { message: 'Added to wishlist' } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.post('/products/' + productId + '/wishlist');
  return { data: response.data };
}

export async function removeFromWishlist(productId) {
  if (IS_PREVIEW) {
    await delay();
    let wishlist = loadJSON('wishlist', seedWishlist);
    wishlist = wishlist.filter(id => id !== productId);
    saveJSON('wishlist', wishlist);
    return { data: { message: 'Removed from wishlist' } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.delete('/products/' + productId + '/wishlist');
  return { data: response.data };
}
