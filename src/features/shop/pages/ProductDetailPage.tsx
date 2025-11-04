import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id || '1'),
    name: 'iPhone 15 Pro',
    price: 29990000,
    originalPrice: 32990000,
    description: 'iPhone 15 Pro với chip A17 Pro mạnh mẽ, camera chuyên nghiệp và thiết kế titan cao cấp.',
    features: [
      'Chip A17 Pro 3nm tiên tiến',
      'Camera chính 48MP với zoom quang học 3x',
      'Màn hình Super Retina XDR 6.1 inch',
      'Khung viền titan cực bền',
      'Hỗ trợ USB-C',
      'Chống nước IP68'
    ],
    images: [
      '/api/placeholder/500/500',
      '/api/placeholder/500/500',
      '/api/placeholder/500/500'
    ],
    inStock: true,
    rating: 4.8,
    reviews: 1234
  };

  const [selectedImage, setSelectedImage] = useState(0);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">Trang chủ</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Sản phẩm</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <span className="text-red-500 font-semibold">
                  Tiết kiệm {(product.originalPrice - product.price).toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tính năng nổi bật</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="font-semibold">Số lượng:</label>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                  Thêm vào giỏ hàng
                </button>
                <Link 
                  to="/checkout"
                  className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-center"
                >
                  Mua ngay
                </Link>
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.inStock ? (
                <span className="text-green-600 font-semibold">✓ Còn hàng</span>
              ) : (
                <span className="text-red-600 font-semibold">✗ Hết hàng</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;