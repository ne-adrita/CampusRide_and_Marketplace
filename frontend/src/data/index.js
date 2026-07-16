const STORAGE_PREFIX = 'campusride_';

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

export function saveJSON(key, data) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

const now = new Date();
const t = (h) => new Date(now.getTime() + h * 3600000);
const p = (h) => new Date(now.getTime() - h * 3600000);

export const seedCurrentUser = {
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

export const seedUsers = {
  user_002: { user_id: 'user_002', name: 'Sarah Chen', email: 'sarah@university.edu', studentId: 'STU-2024-015', verified: true, role: 'student', avatar: null, phone: '+1-555-0102', bio: 'Business major, love reading and coffee.', rating_avg: 4.5, created_at: '2024-02-01T10:00:00Z', ride_count: 8 },
  user_003: { user_id: 'user_003', name: 'Rafiq Hasan', email: 'rafiq@university.edu', studentId: 'STU-2024-023', verified: false, role: 'student', avatar: null, phone: '+1-555-0103', bio: 'Engineering student. Part-time photographer.', rating_avg: 4.2, created_at: '2024-03-10T10:00:00Z', ride_count: 5 },
  user_004: { user_id: 'user_004', name: 'Priya Sharma', email: 'priya@university.edu', studentId: 'STU-2024-008', verified: true, role: 'student', avatar: null, phone: '+1-555-0104', bio: 'Art major. Love painting and music.', rating_avg: 4.9, created_at: '2024-01-20T10:00:00Z', ride_count: 15 },
  user_005: { user_id: 'user_005', name: 'Emily Watson', email: 'emily@university.edu', studentId: 'STU-2024-031', verified: true, role: 'student', avatar: null, phone: '+1-555-0105', bio: 'Literature major. Book club organizer.', rating_avg: 4.0, created_at: '2024-04-05T10:00:00Z', ride_count: 3 },
};

export const seedCategories = [
  { category_id: 'cat_1', name: 'Electronics' },
  { category_id: 'cat_2', name: 'Books' },
  { category_id: 'cat_3', name: 'Furniture' },
  { category_id: 'cat_4', name: 'Clothing' },
  { category_id: 'cat_5', name: 'Sports & Outdoors' },
  { category_id: 'cat_6', name: 'Other' },
];

export const seedProducts = [
  { product_id: 'prod_1', title: 'MacBook Air M1 (2020)', price: 720, condition: 'Like New', seller_id: 'user_001', seller_name: 'Alex Student', seller_rating: 4.8, seller_verified: true, description: 'Used for one semester. Mint condition, original box included.', location: 'NSU Campus', category_id: 'cat_1', image: null, created_at: p(2).toISOString() },
  { product_id: 'prod_2', title: 'Calculus Textbook — Stewart 8th Ed.', price: 25, condition: 'Good', seller_id: 'user_002', seller_name: 'Sarah Chen', seller_rating: 4.5, seller_verified: true, description: 'Some highlights, overall good condition.', location: 'Dhanmondi', category_id: 'cat_2', image: null, created_at: p(5).toISOString() },
  { product_id: 'prod_3', title: 'IKEA Study Desk', price: 65, condition: 'Good', seller_id: 'user_003', seller_name: 'Rafiq Hasan', seller_rating: 4.2, seller_verified: false, description: 'Adjustable height, sturdy build.', location: 'Bashundhara', category_id: 'cat_3', image: null, created_at: p(24).toISOString() },
  { product_id: 'prod_4', title: 'Sony WH-1000XM4 Headphones', price: 190, condition: 'Like New', seller_id: 'user_004', seller_name: 'Priya Sharma', seller_rating: 4.9, seller_verified: true, description: 'Used twice. Amazing noise cancellation.', location: 'Gulshan', category_id: 'cat_1', image: null, created_at: p(72).toISOString() },
  { product_id: 'prod_5', title: 'Yoga Mat Premium 6mm', price: 35, condition: 'Good', seller_id: 'user_001', seller_name: 'Alex Student', seller_rating: 4.8, seller_verified: true, description: 'Non-slip, used for 3 months.', location: 'Dhanmondi', category_id: 'cat_5', image: null, created_at: p(48).toISOString() },
  { product_id: 'prod_6', title: 'Principles of Microeconomics', price: 30, condition: 'Fair', seller_id: 'user_005', seller_name: 'Emily Watson', seller_rating: 4.0, seller_verified: true, description: 'Worn cover, all pages intact.', location: 'Mohammadpur', category_id: 'cat_2', image: null, created_at: p(96).toISOString() },
  { product_id: 'prod_7', title: 'Graphic T-Shirt Bundle (5 pcs)', price: 60, condition: 'Good', seller_id: 'user_003', seller_name: 'Rafiq Hasan', seller_rating: 4.2, seller_verified: false, description: 'Size M, premium cotton.', location: 'Uttara', category_id: 'cat_4', image: null, created_at: p(36).toISOString() },
  { product_id: 'prod_8', title: 'iPad Air + Pencil 2nd Gen', price: 550, condition: 'Like New', seller_id: 'user_002', seller_name: 'Sarah Chen', seller_rating: 4.5, seller_verified: true, description: 'M1 chip, great for note-taking.', location: 'Gulshan', category_id: 'cat_1', image: null, created_at: p(12).toISOString() },
  { product_id: 'prod_9', title: 'Ergonomic Office Chair', price: 120, condition: 'Good', seller_id: 'user_005', seller_name: 'Emily Watson', seller_rating: 4.0, seller_verified: true, description: 'Adjustable lumbar support.', location: 'Mohammadpur', category_id: 'cat_3', image: null, created_at: p(60).toISOString() },
  { product_id: 'prod_10', title: 'North Face Winter Jacket', price: 150, condition: 'New', seller_id: 'user_004', seller_name: 'Priya Sharma', seller_rating: 4.9, seller_verified: true, description: 'Never worn, wrong size (L, need M).', location: 'Banani', category_id: 'cat_4', image: null, created_at: p(8).toISOString() },
  { product_id: 'prod_11', title: 'Arduino Starter Kit', price: 65, condition: 'Good', seller_id: 'user_001', seller_name: 'Alex Student', seller_rating: 4.8, seller_verified: true, description: 'Complete with sensors and guide.', location: 'Dhanmondi', category_id: 'cat_1', image: null, created_at: p(16).toISOString() },
  { product_id: 'prod_12', title: 'Spalding Basketball', price: 40, condition: 'Fair', seller_id: 'user_002', seller_name: 'Sarah Chen', seller_rating: 4.5, seller_verified: true, description: 'Indoor/outdoor, some wear.', location: 'Gulshan', category_id: 'cat_5', image: null, created_at: p(84).toISOString() },
];

export const seedRides = [
  { ride_id: 'ride_1', driver_id: 'user_001', driver_name: 'Alex Student', driver_rating: 4.8, origin: 'Dhanmondi 27', destination: 'NSU Campus', date_time: t(4).toISOString(), seats_total: 4, seats_available: 3, fare_per_seat: 3, vehicle_details: 'Toyota Axio, Blue', status: 'active', notes: '' },
  { ride_id: 'ride_2', driver_id: 'user_002', driver_name: 'Sarah Chen', driver_rating: 4.5, origin: 'Gulshan 1', destination: 'NSU Campus', date_time: t(6).toISOString(), seats_total: 3, seats_available: 2, fare_per_seat: 4, vehicle_details: 'Honda Civic, White', status: 'active', notes: '' },
  { ride_id: 'ride_3', driver_id: 'user_003', driver_name: 'Rafiq Hasan', driver_rating: 4.2, origin: 'Uttara Sector 10', destination: 'NSU Campus', date_time: t(28).toISOString(), seats_total: 4, seats_available: 4, fare_per_seat: 5, vehicle_details: 'Toyota Corolla, Silver', status: 'active', notes: '' },
  { ride_id: 'ride_4', driver_id: 'user_004', driver_name: 'Priya Sharma', driver_rating: 4.9, origin: 'Banani 11', destination: 'NSU Campus', date_time: t(5).toISOString(), seats_total: 3, seats_available: 1, fare_per_seat: 2, vehicle_details: 'Suzuki Swift, Red', status: 'active', notes: '' },
  { ride_id: 'ride_5', driver_id: 'user_005', driver_name: 'Emily Watson', driver_rating: 4.0, origin: 'Mohammadpur', destination: 'Gulshan 2', date_time: t(26).toISOString(), seats_total: 4, seats_available: 4, fare_per_seat: 4, vehicle_details: 'Nissan Sunny, Gray', status: 'active', notes: '' },
  { ride_id: 'ride_6', driver_id: 'user_001', driver_name: 'Alex Student', driver_rating: 4.8, origin: 'NSU Campus', destination: 'Dhanmondi 27', date_time: t(8).toISOString(), seats_total: 4, seats_available: 2, fare_per_seat: 3, vehicle_details: 'Toyota Axio, Blue', status: 'active', notes: '' },
  { ride_id: 'ride_7', driver_id: 'user_002', driver_name: 'Sarah Chen', driver_rating: 4.5, origin: 'NSU Campus', destination: 'Gulshan 1', date_time: t(10).toISOString(), seats_total: 3, seats_available: 0, fare_per_seat: 4, vehicle_details: 'Honda Civic, White', status: 'completed', notes: '' },
];

export const seedConversations = [
  { user_id: 'user_002', name: 'Sarah Chen', profile_pic: null, last_message: 'Is the iPad still available?' },
  { user_id: 'user_004', name: 'Priya Sharma', profile_pic: null, last_message: 'Sure, see you at 3pm!' },
];

export const seedMessages = {
  user_002: [
    { message_id: 'msg_1', sender_id: 'user_002', content: 'Hi! Is the iPad still available?', sent_at: p(3).toISOString() },
    { message_id: 'msg_2', sender_id: 'user_001', content: 'Yes, still available!', sent_at: p(2.5).toISOString() },
    { message_id: 'msg_3', sender_id: 'user_002', content: 'Can I see it tomorrow?', sent_at: p(2).toISOString() },
  ],
  user_004: [
    { message_id: 'msg_4', sender_id: 'user_001', content: 'Hey, interested in the headphones', sent_at: p(48).toISOString() },
    { message_id: 'msg_5', sender_id: 'user_004', content: 'Sure, see you at 3pm!', sent_at: p(47).toISOString() },
  ],
};

export const seedWishlist = ['prod_4', 'prod_8'];

const ALL_KEYS = ['currentUser', 'users', 'categories', 'products', 'rides', 'conversations', 'messages', 'wishlist', 'token', 'counter'];

function generateId(prefix) {
  const c = loadJSON('counter', { product: 13, ride: 8, message: 6 });
  let key, id;
  if (prefix === 'prod_') { c.product += 1; key = 'product'; }
  else if (prefix === 'ride_') { c.ride += 1; key = 'ride'; }
  else if (prefix === 'msg_') { c.message += 1; key = 'message'; }
  id = prefix + c[key];
  saveJSON('counter', c);
  return id;
}

export { generateId };

export function initData() {
  if (!localStorage.getItem(STORAGE_PREFIX + 'products')) {
    saveJSON('currentUser', seedCurrentUser);
    saveJSON('users', seedUsers);
    saveJSON('categories', seedCategories);
    saveJSON('products', seedProducts);
    saveJSON('rides', seedRides);
    saveJSON('conversations', seedConversations);
    saveJSON('messages', seedMessages);
    saveJSON('wishlist', seedWishlist);
    saveJSON('counter', { product: 12, ride: 7, message: 5 });
  }
}

export function resetAllData() {
  ALL_KEYS.forEach(k => localStorage.removeItem(STORAGE_PREFIX + k));
  initData();
}
