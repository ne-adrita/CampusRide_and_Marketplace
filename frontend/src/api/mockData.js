const now = new Date();
const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(now); dayAfter.setDate(dayAfter.getDate() + 2);

export const mockCurrentUser = {
  user_id: 'user_001',
  name: 'Alex Student',
  email: 'alex@university.edu',
  studentId: 'STU-2024-042',
  verified: true,
  role: 'student',
  avatar: null,
  phone: '+1-555-0100',
  bio: 'CS junior. Love hiking and photography.',
  rating_avg: 4.8,
  created_at: '2024-01-15T10:00:00Z',
  ride_count: 12,
};

export const mockCategories = [
  { category_id: 'cat_1', name: 'Electronics' },
  { category_id: 'cat_2', name: 'Books' },
  { category_id: 'cat_3', name: 'Furniture' },
  { category_id: 'cat_4', name: 'Clothing' },
  { category_id: 'cat_5', name: 'Sports & Outdoors' },
  { category_id: 'cat_6', name: 'Other' },
];

const mockProducts = [
  { product_id: 'prod_1', title: 'MacBook Pro 14" M3', price: 1899, condition: 'Like New', seller_name: 'Alex Student', seller_id: 'user_001', seller_rating: 4.8, seller_verified: true, description: 'Used for one semester. Mint condition, original box included.', location: 'Dhanmondi', category_id: 'cat_1', image: null },
  { product_id: 'prod_2', title: 'Calculus Textbook - Early Transcendentals', price: 45, condition: 'Good', seller_name: 'Sarah Chen', seller_id: 'user_002', seller_rating: 4.5, seller_verified: true, description: 'Some highlights, but overall good condition.', location: 'Gulshan', category_id: 'cat_2', image: null },
  { product_id: 'prod_3', title: 'Desk Lamp LED', price: 25, condition: 'New', seller_name: 'Rafiq Hasan', seller_id: 'user_003', seller_rating: 4.2, seller_verified: false, description: 'Brand new, never used. USB charging port.', location: 'Uttara', category_id: 'cat_3', image: null },
  { product_id: 'prod_4', title: 'Sony WH-1000XM5 Headphones', price: 280, condition: 'Like New', seller_name: 'Priya Sharma', seller_id: 'user_004', seller_rating: 4.9, seller_verified: true, description: 'Used twice. Noise cancelling is amazing!', location: 'Banani', category_id: 'cat_1', image: null },
  { product_id: 'prod_5', title: 'Yoga Mat Premium', price: 35, condition: 'Good', seller_name: 'Alex Student', seller_id: 'user_001', seller_rating: 4.8, seller_verified: true, description: '6mm thick, non-slip. Used for 3 months.', location: 'Dhanmondi', category_id: 'cat_5', image: null },
  { product_id: 'prod_6', title: 'Principles of Microeconomics', price: 30, condition: 'Fair', seller_name: 'Emily Watson', seller_id: 'user_005', seller_rating: 4.0, seller_verified: true, description: 'Worn cover but all pages intact.', location: 'Mohammadpur', category_id: 'cat_2', image: null },
  { product_id: 'prod_7', title: 'Graphic T-Shirt Collection', price: 60, condition: 'Good', seller_name: 'Rafiq Hasan', seller_id: 'user_003', seller_rating: 4.2, seller_verified: false, description: '5 premium graphic tees. Size M.', location: 'Uttara', category_id: 'cat_4', image: null },
  { product_id: 'prod_8', title: 'iPad Air + Pencil', price: 550, condition: 'Like New', seller_name: 'Sarah Chen', seller_id: 'user_002', seller_rating: 4.5, seller_verified: true, description: 'iPad Air M1 with Apple Pencil 2. Great for note-taking.', location: 'Gulshan', category_id: 'cat_1', image: null },
  { product_id: 'prod_9', title: 'Ergonomic Office Chair', price: 120, condition: 'Good', seller_name: 'Emily Watson', seller_id: 'user_005', seller_rating: 4.0, seller_verified: true, description: 'Adjustable height and lumbar support.', location: 'Mohammadpur', category_id: 'cat_3', image: null },
  { product_id: 'prod_10', title: 'Winter Jacket - North Face', price: 150, condition: 'New', seller_name: 'Priya Sharma', seller_id: 'user_004', seller_rating: 4.9, seller_verified: true, description: 'Never worn. Wrong size - need M, got L.', location: 'Banani', category_id: 'cat_4', image: null },
  { product_id: 'prod_11', title: 'Arduino Starter Kit', price: 65, condition: 'Good', seller_name: 'Alex Student', seller_id: 'user_001', seller_rating: 4.8, seller_verified: true, description: 'Complete kit with sensors and guide.', location: 'Dhanmondi', category_id: 'cat_1', image: null },
  { product_id: 'prod_12', title: 'Basketball - Spalding', price: 40, condition: 'Fair', seller_name: 'Sarah Chen', seller_id: 'user_002', seller_rating: 4.5, seller_verified: true, description: 'Indoor/outdoor. Some wear but still bounces great.', location: 'Gulshan', category_id: 'cat_5', image: null },
];

