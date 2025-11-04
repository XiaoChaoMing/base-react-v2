# TechStore - React E-commerce Demo

Một ứng dụng web bán hàng demo được xây dựng với React, TypeScript và Vite, sử dụng kiến trúc feature-based.

## 🚀 Tính năng

- 🛍️ Trang chủ với sản phẩm nổi bật
- 📱 Danh sách sản phẩm với filter theo danh mục
- 🔍 Chi tiết sản phẩm với hình ảnh và thông tin đầy đủ
- 🛒 Giỏ hàng với quản lý số lượng
- 💳 Trang thanh toán với form thông tin giao hàng
- 🔐 Đăng nhập/Đăng ký (demo)
- 📱 Responsive design
- ⚡ Fast loading với lazy loading
- 🎨 UI hiện đại với Tailwind CSS

## 🏗️ Cấu trúc dự án

```
src/
├── app/                    # App layer - Core application setup
│   ├── layouts/           # Application layouts (RootLayout, AuthLayout)
│   ├── providers/         # App providers (Auth, Query, etc.)
│   └── router/            # Router configuration with lazy loading
├── features/              # Feature modules
│   └── shop/             # Shop feature
│       └── pages/        # Shop pages (Home, Products, Cart, etc.)
├── shared/               # Shared utilities and components
│   ├── components/       # Reusable UI components
│   ├── constants/        # App constants
│   ├── hooks/           # Custom hooks
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── components/          # Base UI components
│   ├── base/           # Base components (Loading, etc.)
│   └── ui/             # UI components
├── pages/              # Auth pages
│   └── auth/          # Login, Register pages
├── hooks/             # Application-specific hooks
└── lib/               # Library utilities
```

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + useState
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: React Router DOM v6
- **Form Handling**: Native HTML forms
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier

## 📋 Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn hoặc pnpm

## 🚀 Cài đặt và chạy

1. **Clone repository:**
```bash
git clone <repository-url>
cd techstore-demo
```

2. **Cài đặt dependencies:**
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

3. **Tạo file .env (tùy chọn):**
```env
VITE_API_URL=https://fakestoreapi.com
```

4. **Chạy development server:**
```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```
pnpm add -D @commitlint/config-conventional

5. **Mở trình duyệt:** http://localhost:5173

## 📝 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint
- `npm run lint:fix` - Tự động fix ESLint errors

## 🎯 Demo Features

### 🏠 Trang chủ
- Hero section với call-to-action
- Hiển thị sản phẩm nổi bật
- Navigation menu

### 🛍️ Trang sản phẩm
- Danh sách tất cả sản phẩm
- Filter theo danh mục (Điện thoại, Laptop, Tablet, Phụ kiện)
- Responsive grid layout

### 📱 Chi tiết sản phẩm
- Hình ảnh sản phẩm với thumbnail
- Thông tin chi tiết và tính năng
- Chọn số lượng và thêm vào giỏ hàng
- Đánh giá và reviews

### 🛒 Giỏ hàng
- Hiển thị sản phẩm đã chọn
- Tăng/giảm số lượng
- Tính tổng tiền tự động
- Miễn phí ship cho đơn hàng trên 50M

### 💳 Thanh toán
- Form thông tin giao hàng
- Chọn phương thức thanh toán
- Tóm tắt đơn hàng
- Protected route (cần đăng nhập)

### 🔐 Authentication
- Đăng nhập demo (admin@test.com / password)
- Đăng ký tài khoản mới
- Simple localStorage-based auth

## 🏛️ Kiến trúc

### Feature-Based Architecture
- Mỗi feature được tổ chức trong thư mục riêng
- Shared components và utilities được tái sử dụng
- Clear separation of concerns

### App Layer
- **Providers**: Quản lý global state và context
- **Router**: Cấu hình routing với lazy loading
- **Layouts**: Layout components cho các loại trang khác nhau

### Shared Layer
- **Components**: UI components có thể tái sử dụng
- **Services**: API clients và business logic
- **Types**: TypeScript type definitions
- **Utils**: Helper functions và utilities

## 🎨 UI/UX

- **Design System**: Consistent color scheme và typography
- **Responsive**: Mobile-first approach
- **Loading States**: Skeleton loading và spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: Semantic HTML và keyboard navigation

## 🔧 Customization

### Thêm sản phẩm mới
1. Cập nhật mock data trong các page components
2. Hoặc tích hợp với API thực tế

### Thay đổi theme
1. Cập nhật Tailwind config
2. Sửa CSS variables trong index.css

### Thêm tính năng mới
1. Tạo feature module mới trong `src/features/`
2. Thêm routes trong `src/app/router/routes.tsx`
3. Cập nhật navigation

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Production Build

```bash
npm run build
npm run preview
```

Build output sẽ được tạo trong thư mục `dist/`

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

