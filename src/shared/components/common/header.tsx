import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

export interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name?: string;
  } | null;
  onLogout?: () => void;
}

export function Header({ isAuthenticated = false, user, onLogout }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 z-50 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">
                Welcome, {user?.name || 'User'}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
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