import type { User } from "@/store/types";
import { BaseService } from "../base/base";

interface LoginResponse {
  access_token: string;
  user: User;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

class AuthService extends BaseService {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  async login(username: string, password: string): Promise<User> {
    try {
      const response = await this.post<LoginResponse>("/login", {
        username,
        password
      } as LoginRequest);

      // Store token
      localStorage.setItem("token", response.access_token);
      
      // Store user in Zustand store
      const user = response.user || {
        id: "1",
        name: username,
        email: username,
        role: "user"
      };
      
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid username or password");
    }
  }

  async register(userData: RegisterRequest): Promise<User> {
    try {
      const response = await this.post<any>("/register", {
        username: userData.username,
        email: userData.email,
        password: userData.password
      });
      
      // After successful registration, login the user
      return this.login(userData.username, userData.password);
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed. Please try again.");
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token");
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // First check if we have a token
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      
      // Try to get user profile from API
      // Note: You might need to adjust this endpoint based on your API
      const user = await this.get<User>("/me");
      return user;
    } catch {
      // If API call fails, check the Zustand store
      const appStorage = localStorage.getItem("app-storage");
      if (appStorage) {
        try {
          const parsedStorage = JSON.parse(appStorage);
          if (parsedStorage.state && parsedStorage.state.user) {
            return parsedStorage.state.user;
          }
        } catch (e) {
          console.error("Error parsing app-storage:", e);
        }
      }
      
      // If token exists but API call failed and no user in store,
      // we'll create a basic user object
      const token = localStorage.getItem("token");
      if (token) {
        return {
          id: "unknown",
          name: "User",
          email: "unknown@example.com",
          role: "user"
        };
      }
      
      return null;
    }
  }

  // Check if user is authenticated by verifying token or Zustand store
  isAuthenticated(): boolean {
    // Check token first
    if (localStorage.getItem("token")) {
      return true;
    }
    
    // Then check Zustand store
    const appStorage = localStorage.getItem("app-storage");
    if (appStorage) {
      try {
        const parsedStorage = JSON.parse(appStorage);
        return !!parsedStorage.state?.isAuthenticated;
      } catch (e) {
        console.error("Error parsing app-storage:", e);
      }
    }
    
    return false;
  }
}

export const authService = new AuthService();
