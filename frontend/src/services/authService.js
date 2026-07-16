import { loadJSON, saveJSON, saveToken, seedCurrentUser, IS_PREVIEW } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function login(email, password) {
  if (IS_PREVIEW) {
    await delay();
    if (!email || !password) return { success: false, error: 'Email and password are required' };
    const user = { ...seedCurrentUser, email };
    const token = 'preview-token-' + Date.now();
    saveToken(token);
    saveJSON('currentUser', user);
    return { success: true, data: { token, user } };
  }
  try {
    const { default: api } = await import('../api/axios');
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    saveToken(token);
    saveJSON('currentUser', user);
    return { success: true, data: { token, user } };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
}

export async function register(name, email, studentId, password) {
  if (IS_PREVIEW) {
    await delay();
    if (!name || !email || !studentId || !password) return { success: false, error: 'All fields are required' };
    const user = { ...seedCurrentUser, name, email, studentId, user_id: 'user_' + Date.now() };
    const token = 'preview-token-' + Date.now();
    saveToken(token);
    saveJSON('currentUser', user);
    return { success: true, data: { token, user } };
  }
  try {
    const { default: api } = await import('../api/axios');
    const response = await api.post('/auth/register', { name, email, studentId, password });
    const { token, user } = response.data;
    saveToken(token);
    saveJSON('currentUser', user);
    return { success: true, data: { token, user } };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Registration failed' };
  }
}

export async function getMe() {
  if (IS_PREVIEW) {
    await delay();
    const user = loadJSON('currentUser', seedCurrentUser);
    return { data: user };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/auth/me');
  return { data: response.data };
}