const mockRides = [
  { ride_id: 'ride_1', driver_name: 'Alex Student', driver_id: 'user_001', driver_rating: 4.8, origin: 'Dhanmondi 27', destination: 'NSU Campus', date_time: tomorrow.toISOString(), seats_total: 4, seats_available: 3, fare_per_seat: 3, vehicle_details: 'Toyota Axio, Blue', status: 'active' },
  { ride_id: 'ride_2', driver_name: 'Sarah Chen', driver_id: 'user_002', driver_rating: 4.5, origin: 'Gulshan 1', destination: 'NSU Campus', date_time: tomorrow.toISOString(), seats_total: 3, seats_available: 2, fare_per_seat: 4, vehicle_details: 'Honda Civic, White', status: 'active' },
  { ride_id: 'ride_3', driver_name: 'Rafiq Hasan', driver_id: 'user_003', driver_rating: 4.2, origin: 'Uttara Sector 10', destination: 'NSU Campus', date_time: dayAfter.toISOString(), seats_total: 4, seats_available: 4, fare_per_seat: 5, vehicle_details: 'Toyota Corolla, Silver', status: 'active' },
  { ride_id: 'ride_4', driver_name: 'Priya Sharma', driver_id: 'user_004', driver_rating: 4.9, origin: 'Banani 11', destination: 'NSU Campus', date_time: tomorrow.toISOString(), seats_total: 3, seats_available: 1, fare_per_seat: 2, vehicle_details: 'Suzuki Swift, Red', status: 'active' },
  { ride_id: 'ride_5', driver_name: 'Emily Watson', driver_id: 'user_005', driver_rating: 4.0, origin: 'Mohammadpur', destination: 'Gulshan 2', date_time: dayAfter.toISOString(), seats_total: 4, seats_available: 4, fare_per_seat: 4, vehicle_details: 'Nissan Sunny, Gray', status: 'active' },
  { ride_id: 'ride_6', driver_name: 'Alex Student', driver_id: 'user_001', driver_rating: 4.8, origin: 'NSU Campus', destination: 'Dhanmondi 27', date_time: new Date(now.getTime() + 3600000 * 5).toISOString(), seats_total: 4, seats_available: 2, fare_per_seat: 3, vehicle_details: 'Toyota Axio, Blue', status: 'active' },
  { ride_id: 'ride_7', driver_name: 'Sarah Chen', driver_id: 'user_002', driver_rating: 4.5, origin: 'NSU Campus', destination: 'Gulshan 1', date_time: new Date(now.getTime() + 3600000 * 6).toISOString(), seats_total: 3, seats_available: 0, fare_per_seat: 4, vehicle_details: 'Honda Civic, White', status: 'completed' },
];

const mockConversations = [
  { user_id: 'user_002', name: 'Sarah Chen', profile_pic: null, last_message: 'Is the iPad still available?' },
  { user_id: 'user_004', name: 'Priya Sharma', profile_pic: null, last_message: 'Sure, see you at 3pm!' },
  { user_id: 'user_003', name: 'Rafiq Hasan', profile_pic: null, last_message: 'Thanks for the ride!' },
];

