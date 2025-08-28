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
      image: 'https://http2.mlstatic.com/D_NQ_NP_993451-MLB89654413352_082025-O.webp',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '24',
      name: 'Prego c/ cabeça 17/27MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_993451-MLB89654413352_082025-O.webp',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '25',
      name: 'Prego c/ cabeça 18/30MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_993451-MLB89654413352_082025-O.webp',
      price: 24.00,
      weight: 1,
      category: 'Ferragens'
    },
    {
      id: '26',
      name: 'Prego c/ cabeça 19/36MM kg',
      description: 'Prego com cabeça para construção',
      image: 'https://http2.mlstatic.com/D_NQ_NP_993451-MLB89654413352_082025-O.webp',
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
      image: 'data:image/jpeg;base64,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',
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