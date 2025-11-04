export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
  requestId?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
  timestamp?: string;
  path?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, unknown>;
}

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request configuration
export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

// API endpoint configuration
export interface ApiEndpoint {
  url: string;
  method: HttpMethod;
  requiresAuth?: boolean;
  timeout?: number;
  retries?: number;
}

// Batch request support
export interface BatchRequest {
  id: string;
  endpoint: string;
  method: HttpMethod;
  data?: unknown;
}

export interface BatchResponse<T> {
  id: string;
  success: boolean;
  data?: T;
  error?: ApiError;
}