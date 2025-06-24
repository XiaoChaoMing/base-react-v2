import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { User } from "@/store/types";

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { 
    setUser, 
    setLoading, 
    setError, 
    user: storeUser, 
    isAuthenticated: storeIsAuthenticated,
    logout: storeLogout
  } = useStore();

  // Query to get current user, but only if we don't already have one in the store
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    // Skip query if we already have a user in the store
    enabled: !storeUser && !storeIsAuthenticated
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: LoginParams) =>
      authService.login(username, password),
    onSuccess: (user) => {
      setUser(user);
      navigate("/");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterParams) =>
      authService.register(userData),
    onSuccess: (user) => {
      setUser(user);
      navigate("/");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      storeLogout();
      navigate("/login");
    }
  });

  // Use store's authentication state if available, otherwise check from query
  const isAuthenticated = storeIsAuthenticated || !!currentUser || !!storeUser;
  
  // Use store's user if available, otherwise use query result
  const user = storeUser || currentUser;

  return {
    currentUser: user,
    isLoadingUser,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending
  };
};
