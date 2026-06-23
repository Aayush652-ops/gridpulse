// GridPulse Mobile Commander — Auth Service
import { api } from './api';

export const authService = {
  async login(username, password) {
    const result = await api.post('/api/auth/login', { username, password });
    if (result.token) {
      api.setToken(result.token);
    }
    return result;
  },

  async register(username, password) {
    return await api.post('/api/auth/register', { username, password });
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } catch (e) {
      // Ignore logout errors
    }
    api.clearToken();
  },

  async validateSession(token) {
    api.setToken(token);
    try {
      const user = await api.get('/api/auth/me');
      return user;
    } catch (e) {
      api.clearToken();
      return null;
    }
  },
};
