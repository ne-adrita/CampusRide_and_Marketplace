import { loadJSON, saveJSON, seedCurrentUser } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function login(email, password) {
  await delay();
  if (!email || !password) return { success: false, error: 'Email and password are required' };
  const user = { ...seedCurrentUser, email };
  saveJSON('token', 'preview-token-' + Date.now());
  saveJSON('currentUser', user);
  return { success: true, data: { token: 'preview-token', user } };
}

export async function register(name, email, studentId, password) {
  await delay();
  if (!name || !email || !studentId || !password) return { success: false, error: 'All fields are required' };
  const user = { ...seedCurrentUser, name, email, studentId, user_id: 'user_' + Date.now() };
  saveJSON('token', 'preview-token-' + Date.now());
  saveJSON('currentUser', user);
  return { success: true, data: { token: 'preview-token', user } };
}

export async function getMe() {
  await delay();
  const user = loadJSON('currentUser', seedCurrentUser);
  return { data: user };
}
