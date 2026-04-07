import { create } from "zustand";
import { loginRequest, meRequest, registerRequest } from "../api/auth.api";

const TOKEN_KEY = "simpletasks_token";

const normalizeError = (error) =>
  error?.response?.data?.message || "Request failed. Please try again.";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  loading: false,
  initialized: false,
  error: null,

  clearError: () => set({ error: null }),

  initAuth: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      set({ initialized: true, token: null, user: null });
      return;
    }

    set({ loading: true, error: null });

    try {
      const user = await meRequest();
      set({ user, token, initialized: true, loading: false });
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      set({ user: null, token: null, initialized: true, loading: false, error: normalizeError(error) });
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });

    try {
      const response = await registerRequest(payload);
      localStorage.setItem(TOKEN_KEY, response.token);
      set({ user: response.user, token: response.token, loading: false, initialized: true });
      return true;
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
      return false;
    }
  },

  login: async (payload) => {
    set({ loading: true, error: null });

    try {
      const response = await loginRequest(payload);
      localStorage.setItem(TOKEN_KEY, response.token);
      set({ user: response.user, token: response.token, loading: false, initialized: true });
      return true;
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null, error: null, initialized: true });
  },
}));

export default useAuthStore;
