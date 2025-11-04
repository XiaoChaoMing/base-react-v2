// Base entity interface that all data models should extend
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Soft delete support
export interface SoftDeletable {
  deletedAt?: Date;
  isDeleted?: boolean;
}

// Audit trail support
export interface Auditable {
  createdBy?: string;
  updatedBy?: string;
  version?: number;
}

// Complete base model with all common fields
export interface BaseModel extends BaseEntity, SoftDeletable, Auditable {}

// Generic list response
export interface ListResponse<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

// File upload types
export interface FileUpload {
  file: File;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Generic filter and sort types
export interface FilterOption<T = string> {
  field: keyof T;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith';
  value: unknown;
}

export interface SortOption<T = string> {
  field: keyof T;
  direction: 'asc' | 'desc';
}

export interface QueryOptions<T = string> {
  filters?: FilterOption<T>[];
  sort?: SortOption<T>[];
  pagination?: {
    page: number;
    limit: number;
  };
}