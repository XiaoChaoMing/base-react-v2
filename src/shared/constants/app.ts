export const APP_CONFIG = {
  NAME: "React Feature App",
  VERSION: "1.0.0",
  DESCRIPTION: "Feature-based React application",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_PREFERENCES: "user_preferences",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const TIMEOUTS = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  RETRY_DELAY: 1000,
  MAX_RETRIES: 3,
} as const;