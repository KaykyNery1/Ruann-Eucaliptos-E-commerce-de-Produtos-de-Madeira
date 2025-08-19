import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Eucalipto Tratado Premium",
    price: 45.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeira",
    description: "Eucalipto tratado de alta qualidade para construção",
    rating: 4.8
  },
  {
    id: 2,
    name: "Mourão de Eucalipto 2,5m",
    price: 32.50,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "mouroes",
    description: "Mourão resistente para cercas e construções rurais",
    rating: 4.7
  },
  {
    id: 3,
    name: "Tábua de Eucalipto 3x20cm",
    price: 28.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tabuas",
    description: "Tábua de eucalipto para acabamentos e construção",
    rating: 4.6
  },
  {
    id: 4,
    name: "Poste de Eucalipto 6m",
    price: 89.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste robusto para instalações elétricas e cercas",
    rating: 4.9
  },
  {
    id: 5,
    name: "Madeirite Naval 15mm",
    price: 67.50,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeirite",
    description: "Madeirite naval resistente à umidade",
    rating: 4.5
  },
  {
    id: 6,
    name: "Tela Galvanizada 2x50m",
    price: 156.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "telas",
    description: "Tela galvanizada para cercamento",
    rating: 4.4
  },
  {
    id: 7,
    name: "Telha Fibrocimento",
    price: 23.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "telhas",
    description: "Telha de fibrocimento ondulada",
    rating: 4.3
  },
  {
    id: 8,
    name: "Verniz Marítimo 3,6L",
    price: 89.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "verniz",
    description: "Verniz marítimo para proteção da madeira",
    rating: 4.7
  },
  {
    id: 9,
    name: "Cano PVC 100mm",
    price: 34.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "canos",
    description: "Cano PVC para esgoto e drenagem",
    rating: 4.2
  },
  {
    id: 10,
    name: "Arame Farpado 500m",
    price: 78.50,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "arames",
    description: "Arame farpado galvanizado para cercas",
    rating: 4.6
  },
  {
    id: 11,
    name: "Lenha de Eucalipto Seca",
    price: 45.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "lenha",
    description: "Lenha seca de eucalipto para fogão à lenha",
    rating: 4.8
  },
  {
    id: 12,
    name: "Caibro de Eucalipto 5x7cm",
    price: 18.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeira",
    description: "Caibro de eucalipto para estruturas",
    rating: 4.5
  },
  {
    id: 13,
    name: "Ripa de Eucalipto 1x5cm",
    price: 12.50,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeira",
    description: "Ripa de eucalipto para acabamentos",
    rating: 4.4
  },
  {
    id: 14,
    name: "Viga de Eucalipto 6x12cm",
    price: 67.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeira",
    description: "Viga estrutural de eucalipto",
    rating: 4.9
  },
  {
    id: 15,
    name: "Estaca de Eucalipto 1,5m",
    price: 15.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "mouroes",
    description: "Estaca pontiaguda para cercas",
    rating: 4.3
  },
  {
    id: 16,
    name: "Sarrafo de Eucalipto 2x4cm",
    price: 8.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeira",
    description: "Sarrafo fino para acabamentos",
    rating: 4.2
  },
  {
    id: 17,
    name: "Poste Tratado 4m",
    price: 65.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste tratado para cercas residenciais",
    rating: 4.6
  },
  {
    id: 18,
    name: "Tábua Aparelhada 2,5x15cm",
    price: 35.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tabuas",
    description: "Tábua aparelhada para construção",
    rating: 4.7
  },
  {
    id: 19,
    name: "Compensado Naval 12mm",
    price: 89.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "madeirite",
    description: "Compensado naval de alta qualidade",
    rating: 4.8
  },
  {
    id: 20,
    name: "Mourão Roliço 3m",
    price: 42.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "mouroes",
    description: "Mourão roliço natural para cercas rurais",
    rating: 4.5
  }
];

const categories = [
  { value: '', label: 'Todas as Categorias' },
  { value: 'madeira', label: 'Madeira' },
  { value: 'mouroes', label: 'Mourões' },
  { value: 'tabuas', label: 'Tábuas' },
  { value: 'postes', label: 'Postes' },
  { value: 'madeirite', label: 'Madeirite' },
  { value: 'telas', label: 'Telas' },
  { value: 'telhas', label: 'Telhas' },
  { value: 'verniz', label: 'Verniz' },
  { value: 'canos', label: 'Canos' },
  { value: 'arames', label: 'Arames' },
  { value: 'lenha', label: 'Lenha' }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const productSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(productSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra nossa linha completa de produtos de eucalipto de alta qualidade
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="font-medium text-gray-900">{suggestion.name}</div>
                      <div className="text-sm text-gray-500">R$ {suggestion.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
            {selectedCategory && ` na categoria "${categories.find(c => c.value === selectedCategory)?.label}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou termo de busca
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}