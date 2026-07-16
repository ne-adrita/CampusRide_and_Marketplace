import { loadJSON, saveJSON, seedCurrentUser, seedUsers, seedProducts, seedRides, IS_PREVIEW } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getUserById(id) {
  if (IS_PREVIEW) {
    await delay();
    const users = loadJSON('users', seedUsers);
    const currentUser = loadJSON('currentUser', seedCurrentUser);
    const u = id === currentUser.user_id ? currentUser : users[id];
    if (!u) throw new Error('User not found');
    return { data: u };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/users/' + id);
  return { data: response.data };
}

export async function getUserListings(id) {
  if (IS_PREVIEW) {
    await delay();
    const products = loadJSON('products', seedProducts);
    return { data: products.filter(p => p.seller_id === id) };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/users/' + id + '/listings');
  return { data: response.data };
}

export async function getDashboardStats() {
  if (IS_PREVIEW) {
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
  const { default: api } = await import('../api/axios');
  const response = await api.get('/users/stats');
  return { data: response.data };
}

export async function updateProfile(data) {
  if (IS_PREVIEW) {
    await delay();
    const currentUser = loadJSON('currentUser', seedCurrentUser);
    Object.assign(currentUser, data);
    saveJSON('currentUser', currentUser);
    return { data: currentUser };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.put('/users/profile', data);
  return { data: response.data };
}

export async function getPendingUsers() {
  if (IS_PREVIEW) {
    await delay();
    const users = loadJSON('users', seedUsers);
    return { data: Object.values(users).filter(u => !u.verified) };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/admin/users/pending');
  return { data: response.data };
}

export async function verifyUser(userId) {
  if (IS_PREVIEW) {
    await delay();
    const users = loadJSON('users', seedUsers);
    const u = users[userId];
    if (!u) throw new Error('User not found');
    u.verified = true;
    saveJSON('users', users);
    return { data: { message: 'User verified successfully' } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.put('/admin/users/' + userId + '/verify');
  return { data: response.data };
}
