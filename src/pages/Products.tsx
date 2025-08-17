import React, { useState } from 'react';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const whatsappNumber = "556199910956";

  const handleWhatsAppClick = (product: string) => {
    const message = `Olá! Tenho interesse no produto: ${product}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const categories = ['Todos', 'Madeirite', 'Poste', 'Táboa', 'Telas', 'Telha Ecológica', 'Verniz', 'Mourões', 'Carvão', 'Estacas', 'Ripas', 'Caibros', 'Vigas'];

  const products = [
    {
      name: "Madeirite",
      description: "Madeirite resistente e versátil, ideal para construções.",
      image: "https://http2.mlstatic.com/D_NQ_NP_668571-MLB89679904286_082025-O-chapa-madeirite-plastificado-resina-fenolica-17mm-construc.webp",
      price: "R$ 0,00",
      category: "Madeirite"
    },
    {
      name: "Poste",
      description: "Madeira resistente, ideal para diversas construções.",
      image: "https://images-offstore.map.azionedge.net/compressed/6de7248721eab5680992738cd9648d95.webp",
      price: "R$ 0,00",
      category: "Poste"
    },
    {
      name: "Táboa",
      description: "Madeira de alta qualidade, perfeita para cortes e construções.",
      image: "https://images-offstore.map.azionedge.net/compressed/e1400563917aaa9a8c811fe37064241e.webp",
      price: "R$ 0,00",
      category: "Táboa"
    },
    {
      name: "Telas",
      description: "Tela resistente, ideal para proteção e divisórias.",
      image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp",
      price: "R$ 0,00",
      category: "Telas"
    },
    {
      name: "Telha Ecológica",
      description: "Sustentável e resistente, perfeita para coberturas.",
      image: "https://images.tcdn.com.br/img/img_prod/727427/telha_ecologica_termica_al_6mm_2_20m_x_0_80m_6807935_8_cf02a7f5308a6401ef90dce83887452e.jpg",
      price: "R$ 0,00",
      category: "Telha Ecológica"
    },
    {
      name: "Verniz",
      description: "Toras resistentes para construção civil",
      image: "https://www.zemad.com.br/wp-content/uploads/2016/10/tipos-de-verniz.jpg",
      price: "R$ 0,00",
      category: "Verniz"
    },
    {
      name: "Mourões Tratados",
      description: "Mourões de eucalipto tratado para cercas",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBAgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBwT/xAAfEAEBAQEBAQABBQAAAAAAAAAAARFBMSFREmFxgYL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lS+KcoMzxYRQSp4oCUipAEVAUABFABUAoUBBToIKAhSlBIVYmAJWsQEz4laqWAiNYzQT9KNYgPoOKgEAAwAEBQZMVQZxYKCKAJRUBJ6qp0DTpgCUxQEpVsQBFARGkBKUpQQxU4BkQAd0UBIvEiggpgIKAhphgBuHh6BAAAAAAEVAUACpVAZwxQEOLiYCCpQTEUBEaAdRUAgAAAAFAAARQBFToAoCYcn7rU/ABn1QBKqUBLWkoJq8T+lBBUBErTNBCqUGVAHYPgCCgIAAAAAACghgAFCgAAAAFCgBCggAAAJqUvpQSi1AAAdQAAAEUARagAAAAAKCKICpFQAABagAUAQ4qcAABMStICJGriUE+AA6gAAAAUEAAAABQAARQARQEUASigIKUEAoCKAyFKCWlDAMD/IDoAAIoBQoIsRYACAoQAAAAAAAAAEnqgBSAVFQAAERUoCGAAu/wAANgAAAAAgoCCoCwAAAAAAABF4gLAqAqCggAAIAACAaCffzFQB1QARQAAAqACwgAUAEUAAAC+ACcABagAAAQADiAAIAIAAAP/Z",
      price: "R$ 0,00",
      category: "Mourões"
    },
    {
      name: "Carvão Vegetal",
      description: "Carvão vegetal de eucalipto para churrascos",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBAgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBwT/xAAfEAEBAQEBAQABBQAAAAAAAAAAARFBMSFREmFxgYL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lS+KcoMzxYRQSp4oCUipAEVAUABFABUAoUBBToIKAhSlBIVYmAJWsQEz4laqWAiNYzQT9KNYgPoOKgEAAwAEBQZMVQZxYKCKAJRUBJ6qp0DTpgCUxQEpVsQBFARGkBKUpQQxU4BkQAd0UBIvEiggpgIKAhphgBuHh6BAAAAAAEVAUACpVAZwxQEOLiYCCpQTEUBEaAdRUAgAAAAFAAARQBFToAoCYcn7rU/ABn1QBKqUBLWkoJq8T+lBBUBErTNBCqUGVAHYPgCCgIAAAAAACghgAFCgAAAAFCgBCggAAAJqUvpQSi1AAAdQAAAEUARagAAAAAKCKICpFQAABagAUAQ4qcAABMStICJGriUE+AA6gAAAAUEAAAABQAARQARQEUASigIKUEAoCKAyFKCWlDAMD/IDoAAIoBQoIsRYACAoQAAAAAAAAAEnqgBSAVFQAAERUoCGAAu/wAANgAAAAAgoCCoCwAAAAAAABF4gLAqAqCggAAIAACAaCffzFQB1QARQAAAqACwgAUAEUAAAC+ACcABagAAAQADiAAIAIAAAP/Z",
      price: "R$ 0,00",
      category: "Carvão"
    },
    {
      name: "Estacas de Eucalipto",
      description: "Estacas resistentes para diversos usos",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBAgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBwT/xAAfEAEBAQEBAQABBQAAAAAAAAAAARFBMSFREmFxgYL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lS+KcoMzxYRQSp4oCUipAEVAUABFABUAoUBBToIKAhSlBIVYmAJWsQEz4laqWAiNYzQT9KNYgPoOKgEAAwAEBQZMVQZxYKCKAJRUBJ6qp0DTpgCUxQEpVsQBFARGkBKUpQQxU4BkQAd0UBIvEiggpgIKAhphgBuHh6BAAAAAAEVAUACpVAZwxQEOLiYCCpQTEUBEaAdRUAgAAAAFAAARQBFToAoCYcn7rU/ABn1QBKqUBLWkoJq8T+lBBUBErTNBCqUGVAHYPgCCgIAAAAAACghgAFCgAAAAFCgBCggAAAJqUvpQSi1AAAdQAAAEUARagAAAAAKCKICpFQAABagAUAQ4qcAABMStICJGriUE+AA6gAAAAUEAAAABQAARQARQEUASigIKUEAoCKAyFKCWlDAMD/IDoAAIoBQoIsRYACAoQAAAAAAAAAEnqgBSAVFQAAERUoCGAAu/wAANgAAAAAgoCCoCwAAAAAAABF4gLAqAqCggAAIAACAaCffzFQB1QARQAAAqACwgAUAEUAAAC+ACcABagAAAQADiAAIAIAAAP/Z",
      price: "R$ 0,00",
      category: "Estacas"
    },
    {
      name: "Ripas de Eucalipto",
      description: "Ripas de eucalipto para construção",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBAgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBwT/xAAfEAEBAQEBAQABBQAAAAAAAAAAARFBMSFREmFxgYL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lS+KcoMzxYRQSp4oCUipAEVAUABFABUAoUBBToIKAhSlBIVYmAJWsQEz4laqWAiNYzQT9KNYgPoOKgEAAwAEBQZMVQZxYKCKAJRUBJ6qp0DTpgCUxQEpVsQBFARGkBKUpQQxU4BkQAd0UBIvEiggpgIKAhphgBuHh6BAAAAAAEVAUACpVAZwxQEOLiYCCpQTEUBEaAdRUAgAAAAFAAARQBFToAoCYcn7rU/ABn1QBKqUBLWkoJq8T+lBBUBErTNBCqUGVAHYPgCCgIAAAAAACghgAFCgAAAAFCgBCggAAAJqUvpQSi1AAAdQAAAEUARagAAAAAKCKICpFQAABagAUAQ4qcAABMStICJGriUE+AA6gAAAAUEAAAABQAARQARQEUASigIKUEAoCKAyFKCWlDAMD/IDoAAIoBQoIsRYACAoQAAAAAAAAAEnqgBSAVFQAAERUoCGAAu/wAANgAAAAAgoCCoCwAAAAAAABF4gLAqAqCggAAIAACAaCffzFQB1QARQAAAqACwgAUAEUAAAC+ACcABagAAAQADiAAIAIAAAP/Z",
      price: "R$ 0,00",
      category: "Ripas"
    },
    {
      name: "Caibros",
      description: "Caibros de eucalipto para estruturas",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBAgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBwT/xAAfEAEBAQEBAQABBQAAAAAAAAAAARFBMSFREmFxgYL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lS+KcoMzxYRQSp4oCUipAEVAUABFABUAoUBBToIKAhSlBIVYmAJWsQEz4laqWAiNYzQT9KNYgPoOKgEAAwAEBQZMVQZxYKCKAJRUBJ6qp0DTpgCUxQEpVsQBFARGkBKUpQQxU4BkQAd0UBIvEiggpgIKAhphgBuHh6BAAAAAAEVAUACpVAZwxQEOLiYCCpQTEUBEaAdRUAgAAAAFAAARQBFToAoCYcn7rU/ABn1QBKqUBLWkoJq8T+lBBUBErTNBCqUGVAHYPgCCgIAAAAAACghgAFCgAAAAFCgBCggAAAJqUvpQSi1AAAdQAAAEUARagAAAAAKCKICpFQAABagAUAQ4qcAABMStICJGriUE+AA6gAAAAUEAAAABQAARQARQEUASigIKUEAoCKAyFKCWlDAMD/IDoAAIoBQoIsRYACAoQAAAAAAAAAEnqgBSAVFQAAERUoCGAAu/wAANgAAAAAgoCCoCwAAAAAAABF4gLAqAqCggAAIAACAaCffzFQB1QARQAAAqACwgAUAEUAAAC+ACcABagAAAQADiAAIAIAAAP/Z",
      price: "R$ 0,00",
      category: "Caibros"
    },
    {
      name: "Vigas de Eucalipto",
      description: "Vigas estruturais de eucalipto tratado",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBAgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBwT/xAAfEAEBAQEBAQABBQAAAAAAAAAAARFBMSFREmFxgYL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9lS+KcoMzxYRQSp4oCUipAEVAUABFABUAoUBBToIKAhSlBIVYmAJWsQEz4laqWAiNYzQT9KNYgPoOKgEAAwAEBQZMVQZxYKCKAJRUBJ6qp0DTpgCUxQEpVsQBFARGkBKUpQQxU4BkQAd0UBIvEiggpgIKAhphgBuHh6BAAAAAAEVAUACpVAZwxQEOLiYCCpQTEUBEaAdRUAgAAAAFAAARQBFToAoCYcn7rU/ABn1QBKqUBLWkoJq8T+lBBUBErTNBCqUGVAHYPgCCgIAAAAAACghgAFCgAAAAFCgBCggAAAJqUvpQSi1AAAdQAAAEUARagAAAAAKCKICpFQAABagAUAQ4qcAABMStICJGriUE+AA6gAAAAUEAAAABQAARQARQEUASigIKUEAoCKAyFKCWlDAMD/IDoAAIoBQoIsRYACAoQAAAAAAAAAEnqgBSAVFQAAERUoCGAAu/wAANgAAAAAgoCCoCwAAAAAAABF4gLAqAqCggAAIAACAaCffzFQB1QARQAAAqACwgAUAEUAAAC+ACcABagAAAQADiAAIAIAAAP/Z",
      price: "R$ 0,00",
      category: "Vigas"
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