import { ComponentType, LazyExoticComponent } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType | LazyExoticComponent<ComponentType>;
  protected?: boolean;
  children?: RouteConfig[];
}

export interface FeatureRoutes {
  [featureName: string]: RouteConfig[];
}