import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'iPhone 15 Pro', price: 29990000, category: 'phone', image: '/api/placeholder/300/300' },
    { id: 2, name: 'Samsung Galaxy S24', price: 25990000, category: 'phone', image: '/api/placeholder/300/300' },
    { id: 3, name: 'MacBook Air M3', price: 34990000, category: 'laptop', image: '/api/placeholder/300/300' },
    { id: 4, name: 'iPad Pro', price: 24990000, category: 'tablet', image: '/api/placeholder/300/300' },
    { id: 5, name: 'Dell XPS 13', price: 32990000, category: 'laptop', image: '/api/placeholder/300/300' },
    { id: 6, name: 'AirPods Pro', price: 6990000, category: 'accessory', image: '/api/placeholder/300/300' },
  ];

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'phone', name: 'Điện thoại' },
    { id: 'laptop', name: 'Laptop' },
    { id: 'tablet', name: 'Tablet' },
    { id: 'accessory', name: 'Phụ kiện' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
              <Link to="/products" className="text-primary font-semibold">Sản phẩm</Link>
              <Link to="/cart" className="text-gray-700 hover:text-primary">Giỏ hàng</Link>
              <Link to="/login" className="text-gray-700 hover:text-primary">Đăng nhập</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Sản phẩm</h1>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-primary mb-4">
                  {product.price.toLocaleString('vi-VN')}đ
                </p>
                <div className="flex gap-2">
                  <Link 
                    to={`/products/${product.id}`}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-center"
                  >
                    Xem chi tiết
                  </Link>
                  <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;