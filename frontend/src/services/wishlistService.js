import { loadJSON, saveJSON, seedProducts, seedWishlist } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getWishlist() {
  await delay();
  const products = loadJSON('products', seedProducts);
  const wishlist = loadJSON('wishlist', seedWishlist);
  return { data: products.filter(p => wishlist.includes(p.product_id)) };
}

export async function addToWishlist(productId) {
  await delay();
  const wishlist = loadJSON('wishlist', seedWishlist);
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveJSON('wishlist', wishlist);
  }
  return { data: { message: 'Added to wishlist' } };
}

export async function removeFromWishlist(productId) {
  await delay();
  let wishlist = loadJSON('wishlist', seedWishlist);
  wishlist = wishlist.filter(id => id !== productId);
  saveJSON('wishlist', wishlist);
  return { data: { message: 'Removed from wishlist' } };
}