const mockMessages = {
  user_002: [
    { message_id: 'msg_1', sender_id: 'user_002', content: 'Hi! Is the iPad still available?', sent_at: new Date(now.getTime() - 3600000 * 2).toISOString() },
    { message_id: 'msg_2', sender_id: 'user_001', content: 'Yes, still available!', sent_at: new Date(now.getTime() - 3600000 * 1.5).toISOString() },
    { message_id: 'msg_3', sender_id: 'user_002', content: 'Can I see it tomorrow?', sent_at: new Date(now.getTime() - 3600000 * 1).toISOString() },
  ],
  user_004: [
    { message_id: 'msg_4', sender_id: 'user_001', content: 'Hey, interested in the headphones', sent_at: new Date(now.getTime() - 3600000 * 24).toISOString() },
    { message_id: 'msg_5', sender_id: 'user_004', content: 'Sure, see you at 3pm!', sent_at: new Date(now.getTime() - 3600000 * 23).toISOString() },
  ],
};

const otherUsers = {
  user_002: { user_id: 'user_002', name: 'Sarah Chen', email: 'sarah@university.edu', studentId: 'STU-2024-015', verified: true, role: 'student', avatar: null, phone: '+1-555-0102', bio: 'Business major, love reading and coffee.', rating_avg: 4.5, created_at: '2024-02-01T10:00:00Z', ride_count: 8 },
  user_003: { user_id: 'user_003', name: 'Rafiq Hasan', email: 'rafiq@university.edu', studentId: 'STU-2024-023', verified: false, role: 'student', avatar: null, phone: '+1-555-0103', bio: 'Engineering student. Part-time photographer.', rating_avg: 4.2, created_at: '2024-03-10T10:00:00Z', ride_count: 5 },
  user_004: { user_id: 'user_004', name: 'Priya Sharma', email: 'priya@university.edu', studentId: 'STU-2024-008', verified: true, role: 'student', avatar: null, phone: '+1-555-0104', bio: 'Art major. Love painting and music.', rating_avg: 4.9, created_at: '2024-01-20T10:00:00Z', ride_count: 15 },
  user_005: { user_id: 'user_005', name: 'Emily Watson', email: 'emily@university.edu', studentId: 'STU-2024-031', verified: true, role: 'student', avatar: null, phone: '+1-555-0105', bio: 'Literature major. Book club organizer.', rating_avg: 4.0, created_at: '2024-04-05T10:00:00Z', ride_count: 3 },
};

let wishlistItems = ['prod_4', 'prod_8'];

const store = {
  products: [...mockProducts],
  rides: [...mockRides],
  conversations: [...mockConversations],
  messages: JSON.parse(JSON.stringify(mockMessages)),
  nextProductId: 13,
  nextRideId: 8,
  nextMessageId: 6,
  wishlist: wishlistItems,
};

export function resetMockStore() {
  store.products = [...mockProducts];
  store.rides = [...mockRides];
  store.conversations = [...mockConversations];
  store.messages = JSON.parse(JSON.stringify(mockMessages));
  store.nextProductId = 13;
  store.nextRideId = 8;
  store.nextMessageId = 6;
  store.wishlist = [...wishlistItems];
}

