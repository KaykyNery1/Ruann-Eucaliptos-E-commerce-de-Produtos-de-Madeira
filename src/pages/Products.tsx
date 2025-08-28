import React, { useState } from 'react';
import { Search, Filter, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../contexts/CartContext';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addItem } = useCart();
  const { currentUser } = useAuth();

  // Lista completa de 51 produtos conforme especificado
  const products: Product[] = [
    // Arames (12 produtos)
    {
      id: '1',
      name: 'Arame farpado 100 MT',
      description: 'Arame farpado de alta qualidade para cercas',
      image: 'https://m.media-amazon.com/images/I/61BhEZw3ejL._AC_.jpg',
      price: 125.00,
      weight: 8,
      category: 'Arames'
    },
    {
      id: '2',
      name: 'Arame farpado 250 MT',
      description: 'Arame farpado de alta qualidade para cercas',
      image: 'https://m.media-amazon.com/images/I/61BhEZw3ejL._AC_.jpg',
      price: 250.00,
      weight: 20,
      category: 'Arames'
    },
    {
      id: '3',
      name: 'Arame farpado 500 MT',
      description: 'Arame farpado de alta qualidade para cercas',
      image: 'https://m.media-amazon.com/images/I/61BhEZw3ejL._AC_.jpg',
      price: 400.00,
      weight: 40,
      category: 'Arames'
    },
    {
      id: '4',
      name: 'Arame oval liso 15/17 500 MT',
      description: 'Arame oval liso para cercas e construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_863662-MLB79216069780_092024-O.webp',
      price: 500.00,
      weight: 25,
      category: 'Arames'
    },
    {
      id: '5',
      name: 'Arame oval liso 1000 MT 14/16 700KG',
      description: 'Arame oval liso para cercas e construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_863662-MLB79216069780_092024-O.webp',
      price: 630.00,
      weight: 700,
      category: 'Arames'
    },
    {
      id: '6',
      name: 'Arame oval liso 1000 MT 15/17 700KG',
      description: 'Arame oval liso para cercas e construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_863662-MLB79216069780_092024-O.webp',
      price: 730.00,
      weight: 700,
      category: 'Arames'
    },
    {
      id: '7',
      name: 'Arame galvanizado 14 Bwg 1kg',
      description: 'Arame galvanizado resistente à corrosão',
      image: 'https://m.media-amazon.com/images/I/714AfSqTgyL._AC_SY300_SX300_QL70_ML2_.jpg',
      price: 30.00,
      weight: 1,
      category: 'Arames'
    },
    {
      id: '8',
      name: 'Arame galvanizado 16 Bwg 1kg',
      description: 'Arame galvanizado resistente à corrosão',
      image: 'https://m.media-amazon.com/images/I/714AfSqTgyL._AC_SY300_SX300_QL70_ML2_.jpg',
      price: 28.50,
      weight: 1,
      category: 'Arames'
    },
    {
      id: '9',
      name: 'Arame recozido 12 – 2,77MM aprox 5kg',
      description: 'Arame recozido maleável para diversas aplicações',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9iglhb1s6ruhWurXJqwGKYKC3GK6uYKNeIQ&s',
      price: 85.00,
      weight: 5,
      category: 'Arames'
    },
    {
      id: '10',
      name: 'Arame recozido 14 – 2,11MM aprox 1kg',
      description: 'Arame recozido maleável para diversas aplicações',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9iglhb1s6ruhWurXJqwGKYKC3GK6uYKNeIQ&s',
      price: 16.50,
      weight: 1,
      category: 'Arames'
    },
    {
      id: '11',
      name: 'Arame recozido 16 – 0,65MM aprox 1kg',
      description: 'Arame recozido maleável para diversas aplicações',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9iglhb1s6ruhWurXJqwGKYKC3GK6uYKNeIQ&s',
      price: 17.00,
      weight: 1,
      category: 'Arames'
    },
    {
      id: '12',
      name: 'Arame recozido 18 – 1,24MM aprox 1kg',
      description: 'Arame recozido maleável para diversas aplicações',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9iglhb1s6ruhWurXJqwGKYKC3GK6uYKNeIQ&s',
      price: 18.00,
      weight: 1,
      category: 'Arames'
    },

    // Telas (8 produtos)
    {
      id: '13',
      name: 'Tela hex pinteiro 1x24x1,00x50MT F24',
      description: 'Tela hexagonal para pinteiros e aves',
      image: 'https://cdn.leroymerlin.com.br/products/tela_plastica_hexagonal_pinteiro_linha_leve_1,0_m_x_50_m_no_1566846253_4fc9_600x600.jpg',
      price: 280.00,
      weight: 15,
      category: 'Telas'
    },
    {
      id: '14',
      name: 'Tela hex pinteiro 1,50Mx50M F24',
      description: 'Tela hexagonal para pinteiros e aves',
      image: 'https://cdn.leroymerlin.com.br/products/tela_plastica_hexagonal_pinteiro_linha_leve_1,0_m_x_50_m_no_1566846253_4fc9_600x600.jpg',
      price: 385.00,
      weight: 18,
      category: 'Telas'
    },
    {
      id: '15',
      name: 'Tela hex galinheiro 1,5Mx50M F23',
      description: 'Tela hexagonal para galinheiros',
      image: 'https://cdn.leroymerlin.com.br/products/tela_plastica_hexagonal_pinteiro_linha_leve_1,0_m_x_50_m_no_1566846253_4fc9_600x600.jpg',
      price: 305.00,
      weight: 20,
      category: 'Telas'
    },
    {
      id: '16',
      name: 'Tela hex galinheiro 1,80Mx50M F23',
      description: 'Tela hexagonal para galinheiros',
      image: 'https://cdn.leroymerlin.com.br/products/tela_plastica_hexagonal_pinteiro_linha_leve_1,0_m_x_50_m_no_1566846253_4fc9_600x600.jpg',
      price: 310.00,
      weight: 22,
      category: 'Telas'
    },
    {
      id: '17',
      name: 'Tela hex mangueirão F18 x 0,80x50MT',
      description: 'Tela hexagonal para mangueirão',
      image: 'https://t74920.vteximg.com.br/arquivos/ids/159774-900-900/Tela-Hexagonal-Mangueirao.png?v=637517001301870000',
      price: 330.00,
      weight: 25,
      category: 'Telas'
    },
    {
      id: '18',
      name: 'Tela hex mangueirão 1,20Mx50M F18',
      description: 'Tela hexagonal para mangueirão',
      image: 'https://t74920.vteximg.com.br/arquivos/ids/159774-900-900/Tela-Hexagonal-Mangueirao.png?v=637517001301870000',
      price: 500.00,
      weight: 30,
      category: 'Telas'
    },
    {
      id: '19',
      name: 'Tela hex mangueirão 1,5Mx50M F18',
      description: 'Tela hexagonal para mangueirão',
      image: 'https://t74920.vteximg.com.br/arquivos/ids/159774-900-900/Tela-Hexagonal-Mangueirao.png?v=637517001301870000',
      price: 600.00,
      weight: 35,
      category: 'Telas'
    },
    {
      id: '20',
      name: 'Tela hex mangueirão 1,80x50M F16',
      description: 'Tela hexagonal para mangueirão',
      image: 'https://t74920.vteximg.com.br/arquivos/ids/159774-900-900/Tela-Hexagonal-Mangueirao.png?v=637517001301870000',
      price: 1000.00,
      weight: 50,
      category: 'Telas'
    },

    // Ferragens (14 produtos)
    {
      id: '21',
      name: 'Grampo polido p/cerca 1x9 3,75MM',
      description: 'Grampo polido para fixação de cercas',
      image: 'https://http2.mlstatic.com/D_NQ_NP_986711-MLB69945459848_062023-O-prego-grampo-para-cerca-1-x-9-polido-1kg-gerdau.jpg',
      price: 25.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '22',
      name: 'Prego c/ cabeça 15/15MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_993451-MLB89654413352_082025-O.webp',
      price: 21.99,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '23',
      name: 'Prego c/ cabeça 17/21MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_845816-MLB79991228525_102024-O.jpg',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '24',
      name: 'Prego c/ cabeça 17/27MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_845816-MLB79991228525_102024-O.jpg',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '25',
      name: 'Prego c/ cabeça 18/30MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '26',
      name: 'Prego c/ cabeça 19/36MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '27',
      name: 'Prego 22/42 kg',
      description: 'Prego para construção pesada',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 30.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '28',
      name: 'Prego 22/48 kg',
      description: 'Prego para construção pesada',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 30.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '29',
      name: 'Prego 24/60 kg',
      description: 'Prego para construção pesada',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 30.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '30',
      name: 'Prego 25/72 kg',
      description: 'Prego para construção pesada',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 30.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '31',
      name: 'Prego 26/72 kg',
      description: 'Prego para construção pesada',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 30.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '32',
      name: 'Dobradiça galvanizada ferradura N1"',
      description: 'Dobradiça galvanizada resistente',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 25.00,
      weight: 0.2,
      category: 'Ferragens'
    },
    {
      id: '33',
      name: 'Dobradiça galvanizada ferradura N2"',
      description: 'Dobradiça galvanizada resistente',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 30.00,
      weight: 0.3,
      category: 'Ferragens'
    },
    {
      id: '34',
      name: 'Dobradiça galvanizada ferradura N3"',
      description: 'Dobradiça galvanizada resistente',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 35.00,
      weight: 0.4,
      category: 'Ferragens'
    },

    // Vernizes (7 produtos)
    {
      id: '35',
      name: 'Verniz copal bril 3,6LT INC',
      description: 'Verniz copal brilhante incolor',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 130.00,
      weight: 3.6,
      category: 'Vernizes'
    },
    {
      id: '36',
      name: 'Verniz extrarrápido bril 3,6LT imbuia',
      description: 'Verniz extrarrápido brilhante cor imbuia',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 180.00,
      weight: 3.6,
      category: 'Vernizes'
    },
    {
      id: '37',
      name: 'Verniz extrarrápido bril 3,6LT mogno',
      description: 'Verniz extrarrápido brilhante cor mogno',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 180.00,
      weight: 3.6,
      category: 'Vernizes'
    },
    {
      id: '38',
      name: 'Verniz extrarrápido bril 3,6LT nogueira',
      description: 'Verniz extrarrápido brilhante cor nogueira',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 180.00,
      weight: 3.6,
      category: 'Vernizes'
    },
    {
      id: '39',
      name: 'Verniz extrarrápido bril 3,6LT cedro',
      description: 'Verniz extrarrápido brilhante cor cedro',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 180.00,
      weight: 3.6,
      category: 'Vernizes'
    },
    {
      id: '40',
      name: 'Verniz stain INC 3,6LT',
      description: 'Verniz stain incolor',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 210.00,
      weight: 3.6,
      category: 'Vernizes'
    },
    {
      id: '41',
      name: 'Verniz osmocolor stain 3,6LT',
      description: 'Verniz osmocolor stain premium',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 300.00,
      weight: 3.6,
      category: 'Vernizes'
    },

    // Madeirites (10 produtos)
    {
      id: '42',
      name: 'Madeirite cola branca 2,20x1,10 05MM',
      description: 'Madeirite cola branca 5mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 40.00,
      weight: 10,
      category: 'Madeirites'
    },
    {
      id: '43',
      name: 'Madeirite cola branca 2,20x1,10 08MM',
      description: 'Madeirite cola branca 8mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 55.00,
      weight: 15,
      category: 'Madeirites'
    },
    {
      id: '44',
      name: 'Madeirite cola branca 2,20x1,10 10MM',
      description: 'Madeirite cola branca 10mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 85.00,
      weight: 20,
      category: 'Madeirites'
    },
    {
      id: '45',
      name: 'Madeirite cola branca 2,20x1,10 12MM',
      description: 'Madeirite cola branca 12mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 95.00,
      weight: 25,
      category: 'Madeirites'
    },
    {
      id: '46',
      name: 'Madeirite cola branca 2,20x1,10 14MM',
      description: 'Madeirite cola branca 14mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 115.00,
      weight: 30,
      category: 'Madeirites'
    },
    {
      id: '47',
      name: 'Madeirite plastificado 2,20x1,10 10MM',
      description: 'Madeirite plastificado 10mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 105.00,
      weight: 25,
      category: 'Madeirites'
    },
    {
      id: '48',
      name: 'Madeirite plastificado 2,20x1,10 12MM',
      description: 'Madeirite plastificado 12mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 125.00,
      weight: 30,
      category: 'Madeirites'
    },
    {
      id: '49',
      name: 'Madeirite plastificado 2,20x1,10 14MM',
      description: 'Madeirite plastificado 14mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 140.00,
      weight: 35,
      category: 'Madeirites'
    },
    {
      id: '50',
      name: 'Madeirite plastificado 2,20x1,10 17MM',
      description: 'Madeirite plastificado 17mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 160.00,
      weight: 40,
      category: 'Madeirites'
    },
    {
      id: '51',
      name: 'Madeirite plastificado 2,20x1,10 19MM',
      description: 'Madeirite plastificado 19mm',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 180.00,
      weight: 45,
      category: 'Madeirites'
    }
  ];

  const categories = ['Todos', 'Arames', 'Telas', 'Ferragens', 'Vernizes', 'Madeirites'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho.');
      return;
    }
    addItem(product);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Produtos de alta qualidade para suas necessidades de construção e cercamento
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-emerald-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Peso: {product.weight}kg
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!currentUser}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    currentUser
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
          </div>
        )}

        {/* Login reminder */}
        {!currentUser && (
          <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              Faça login para comprar
            </h3>
            <p className="text-emerald-600 mb-4">
              Para adicionar produtos ao carrinho e fazer pedidos, você precisa estar logado.
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              Fazer Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;