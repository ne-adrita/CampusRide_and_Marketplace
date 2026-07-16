import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

const TOKEN_KEY = 'campusride_token';

const storage = {};
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key) => storage[key] ?? null),
  setItem: vi.fn((key, value) => { storage[key] = value; }),
  removeItem: vi.fn((key) => { delete storage[key]; }),
  clear: vi.fn(() => { Object.keys(storage).forEach(k => delete storage[k]); }),
  get length() { return Object.keys(storage).length; },
  key: vi.fn((i) => Object.keys(storage)[i] ?? null),
});

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
  error: vi.fn(),
  success: vi.fn(),
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

describe('Auth token runtime tests', () => {
  beforeEach(() => {
    Object.keys(storage).forEach(k => delete storage[k]);
  });

  it('login stores campusride_token', async () => {
    const { login } = await import('../services/authService');
    const result = await login('test@uni.edu', 'password123');
    expect(result.success).toBe(true);
    expect(globalThis.localStorage.getItem(TOKEN_KEY)).toContain('preview-token');
  });

  it('register stores campusride_token', async () => {
    const { register } = await import('../services/authService');
    const result = await register('Test', 't@u.edu', 'S1', 'pw');
    expect(result.success).toBe(true);
    expect(globalThis.localStorage.getItem(TOKEN_KEY)).toContain('preview-token');
  });

  it('saveJSON("token") stores under campusride_token', async () => {
    const { saveJSON } = await import('../data');
    saveJSON('token', 'my-token');
    expect(globalThis.localStorage.getItem(TOKEN_KEY)).toBe('"my-token"');
  });

  it('AuthContext logout removes campusride_token', async () => {
    globalThis.localStorage.setItem(TOKEN_KEY, 'preview-token-999');
    const { AuthProvider, useAuth } = await import('../context/AuthContext');
    let authValue;
    function TestComponent() {
      const auth = useAuth();
      authValue = auth;
      return <button onClick={auth.logout} data-testid="logout-btn">Logout</button>;
    }
    render(<AuthProvider><TestComponent /></AuthProvider>);
    await waitFor(() => expect(screen.getByTestId('logout-btn')).toBeDefined());
    authValue.logout();
    expect(globalThis.localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('only campusride_token key exists — no bare token key', () => {
    globalThis.localStorage.setItem(TOKEN_KEY, 'x');
    const allKeys = Object.keys(storage);
    const tokenKeys = allKeys.filter(k => k.includes('token'));
    expect(tokenKeys).toEqual([TOKEN_KEY]);
  });
});