export function handleMockRequest(config) {
  const { method, url, params, data: body } = config;
  const baseUrl = url.split('?')[0];
  const queryParams = params || {};

  const paginate = (items, page = 1, limit = 20) => ({
    products: items.slice((page - 1) * limit, page * limit),
    rides: items.slice((page - 1) * limit, page * limit),
    pagination: { page, limit, total: items.length, pages: Math.ceil(items.length / limit) },
  });

  const matchRoute = (pattern) => {
    const regex = new RegExp('^' + pattern.replace(/:\w+/g, '([^/]+)') + '$');
    const match = baseUrl.match(regex);
    if (match) return match.slice(1);
    return null;
  };

  const userFromStore = (uid) => uid === mockCurrentUser.user_id ? mockCurrentUser : otherUsers[uid];

  // Auth
  if (method === 'get' && baseUrl === '/auth/me') return { ...mockCurrentUser };
  if (method === 'post' && baseUrl === '/auth/login') return { token: 'mock-token-123', user: mockCurrentUser };
  if (method === 'post' && baseUrl === '/auth/register') return { token: 'mock-token-456', user: mockCurrentUser };
  if (method === 'post' && baseUrl === '/auth/forgot-password') return { message: 'Reset link sent to your email.' };

  // Categories
  if (method === 'get' && baseUrl === '/categories') return [...mockCategories];

  // Products
  if (method === 'get' && baseUrl === '/products') {
    let filtered = [...store.products];
    if (queryParams.search) {
      const s = queryParams.search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (queryParams.category) filtered = filtered.filter(p => p.category_id === queryParams.category);
    if (queryParams.condition) filtered = filtered.filter(p => p.condition === queryParams.condition);
    if (queryParams.minPrice) filtered = filtered.filter(p => p.price >= Number(queryParams.minPrice));
    if (queryParams.maxPrice) filtered = filtered.filter(p => p.price <= Number(queryParams.maxPrice));
    if (queryParams.location) filtered = filtered.filter(p => p.location.toLowerCase().includes(queryParams.location.toLowerCase()));
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 20;
    const result = paginate(filtered, page, limit);
    return { products: result.products, pagination: result.pagination };
  }

  if (method === 'get' && baseUrl.match(/^\/products\/(prod_\d+)$/)) {
    const pid = baseUrl.match(/^\/products\/(prod_\d+)$/)[1];
    const product = store.products.find(p => p.product_id === pid);
    if (product) return { ...product };
    return { status: 404, data: { message: 'Product not found' } };
  }

  if (method === 'post' && baseUrl === '/products') {
    const newProduct = { ...JSON.parse(body || '{}'), product_id: `prod_${store.nextProductId++}`, seller_name: mockCurrentUser.name, seller_id: mockCurrentUser.user_id, seller_rating: mockCurrentUser.rating_avg, seller_verified: mockCurrentUser.verified, image: null };
    if (!newProduct.condition) newProduct.condition = 'Good';
    if (!newProduct.location) newProduct.location = 'Campus';
    store.products.unshift(newProduct);
    return newProduct;
  }

  // Wishlist
  if (method === 'get' && baseUrl === '/wishlist') {
    return store.products.filter(p => store.wishlist.includes(p.product_id));
  }

  if (method === 'post' && baseUrl.match(/^\/products\/(prod_\d+)\/wishlist$/)) {
    const pid = baseUrl.match(/^\/products\/(prod_\d+)\/wishlist$/)[1];
    if (!store.wishlist.includes(pid)) store.wishlist.push(pid);
    return { message: 'Added to wishlist' };
  }

  if (method === 'delete' && baseUrl.match(/^\/products\/(prod_\d+)\/wishlist$/)) {
    const pid = baseUrl.match(/^\/products\/(prod_\d+)\/wishlist$/)[1];
    store.wishlist = store.wishlist.filter(id => id !== pid);
    return { message: 'Removed from wishlist' };
  }

  // Rides
  if (method === 'get' && baseUrl === '/rides') {
    let filtered = [...store.rides];
    if (queryParams.search) {
      const s = queryParams.search.toLowerCase();
      filtered = filtered.filter(r => r.origin.toLowerCase().includes(s) || r.destination.toLowerCase().includes(s));
    }
    if (queryParams.origin) filtered = filtered.filter(r => r.origin.toLowerCase().includes(queryParams.origin.toLowerCase()));
    if (queryParams.destination) filtered = filtered.filter(r => r.destination.toLowerCase().includes(queryParams.destination.toLowerCase()));
    if (queryParams.date) filtered = filtered.filter(r => r.date_time.startsWith(queryParams.date));
    if (queryParams.maxPrice) filtered = filtered.filter(r => r.fare_per_seat <= Number(queryParams.maxPrice));
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 20;
    const result = paginate(filtered, page, limit);
    return { rides: result.rides, pagination: result.pagination };
  }

  if (method === 'get' && baseUrl.match(/^\/rides\/(ride_\d+)$/)) {
    const rid = baseUrl.match(/^\/rides\/(ride_\d+)$/)[1];
    const ride = store.rides.find(r => r.ride_id === rid);
    if (ride) return { ...ride };
    return { status: 404, data: { message: 'Ride not found' } };
  }

  if (method === 'post' && baseUrl === '/rides') {
    const newRide = { ...JSON.parse(body || '{}'), ride_id: `ride_${store.nextRideId++}`, driver_name: mockCurrentUser.name, driver_id: mockCurrentUser.user_id, driver_rating: mockCurrentUser.rating_avg, status: 'active' };
    store.rides.unshift(newRide);
    return newRide;
  }

  if (method === 'post' && baseUrl.match(/^\/rides\/(ride_\d+)\/book$/)) {
    const rid = baseUrl.match(/^\/rides\/(ride_\d+)\/book$/)[1];
    const ride = store.rides.find(r => r.ride_id === rid);
    if (ride && ride.seats_available > 0) {
      ride.seats_available -= 1;
      return { message: 'Ride booked successfully!' };
    }
    return { status: 400, data: { message: 'No seats available' } };
  }

  // Messages
  if (method === 'get' && baseUrl === '/messages/conversations') {
    return store.conversations.map(c => ({
      ...c,
      last_message: (store.messages[c.user_id] && store.messages[c.user_id].length > 0)
        ? store.messages[c.user_id][store.messages[c.user_id].length - 1].content
        : c.last_message,
    }));
  }

  if (method === 'get' && baseUrl.match(/^\/messages\/(user_\d+)$/)) {
    const uid = baseUrl.match(/^\/messages\/(user_\d+)$/)[1];
    return store.messages[uid] || [];
  }

  if (method === 'post' && baseUrl === '/messages') {
    const { receiver_id, content } = JSON.parse(body || '{}');
    const msg = { message_id: `msg_${store.nextMessageId++}`, sender_id: mockCurrentUser.user_id, content, sent_at: new Date().toISOString() };
    if (!store.messages[receiver_id]) store.messages[receiver_id] = [];
    store.messages[receiver_id].push(msg);
    const idx = store.conversations.findIndex(c => c.user_id === receiver_id);
    if (idx === -1) {
      const u = otherUsers[receiver_id];
      if (u) store.conversations.unshift({ user_id: u.user_id, name: u.name, profile_pic: u.avatar, last_message: content });
    }
    return msg;
  }

  // Users
  if (method === 'get' && baseUrl.match(/^\/users\/(user_\d+)$/)) {
    const uid = baseUrl.match(/^\/users\/(user_\d+)$/)[1];
    const u = userFromStore(uid);
    if (u) return { ...u };
    return { status: 404, data: { message: 'User not found' } };
  }

  if (method === 'get' && baseUrl.match(/^\/users\/(user_\d+)\/listings$/)) {
    const uid = baseUrl.match(/^\/users\/(user_\d+)\/listings$/)[1];
    return store.products.filter(p => p.seller_id === uid);
  }

  if (method === 'get' && baseUrl === '/users/stats') {
    return { activeListings: store.products.filter(p => p.seller_id === mockCurrentUser.user_id).length, ridesOffered: store.rides.filter(r => r.driver_id === mockCurrentUser.user_id).length, unreadMessages: 3, rating: mockCurrentUser.rating_avg };
  }

  if (method === 'put' && baseUrl === '/users/profile') {
    const updates = JSON.parse(body || '{}');
    Object.assign(mockCurrentUser, updates);
    return { ...mockCurrentUser };
  }

  // Admin
  if (method === 'get' && baseUrl === '/admin/users/pending') {
    return Object.values(otherUsers).filter(u => !u.verified).map(u => ({ ...u }));
  }

  if (method === 'put' && baseUrl.match(/^\/admin\/users\/(user_\d+)\/verify$/)) {
    const uid = baseUrl.match(/^\/admin\/users\/(user_\d+)\/verify$/)[1];
    const u = otherUsers[uid];
    if (u) u.verified = true;
    return { message: 'User verified' };
  }

  return null;
}
