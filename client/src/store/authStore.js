import { create } from "zustand";
import { api, tokenStorage, setAlVencerSesion } from "../services/api";

// Estado global de la sesión: usuario autenticado y acciones de login/registro/logout.
export const useAuthStore = create((set) => ({
  user: null,
  cargando: true, // true mientras se verifica la sesión guardada al abrir la app

  login: async (credenciales) => {
    const { token, user } = await api("/auth/login", { method: "POST", body: credenciales });
    tokenStorage.set(token);
    set({ user });
  },

  register: async (datos) => {
    const { token, user } = await api("/auth/register", { method: "POST", body: datos });
    tokenStorage.set(token);
    set({ user });
  },

  logout: () => {
    tokenStorage.clear();
    set({ user: null });
  },

  // Se llama una vez al iniciar: si hay token guardado, pide el usuario al backend.
  loadSession: async () => {
    if (!tokenStorage.get()) {
      set({ cargando: false });
      return;
    }
    try {
      const { user } = await api("/auth/me");
      set({ user, cargando: false });
    } catch {
      tokenStorage.clear();
      set({ user: null, cargando: false });
    }
  },
}));

setAlVencerSesion(() => useAuthStore.getState().logout());
