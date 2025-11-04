import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Suspense, createElement } from 'react';
import { RootLayout } from '../layouts';
import { coreRoutes, authRoutes, notFoundRoute } from './routes';
import { RouteConfig, FeatureRoutes } from './types';
import LoadingBar from '../../components/base/loading/LoadingBar';

// Convert RouteConfig to React Router RouteObject
const convertRouteConfig = (config: RouteConfig): RouteObject => {
  const Element = config.element;
  
  return {
    path: config.path,
    element: createElement(Suspense, { fallback: createElement(LoadingBar) }, createElement(Element)),
    children: config.children?.map(convertRouteConfig),
  };
};

// Combine all routes
const combineRoutes = (featureRoutes: FeatureRoutes = {}): RouteConfig[] => {
  const allRoutes: RouteConfig[] = [
    ...coreRoutes,
    ...authRoutes,
  ];

  // Add feature routes
  Object.values(featureRoutes).forEach(routes => {
    allRoutes.push(...routes);
  });

  // Add 404 route at the end
  allRoutes.push(notFoundRoute);

  return allRoutes;
};

// Create router with feature route support
export const createAppRouter = (featureRoutes?: FeatureRoutes) => {
  const routes = combineRoutes(featureRoutes);
  
  return createBrowserRouter([
    {
      path: '/',
      element: createElement(RootLayout),
      children: routes.map(convertRouteConfig),
    },
  ]);
};

// Default router for immediate use
export const router = createAppRouter();