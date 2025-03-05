import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { StoreState, User } from "./types";

const initialState = {
  // Auth state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // App state
  theme: "light" as const,
  sidebarOpen: true,
  notifications: 0,

  // Loading state
  show: false
};

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Auth actions
        setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
        setLoading: (isLoading: boolean) => set({ isLoading }),
        setError: (error: string | null) => set({ error }),
        logout: () => set({ user: null, isAuthenticated: false }),

        // App actions
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light"
          })),
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setNotifications: (count: number) => set({ notifications: count }),
        incrementNotifications: () =>
          set((state) => ({ notifications: state.notifications + 1 })),
        clearNotifications: () => set({ notifications: 0 }),

        // Loading actions
        showLoading: () => set({ show: true }),
        hideLoading: () => set({ show: false }),

        // Reset store
        reset: () => set(initialState)
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          theme: state.theme
        })
      }
    )
  )
);
