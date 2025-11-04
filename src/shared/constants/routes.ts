export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CHAT: "/chat",
  CHAT_WITH_ID: "/chat/:chatId",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },
  CHAT: {
    HISTORY: "/chat/history",
    MESSAGES: "/chat/messages",
    CREATE: "/chat/create",
    DELETE: "/chat/delete",
  },
  PRODUCTS: {
    LIST: "/products",
    DETAIL: "/products/:id",
    CATEGORIES: "/products/categories",
    BY_CATEGORY: "/products/category/:category",
  },
} as const;