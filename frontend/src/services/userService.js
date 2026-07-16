import { loadJSON, saveJSON, seedCurrentUser, seedUsers, seedProducts, seedRides } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getUserById(id) {
  await delay();
  const users = loadJSON('users', seedUsers);
  const currentUser = loadJSON('currentUser', seedCurrentUser);
  const u = id === currentUser.user_id ? currentUser : users[id];
  if (!u) throw new Error('User not found');
  return { data: u };
}

export async function getUserListings(id) {
  await delay();
  const products = loadJSON('products', seedProducts);
  return { data: products.filter(p => p.seller_id === id) };
}

export async function getDashboardStats() {
  await delay();
  const currentUser = loadJSON('currentUser', seedCurrentUser);
  const products = loadJSON('products', seedProducts);
  const rides = loadJSON('rides', seedRides);
  return {
    data: {
      activeListings: products.filter(p => p.seller_id === currentUser.user_id).length,
      ridesOffered: rides.filter(r => r.driver_id === currentUser.user_id).length,
      unreadMessages: Math.floor(Math.random() * 5),
      rating: currentUser.rating_avg || 0,
    },
  };
}

export async function updateProfile(data) {
  await delay();
  const currentUser = loadJSON('currentUser', seedCurrentUser);
  Object.assign(currentUser, data);
  saveJSON('currentUser', currentUser);
  return { data: currentUser };
}

export async function getPendingUsers() {
  await delay();
  const users = loadJSON('users', seedUsers);
  return { data: Object.values(users).filter(u => !u.verified) };
}

export async function verifyUser(userId) {
  await delay();
  const users = loadJSON('users', seedUsers);
  const u = users[userId];
  if (!u) throw new Error('User not found');
  u.verified = true;
  saveJSON('users', users);
  return { data: { message: 'User verified successfully' } };
}
