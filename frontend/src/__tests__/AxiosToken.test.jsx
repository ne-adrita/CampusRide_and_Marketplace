import { describe, it, expect, vi, beforeEach } from 'vitest';

const TOKEN_KEY = 'campusride_token';

const storage = {};
let mockAxiosInstance;
let requestInterceptors = [];
let responseInterceptors = [];

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

vi.mock('axios', () => {
  mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn((h) => { requestInterceptors.push(h); }) },
      response: { use: vi.fn((_, h) => { responseInterceptors.push(h); }) },
    },
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
    create: vi.fn(() => mockAxiosInstance),
  };
});

describe('Behavioral token tests', () => {
  beforeEach(() => {
    Object.keys(storage).forEach(k => delete storage[k]);
    requestInterceptors = [];
    responseInterceptors = [];
    vi.resetModules();
  });

  it('login saves a raw campusride_token without JSON wrapping', async () => {
    const { login } = await import('../services/authService');
    const result = await login('test@uni.edu', 'password123');
    expect(result.success).toBe(true);
    const raw = globalThis.localStorage.getItem(TOKEN_KEY);
    expect(raw).toContain('preview-token-');
    expect(raw).not.toMatch(/^".*"$/);
  });

  it('Axios request interceptor reads campusride_token and attaches Bearer header', async () => {
    storage[TOKEN_KEY] = 'test-jwt-token-abc';
    await import('../api/axios');
    expect(requestInterceptors.length).toBeGreaterThan(0);
    const config = { headers: {} };
    const result = await requestInterceptors[0](config);
    expect(result.headers.Authorization).toBe('Bearer test-jwt-token-abc');
  });

  it('logout removes campusride_token key', async () => {
    storage[TOKEN_KEY] = 'some-token';
    const { AuthProvider, useAuth } = await import('../context/AuthContext');
    const { render, screen, waitFor } = await import('@testing-library/react');
    const React = await import('react');
    let authValue;
    function TestComponent() {
      const auth = useAuth();
      authValue = auth;
      return React.createElement('button', { onClick: auth.logout, 'data-testid': 'logout-btn' }, 'Logout');
    }
    render(React.createElement(AuthProvider, null, React.createElement(TestComponent)));
    await waitFor(() => expect(screen.getByTestId('logout-btn')).toBeDefined());
    authValue.logout();
    expect(globalThis.localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('401 response removes campusride_token', async () => {
    storage[TOKEN_KEY] = 'expired-token';
    await import('../api/axios');
    expect(responseInterceptors.length).toBeGreaterThan(0);
    const error = { response: { status: 401, data: { message: 'Unauthorized' } } };
    await expect(responseInterceptors[0](error)).rejects.toEqual(error);
    expect(globalThis.localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('preview services use localStorage', async () => {
    storage.campusride_products = JSON.stringify([{ product_id: 'p1', title: 'Test', price: 10 }]);
    const { getProducts } = await import('../services/productService');
    const result = await getProducts();
    expect(result.data.products).toHaveLength(1);
    expect(result.data.products[0].title).toBe('Test');
  });

  it('non-preview services call Axios', async () => {
    process.env.VITE_PREVIEW_MODE = 'false';
    process.env.VITE_API_URL = 'http://test:5000/api';
    const { getProducts } = await import('../services/productService');
    mockAxiosInstance.get.mockResolvedValue({ data: { products: [], pagination: {} } });
    const result = await getProducts();
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products', { params: {} });
    expect(result.data).toEqual({ products: [], pagination: {} });
  });
});
