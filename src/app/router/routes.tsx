import { lazy } from 'react';
import { RouteConfig } from './types';
import { ProtectedRoute } from './ProtectedRoute';
import { NotFound } from './NotFound';

// Lazy load components for better performance
const HomePage = lazy(() => import('../../features/shop/pages/HomePage'));
const ProductsPage = lazy(() => import('../../features/shop/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../../features/shop/pages/ProductDetailPage'));
const CartPage = lazy(() => import('../../features/shop/pages/CartPage'));
const CheckoutPage = lazy(() => import('../../features/shop/pages/CheckoutPage'));
const Login = lazy(() => import('../../pages/auth/login'));
const Register = lazy(() => import('../../pages/auth/register'));

// Core shop routes
export const coreRoutes: RouteConfig[] = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/products',
    element: ProductsPage,
  },
  {
    path: '/products/:id',
    element: ProductDetailPage,
  },
  {
    path: '/cart',
    element: CartPage,
  },
  {
    path: '/checkout',
    element: () => (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
];

// Authentication routes
export const authRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/register',
    element: Register,
  },
];

// 404 route
export const notFoundRoute: RouteConfig = {
  path: '*',
  element: NotFound,
};