import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

interface RootLayoutProps {
  children?: ReactNode;
}

/**
 * RootLayout is the main layout component that wraps the entire application.
 * It provides the basic structure and can include global UI elements like headers, footers, etc.
 */
export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-background relative">
      <main className="flex-1 overflow-hidden">
        {children || <Outlet />}
      </main>
    </div>
  );
};