import { ReactNode, createContext, useEffect } from "react";
import { useStore } from "@/store";
import { authService } from "@/services/auth/auth";
import { User } from "@/store/types";

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  checkAuth: async () => null
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, isAuthenticated, user } = useStore();

  // Function to check authentication status
  const checkAuth = async (): Promise<User | null> => {
    try {
      // If we already have a user in the store, use that
      if (user) {
        return user;
      }
      
      // Otherwise, try to get from the service
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        return currentUser;
      }
      
      setUser(null);
      return null;
    } catch (error) {
      console.error("Authentication check failed:", error);
      setUser(null);
      return null;
    }
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}; 