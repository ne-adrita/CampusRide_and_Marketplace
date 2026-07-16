import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath) {
  return readFileSync(join(__dirname, '..', relativePath), 'utf-8');
}

describe('Token key consistency across source files', () => {
  it('api/axios.js uses campusride_token (not bare token)', () => {
    const src = readSource('api/axios.js');
    expect(src).toContain("'campusride_token'");
    expect(src).not.toContain("localStorage.getItem('token')");
    expect(src).not.toContain("localStorage.removeItem('token')");
  });

  it('AuthContext uses campusride_token (not bare token)', () => {
    const src = readSource('context/AuthContext.jsx');
    expect(src).toContain("'campusride_token'");
    expect(src).not.toContain("localStorage.getItem('token')");
    expect(src).not.toContain("localStorage.removeItem('token')");
  });

  it('authService uses saveJSON (not raw localStorage for token)', () => {
    const src = readSource('services/authService.js');
    expect(src).toContain("saveJSON('token'");
    expect(src).not.toContain('localStorage.getItem');
    expect(src).not.toContain('localStorage.setItem');
    expect(src).not.toContain('localStorage.removeItem');
  });

  it('no source file uses bare token key', () => {
    const files = [
      'api/axios.js',
      'context/AuthContext.jsx',
      'services/authService.js',
      'services/productService.js',
      'services/rideService.js',
      'services/wishlistService.js',
      'services/messageService.js',
      'services/userService.js',
      'data/index.js',
    ];
    for (const file of files) {
      const src = readSource(file);
      expect(src).not.toContain("getItem('token')");
      expect(src).not.toContain("setItem('token'");
      expect(src).not.toContain("removeItem('token')");
    }
  });
});
