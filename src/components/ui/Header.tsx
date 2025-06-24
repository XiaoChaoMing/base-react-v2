import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./button";
import { useStore } from "@/store";

export function Header() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { user: storeUser, isAuthenticated: storeIsAuthenticated } = useStore();

  // Use either source of truth for authentication
  const isUserAuthenticated = isAuthenticated || storeIsAuthenticated;
  const user = currentUser || storeUser;

  return (
    <header className="fixed top-0 right-0 z-50 py-2">
      <div className="flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          {isUserAuthenticated ? (
            <>
              <span className="text-sm">
                Welcome, {user?.name || 'User'}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link to="/register">Đăng ký</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 