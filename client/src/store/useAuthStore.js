import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      set({ 
        user: response.data, 
        token: response.data.token, 
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        isLoading: false 
      });
      return false;
    }
  },

  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', userData);
      localStorage.setItem('token', response.data.token);
      set({ 
        user: response.data, 
        token: response.data.token, 
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  getMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ 
        user: null, 
        token: null, 
        error: null, // Don't show error for silent token expiration
        isLoading: false 
      });
    }
  },
}));

export default useAuthStore;
