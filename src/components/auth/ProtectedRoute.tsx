import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingBar from "@/components/base/loading/LoadingBar";
import { useStore } from "@/store";
import React from "react";

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  redirectPath = "/login",
  children
}: ProtectedRouteProps) => {
  const { currentUser, isLoadingUser, isAuthenticated } = useAuth();
  const { isAuthenticated: storeIsAuthenticated } = useStore();

  // Show loading while checking authentication
  if (isLoadingUser) {
    return <LoadingBar />;
  }

  // Redirect to login if not authenticated
  // Check both the auth hook and the store to be safe
  if (!isAuthenticated && !storeIsAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render children if provided, otherwise render Outlet
  return children ? <>{children}</> : <Outlet />;
}; 