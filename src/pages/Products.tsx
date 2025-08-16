import React, { useState } from 'react';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const whatsappNumber = "556199910956";

  const handleWhatsAppClick = (product: string) => {
    const message = `Olá! Tenho interesse no produto: ${product}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const categories = ['Todos', 'Madeirite', 'Poste', 'Táboa', 'Telas'];

  const products = [
    {
      name: "Madeirite",
      description: "DESCRIÇÃO",
      image: "https://images-offstore.map.azionedge.net/compressed/e1400563917aaa9a8c811fe37064241e.webp",
      price: "Consulte preços",
      category: "Madeirite"
    },
    {
      name: "Poste",
      description: "DESCRIÇÃO",
      image: "https://images.pexels.com/photos/1029641/pexels-photo-1029641.jpeg",
      price: "Consulte preços",
      category: "Poste"
    },
    {
      name: "Táboa",
      description: "DESCRIÇÃO",
      image: "https://images.pexels.com/photos/162640/wood-logs-lumber-log-162640.jpeg",
      price: "Consulte preços",
      category: "Táboa"
    },
    {
      name: "Telas",
      description: "DESCRIÇÃO",
      image: "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg",
      price: "Consulte preços",
      category: "Telas"
    }
  ];

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600">
            Eucalipto de qualidade para todas as suas necessidades
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-600 hover:text-emerald-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-emerald-600">
                    {product.price}
                  </span>
                  <button 
                    onClick={() => handleWhatsAppClick(product.name)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;