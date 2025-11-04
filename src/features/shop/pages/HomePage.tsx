import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredProducts = [
    { id: 1, name: 'iPhone 15 Pro', price: 29990000, image: '/api/placeholder/300/300' },
    { id: 2, name: 'Samsung Galaxy S24', price: 25990000, image: '/api/placeholder/300/300' },
    { id: 3, name: 'MacBook Air M3', price: 34990000, image: '/api/placeholder/300/300' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary">
              TechStore
            </Link>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary">Trang chủ</Link>
              <Link to="/products" className="text-gray-700 hover:text-primary">Sản phẩm</Link>
              <Link to="/cart" className="text-gray-700 hover:text-primary">Giỏ hàng</Link>
              <Link to="/login" className="text-gray-700 hover:text-primary">Đăng nhập</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Chào mừng đến TechStore
          </h1>
          <p className="text-xl mb-8">
            Khám phá những sản phẩm công nghệ mới nhất với giá tốt nhất
          </p>
          <Link 
            to="/products" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Mua sắm ngay
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {product.price.toLocaleString('vi-VN')}đ
                  </p>
                  <Link 
                    to={`/products/${product.id}`}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors inline-block text-center"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 TechStore. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;