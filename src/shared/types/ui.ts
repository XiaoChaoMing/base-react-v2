import { ReactNode } from 'react';

// Component size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Component color variants
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Button variants
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

// Input types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

// Toast notification types
export interface ToastNotification {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Modal configuration
export interface ModalConfig {
  title?: string;
  size?: Size;
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  footer?: ReactNode;
}

// Drawer configuration
export interface DrawerConfig {
  title?: string;
  placement: 'top' | 'right' | 'bottom' | 'left';
  size?: Size | number;
  closable?: boolean;
  maskClosable?: boolean;
}

// Navigation item
export interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
  external?: boolean;
}

// Breadcrumb item
export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: ReactNode;
}

// Tab item
export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

// Menu item
export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}

// Layout configuration
export interface LayoutConfig {
  header?: {
    height: number;
    fixed?: boolean;
  };
  sidebar?: {
    width: number;
    collapsible?: boolean;
    collapsed?: boolean;
  };
  footer?: {
    height: number;
    fixed?: boolean;
  };
}