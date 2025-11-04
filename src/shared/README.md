# Shared Layer

The shared layer contains reusable code that can be used across different features and the app layer.

## Structure

```
shared/
├── components/     # Reusable UI components
├── constants/      # Application constants
├── hooks/          # Reusable React hooks
├── services/       # Shared services (API client, etc.)
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Constants

### API Constants (`constants/api.ts`)
- `API_CONFIG`: Base API configuration including URL, timeout, and headers
- `HTTP_STATUS`: HTTP status code constants

### App Constants (`constants/app.ts`)
- `APP_CONFIG`: Application metadata (name, version, description)
- `STORAGE_KEYS`: Local storage key constants
- `VALIDATION`: Validation rules and regex patterns
- `PAGINATION`: Default pagination settings
- `TIMEOUTS`: Timeout and delay constants

### Route Constants (`constants/routes.ts`)
- `ROUTES`: Application route paths
- `API_ENDPOINTS`: API endpoint paths organized by feature

## Types

### API Types (`types/api.ts`)
- `ApiResponse<T>`: Standard API response wrapper
- `ApiError`: Error response structure
- `PaginatedResponse<T>`: Paginated data response
- `RequestConfig`: HTTP request configuration
- `BatchRequest/BatchResponse`: Batch operation support

### Auth Types (`types/auth.ts`)
- `LoginCredentials`: Login form data
- `RegisterCredentials`: Registration form data
- `AuthResponse`: Authentication response
- `AuthState`: Authentication state management

### Chat Types (`types/chat.ts`)
- `Message`: Chat message structure
- `ChatHistory`: Chat session history
- `ChatSession`: Active chat session
- `ChatRequest/ChatResponse`: Chat API interfaces

### Common Types (`types/common.ts`)
- `Status`: Loading states ('idle' | 'loading' | 'success' | 'error')
- `LoadingState`: Basic loading state with error
- `AsyncState<T>`: Async operation state with data
- `Theme`: Theme options
- `SelectOption<T>`: Generic select option
- `TableColumn<T>`: Table column definition
- `ModalProps`: Modal component props

### Data Types (`types/data.ts`)
- `BaseEntity`: Base entity with id and timestamps
- `SoftDeletable`: Soft delete support
- `Auditable`: Audit trail support
- `BaseModel`: Complete base model with all common fields
- `ListResponse<T>`: Generic list response
- `FileUpload/UploadedFile`: File upload interfaces
- `ValidationError`: Form validation error
- `FormState<T>`: Form state management
- `FilterOption/SortOption`: Query filtering and sorting
- `QueryOptions<T>`: Complete query configuration

### UI Types (`types/ui.ts`)
- `Size`: Component size variants
- `ColorVariant`: Color scheme variants
- `ButtonVariant`: Button style variants
- `ToastNotification`: Toast notification structure
- `ModalConfig/DrawerConfig`: Modal and drawer configuration
- `NavigationItem`: Navigation menu item
- `BreadcrumbItem`: Breadcrumb navigation item
- `TabItem`: Tab component item
- `MenuItem`: Context menu item
- `LayoutConfig`: Layout configuration

### User Types (`types/user.ts`)
- `User`: Basic user information
- `UserProfile`: Extended user profile
- `UserPreferences`: User preference settings
- `NotificationSettings`: Notification preferences

## Usage Examples

### Importing Constants
```typescript
import { API_CONFIG, ROUTES, STORAGE_KEYS } from '@/shared/constants';

// Use API configuration
const apiUrl = API_CONFIG.BASE_URL;

// Use route constants
const loginPath = ROUTES.LOGIN;

// Use storage keys
localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
```

### Importing Types
```typescript
import type { ApiResponse, User, LoadingState } from '@/shared/types';

// Use in component props
interface UserListProps {
  users: User[];
  loading: LoadingState;
}

// Use in API responses
const response: ApiResponse<User[]> = await api.get('/users');
```

### Using Base Types
```typescript
import type { BaseModel, FormState } from '@/shared/types';

// Extend base model for your entities
interface Product extends BaseModel {
  name: string;
  price: number;
  category: string;
}

// Use form state for form management
const [formState, setFormState] = useState<FormState<LoginCredentials>>({
  data: { email: '', password: '' },
  errors: [],
  isValid: false,
  isDirty: false,
  isSubmitting: false,
});
```

## Best Practices

1. **Import from index**: Always import from the barrel exports (`@/shared/types`, `@/shared/constants`)
2. **Extend base types**: Use `BaseEntity` or `BaseModel` for your data models
3. **Use generic types**: Leverage generic types like `ApiResponse<T>` for type safety
4. **Consistent naming**: Follow the established naming conventions
5. **Type-only imports**: Use `import type` for type-only imports to improve tree shaking