import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children?: ReactNode;
}

/**
 * AuthLayout provides a layout specifically for authentication pages.
 * It includes navigation links for login/register and centers the content.
 */
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with auth links */}
      <div className="fixed top-5 right-3 bg-background text-foreground z-50">
        <div className="flex flex-row gap-2">
          <Link to="/login" className="hover:underline">
            đăng nhập
          </Link>
          <Link to="/register" className="hover:underline">
            đăng ký
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};