import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Store
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/products">Products</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/cart">Cart (0)</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="container py-8">
          <p className="text-muted-foreground text-center text-sm">
            © 2024 Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
