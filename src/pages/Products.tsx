import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart, Product } from '../contexts/CartContext';
import Cart from '../components/Cart';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { currentUser } = useAuth();
  const { addItem, getItemCount } = useCart();
  const navigate = useNavigate();

  const categories = ['Todos', 'Madeirite', 'Poste', 'Táboa', 'Telas', 'Telha Ecológica', 'Verniz', 'Cano', 'Arame', 'Lenha', 'Mourão', 'Tinta', 'Parafuso', 'Prego', 'Cola', 'Lixa'];

  const products: Product[] = [
    {
      id: '1',
      name: "Madeirite Plastificado 17mm",
      description: "Madeirite resistente e versátil, ideal para construções. Plastificado para maior durabilidade.",
      image: "https://http2.mlstatic.com/D_NQ_NP_668571-MLB89679904286_082025-O-chapa-madeirite-plastificado-resina-fenolica-17mm-construc.webp",
      price: 89.90,
      category: "Madeirite"
    },
    {
      id: '2',
      name: "Madeirite Naval 12mm",
      description: "Madeirite naval de alta qualidade, resistente à umidade.",
      image: "https://http2.mlstatic.com/D_NQ_NP_668571-MLB89679904286_082025-O-chapa-madeirite-plastificado-resina-fenolica-17mm-construc.webp",
      price: 65.50,
      category: "Madeirite"
    },
    {
      id: '3',
      name: "Poste de Eucalipto 2,5m",
      description: "Poste de eucalipto tratado, ideal para cercas e construções rurais.",
      image: "https://images-offstore.map.azionedge.net/compressed/6de7248721eab5680992738cd9648d95.webp",
      price: 45.00,
      category: "Poste"
    },
    {
      id: '4',
      name: "Poste de Eucalipto 3m",
      description: "Poste de eucalipto tratado de 3 metros, extra resistente.",
      image: "https://images-offstore.map.azionedge.net/compressed/6de7248721eab5680992738cd9648d95.webp",
      price: 58.00,
      category: "Poste"
    },
    {
      id: '5',
      name: "Táboa de Eucalipto 2,5x20cm",
      description: "Táboa de eucalipto de alta qualidade, perfeita para construções.",
      image: "https://images-offstore.map.azionedge.net/compressed/e1400563917aaa9a8c811fe37064241e.webp",
      price: 25.90,
      category: "Táboa"
    },
    {
      id: '6',
      name: "Táboa de Eucalipto 3x25cm",
      description: "Táboa de eucalipto premium, ideal para acabamentos.",
      image: "https://images-offstore.map.azionedge.net/compressed/e1400563917aaa9a8c811fe37064241e.webp",
      price: 32.50,
      category: "Táboa"
    },
    {
      id: '7',
      name: "Tela Galvanizada 1,5m",
      description: "Tela galvanizada resistente, ideal para proteção e divisórias.",
      image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp",
      price: 85.00,
      category: "Telas"
    },
    {
      id: '8',
      name: "Tela Soldada 2m",
      description: "Tela soldada de alta resistência para cercamentos.",
      image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp",
      price: 120.00,
      category: "Telas"
    },
    {
      id: '9',
      name: "Telha Ecológica Ondulada",
      description: "Telha ecológica sustentável e resistente, perfeita para coberturas.",
      image: "https://images.tcdn.com.br/img/img_prod/727427/telha_ecologica_termica_al_6mm_2_20m_x_0_80m_6807935_8_cf02a7f5308a6401ef90dce83887452e.jpg",
      price: 45.90,
      category: "Telha Ecológica"
    },
    {
      id: '10',
      name: "Telha Ecológica Trapezoidal",
      description: "Telha ecológica trapezoidal com isolamento térmico.",
      image: "https://images.tcdn.com.br/img/img_prod/727427/telha_ecologica_termica_al_6mm_2_20m_x_0_80m_6807935_8_cf02a7f5308a6401ef90dce83887452e.jpg",
      price: 52.90,
      category: "Telha Ecológica"
    },
    {
      id: '11',
      name: "Verniz Marítimo 3,6L",
      description: "Verniz marítimo que protege e realça a beleza natural da madeira.",
      image: "https://www.zemad.com.br/wp-content/uploads/2016/10/tipos-de-verniz.jpg",
      price: 89.90,
      category: "Verniz"
    },
    {
      id: '12',
      name: "Verniz Fosco 900ml",
      description: "Verniz fosco para acabamento natural em madeiras.",
      image: "https://www.zemad.com.br/wp-content/uploads/2016/10/tipos-de-verniz.jpg",
      price: 35.50,
      category: "Verniz"
    },
    {
      id: '13',
      name: "Cano PVC 100mm",
      description: "Cano PVC resistente e versátil, ideal para instalações hidráulicas.",
      image: "https://images.tcdn.com.br/img/img_prod/624414/tubo_cano_pvc_esgoto_branco_de_50mm_barra_6_metros_1663_1_20200224192604.jpg",
      price: 28.90,
      category: "Cano"
    },
    {
      id: '14',
      name: "Cano PVC 75mm",
      description: "Cano PVC para esgoto e águas pluviais.",
      image: "https://images.tcdn.com.br/img/img_prod/624414/tubo_cano_pvc_esgoto_branco_de_50mm_barra_6_metros_1663_1_20200224192604.jpg",
      price: 22.50,
      category: "Cano"
    },
    {
      id: '15',
      name: "Arame Galvanizado 1,2mm",
      description: "Arame galvanizado forte e durável, ideal para cercas e fixações.",
      image: "https://acdn-us.mitiendanube.com/stores/001/111/164/products/93533875b91daeb411a0535a5348933f-d8e11751daac4c7e8016918459991988-640-0.jpg",
      price: 15.90,
      category: "Arame"
    },
    {
      id: '16',
      name: "Arame Farpado 500m",
      description: "Arame farpado galvanizado para cercamentos rurais.",
      image: "https://acdn-us.mitiendanube.com/stores/001/111/164/products/93533875b91daeb411a0535a5348933f-d8e11751daac4c7e8016918459991988-640-0.jpg",
      price: 185.00,
      category: "Arame"
    },
    {
      id: '17',
      name: "Lenha Seca Premium 20kg",
      description: "Lenha de eucalipto selecionada e seca, ideal para churrascos.",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
      price: 25.00,
      category: "Lenha"
    },
    {
      id: '18',
      name: "Lenha Verde 30kg",
      description: "Lenha de eucalipto verde para secagem natural.",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
      price: 18.50,
      category: "Lenha"
    },
    {
      id: '19',
      name: "Mourão Tratado 2,2m",
      description: "Mourão de eucalipto tratado para cercas e porteiras.",
      image: "https://images.pexels.com/photos/1029641/pexels-photo-1029641.jpeg",
      price: 18.00,
      category: "Mourão"
    },
    {
      id: '20',
      name: "Mourão Roliço 2,5m",
      description: "Mourão roliço natural de eucalipto para construções rurais.",
      image: "https://images.pexels.com/photos/1029641/pexels-photo-1029641.jpeg",
      price: 22.90,
      category: "Mourão"
    }
  ];

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchTerm, priceRange]);

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5)
      .map(product => product.name);
  }, [searchTerm]);

  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addItem(product);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

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

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Mínimo
              </label>
              <input
                type="number"
                min="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="R$ 0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Máximo
              </label>
              <input
                type="number"
                min="0"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="R$ 1000"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          
          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Carrinho</span>
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
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
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar</span>
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
              Nenhum produto encontrado com os filtros aplicados.
            </p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;