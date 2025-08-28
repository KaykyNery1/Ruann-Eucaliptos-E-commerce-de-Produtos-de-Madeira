import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

const products: Product[] = [
  // Arames
  { id: 1, name: "Arame farpado 100 MT", price: 125.00, weight: 8, image: "https://images-offstore.map.azionedge.net/compressed/2a55ee276b9798f5b056e78a9ab4e8b6.webp", category: "arames", description: "Arame farpado 100 metros", rating: 4.7 },
  { id: 2, name: "Arame farpado 250 MT", price: 250.00, weight: 20, image: "https://images-offstore.map.azionedge.net/compressed/2a55ee276b9798f5b056e78a9ab4e8b6.webp", category: "arames", description: "Arame farpado 250 metros", rating: 4.7 },
  { id: 3, name: "Arame farpado 500 MT", price: 400.00, weight: 40, image: "https://images-offstore.map.azionedge.net/compressed/2a55ee276b9798f5b056e78a9ab4e8b6.webp", category: "arames", description: "Arame farpado 500 metros", rating: 4.8 },
  { id: 4, name: "Arame oval liso 15/17 500 MT", price: 500.00, weight: 25, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame oval liso 15/17 - 500 metros", rating: 4.6 },
  { id: 5, name: "Arame oval liso 1000 MT 14/16 700KG", price: 630.00, weight: 700, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame oval liso 1000 metros 14/16 - 700kg", rating: 4.7 },
  { id: 6, name: "Arame oval liso 1000 MT 15/17 700KG", price: 730.00, weight: 700, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame oval liso 1000 metros 15/17 - 700kg", rating: 4.8 },
  { id: 7, name: "Arame galvanizado 14 Bwg 1kg", price: 30.00, weight: 1, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame galvanizado 14 Bwg - 1kg", rating: 4.5 },
  { id: 8, name: "Arame galvanizado 16 Bwg 1kg", price: 28.50, weight: 1, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame galvanizado 16 Bwg - 1kg", rating: 4.5 },
  { id: 9, name: "Arame recozido 12 – 2,77MM aprox 5kg", price: 85.00, weight: 5, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame recozido 12 - 2,77mm aproximadamente 5kg", rating: 4.5 },
  { id: 10, name: "Arame recozido 14 – 2,11MM aprox 1kg", price: 16.50, weight: 1, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame recozido 14 - 2,11mm - 1kg", rating: 4.4 },
  { id: 11, name: "Arame recozido 16 – 0,65MM aprox 1kg", price: 17.00, weight: 1, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame recozido 16 - 1,65mm - 1kg", rating: 4.4 },
  { id: 12, name: "Arame recozido 18 – 1,24MM aprox 1kg", price: 18.00, weight: 1, image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg", category: "arames", description: "Arame recozido 18 - 1,24mm - 1kg", rating: 4.3 },

  // Telas
  { id: 13, name: "Tela hex pinteiro 1x24x1,00x50MT F24", price: 280.00, weight: 15, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal pinteiro 1x24x1,00x50MT F24", rating: 4.6 },
  { id: 14, name: "Tela hex pinteiro 1,50Mx50M F24", price: 385.00, weight: 18, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal pinteiro 1,50Mx50M F24", rating: 4.7 },
  { id: 15, name: "Tela hex galinheiro 1,5Mx50M F23", price: 305.00, weight: 20, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal galinheiro 1,5Mx50M F23", rating: 4.7 },
  { id: 16, name: "Tela hex galinheiro 1,80Mx50M F23", price: 310.00, weight: 22, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal galinheiro 1,80Mx50M F23", rating: 4.7 },
  { id: 17, name: "Tela hex mangueirão F18 x 0,80x50MT", price: 330.00, weight: 25, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal mangueirão F18 x 0,80x50MT", rating: 4.8 },
  { id: 18, name: "Tela hex mangueirão 1,20Mx50M F18", price: 500.00, weight: 30, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal mangueirão 1,20Mx50M F18", rating: 4.8 },
  { id: 19, name: "Tela hex mangueirão 1,5Mx50M F18", price: 600.00, weight: 35, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal mangueirão 1,5Mx50M F18", rating: 4.9 },
  { id: 20, name: "Tela hex mangueirão 1,80x50M F16", price: 1000.00, weight: 50, image: "https://images-offstore.map.azionedge.net/compressed/4bb65c058b016a9f9be83fbe8c439c35.webp", category: "telas", description: "Tela hexagonal mangueirão 1,80x50M F16", rating: 4.9 },

  // Ferragens
  { id: 21, name: "Grampo polido p/cerca 1x9 3,75MM", price: 25.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/409bc956785617c1ab0727fa46a58a59.webp", category: "ferragens", description: "Grampo polido para cerca 1x9 - 3,75mm", rating: 4.4 },
  { id: 22, name: "Prego c/ cabeça 15/15MM kg", price: 21.99, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego com cabeça 15/15mm - 1kg", rating: 4.3 },
  { id: 23, name: "Prego c/ cabeça 17/21MM kg", price: 24.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego com cabeça 17/21mm - 1kg", rating: 4.3 },
  { id: 24, name: "Prego c/ cabeça 17/27MM kg", price: 24.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego com cabeça 17/27mm - 1kg", rating: 4.3 },
  { id: 25, name: "Prego c/ cabeça 18/30MM kg", price: 24.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego com cabeça 18/30mm - 1kg", rating: 4.3 },
  { id: 26, name: "Prego c/ cabeça 19/36MM kg", price: 24.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego com cabeça 19/36mm - 1kg", rating: 4.3 },
  { id: 27, name: "Prego 22/42 kg", price: 30.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego 22/42 - 1kg", rating: 4.4 },
  { id: 28, name: "Prego 22/48 kg", price: 30.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego 22/48 - 1kg", rating: 4.4 },
  { id: 29, name: "Prego 24/60 kg", price: 30.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego 24/60 - 1kg", rating: 4.4 },
  { id: 30, name: "Prego 25/72 kg", price: 30.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego 25/72 - 1kg", rating: 4.4 },
  { id: 31, name: "Prego 26/72 kg", price: 30.00, weight: 1, image: "https://images-offstore.map.azionedge.net/compressed/4008abac5bac04234c60b40bde6179f4.webp", category: "ferragens", description: "Prego 26/72 - 1kg", rating: 4.4 },
  // Vernizes
{ id: 32, name: "Verniz copal bril 3,6LT INC", price: 130.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_copal.webp", category: "verniz", description: "Verniz copal brilhante 3,6LT INC", rating: 4.6 },
{ id: 33, name: "Verniz extrarrápido bril 3,6LT imbuia", price: 180.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_extrarrapido.webp", category: "verniz", description: "Verniz extrarrápido brilhante 3,6LT imbuia", rating: 4.7 },
{ id: 34, name: "Verniz extrarrápido bril 3,6LT mogno", price: 180.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_extrarrapido.webp", category: "verniz", description: "Verniz extrarrápido brilhante 3,6LT mogno", rating: 4.7 },
{ id: 35, name: "Verniz extrarrápido bril 3,6LT nogueira", price: 180.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_extrarrapido.webp", category: "verniz", description: "Verniz extrarrápido brilhante 3,6LT nogueira", rating: 4.7 },
{ id: 36, name: "Verniz extrarrápido bril 3,6LT cedro", price: 180.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_extrarrapido.webp", category: "verniz", description: "Verniz extrarrápido brilhante 3,6LT cedro", rating: 4.7 },
{ id: 37, name: "Verniz stain INC 3,6LT", price: 210.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_stain.webp", category: "verniz", description: "Verniz stain INC 3,6LT", rating: 4.8 },
{ id: 38, name: "Verniz osmocolor stain 3,6LT", price: 300.00, weight: 3.6, image: "https://images-offstore.map.azionedge.net/compressed/verniz_osmocolor.webp", category: "verniz", description: "Verniz osmocolor stain 3,6LT", rating: 4.9 },

// Dobradiças
{ id: 39, name: "Dobradiça galvanizada ferradura N1\"", price: 25.00, weight: 0.2, image: "https://images-offstore.map.azionedge.net/compressed/dobradiça.webp", category: "ferragens", description: "Dobradiça galvanizada ferradura N1\"", rating: 4.5 },
{ id: 40, name: "Dobradiça galvanizada ferradura N2\"", price: 30.00, weight: 0.3, image: "https://images-offstore.map.azionedge.net/compressed/dobradiça.webp", category: "ferragens", description: "Dobradiça galvanizada ferradura N2\"", rating: 4.5 },
{ id: 41, name: "Dobradiça galvanizada ferradura N3\"", price: 35.00, weight: 0.4, image: "https://images-offstore.map.azionedge.net/compressed/dobradiça.webp", category: "ferragens", description: "Dobradiça galvanizada ferradura N3\"", rating: 4.6 },

// Madeirite cola branca
{ id: 42, name: "Madeirite cola branca 2,20x1,10 05MM", price: 40.00, weight: 10, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_colabranca.webp", category: "madeirite", description: "Madeirite cola branca 2,20x1,10 05MM", rating: 4.6 },
{ id: 43, name: "Madeirite cola branca 2,20x1,10 08MM", price: 55.00, weight: 15, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_colabranca.webp", category: "madeirite", description: "Madeirite cola branca 2,20x1,10 08MM", rating: 4.6 },
{ id: 44, name: "Madeirite cola branca 2,20x1,10 10MM", price: 85.00, weight: 20, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_colabranca.webp", category: "madeirite", description: "Madeirite cola branca 2,20x1,10 10MM", rating: 4.7 },
{ id: 45, name: "Madeirite cola branca 2,20x1,10 12MM", price: 95.00, weight: 25, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_colabranca.webp", category: "madeirite", description: "Madeirite cola branca 2,20x1,10 12MM", rating: 4.7 },
{ id: 46, name: "Madeirite cola branca 2,20x1,10 14MM", price: 115.00, weight: 30, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_colabranca.webp", category: "madeirite", description: "Madeirite cola branca 2,20x1,10 14MM", rating: 4.7 },

// Madeirite plastificado
{ id: 47, name: "Madeirite plastificado 2,20x1,10 10MM", price: 105.00, weight: 25, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_plastificado.webp", category: "madeirite", description: "Madeirite plastificado 2,20x1,10 10MM", rating: 4.7 },
{ id: 48, name: "Madeirite plastificado 2,20x1,10 12MM", price: 125.00, weight: 30, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_plastificado.webp", category: "madeirite", description: "Madeirite plastificado 2,20x1,10 12MM", rating: 4.7 },
{ id: 49, name: "Madeirite plastificado 2,20x1,10 14MM", price: 140.00, weight: 35, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_plastificado.webp", category: "madeirite", description: "Madeirite plastificado 2,20x1,10 14MM", rating: 4.8 },
{ id: 50, name: "Madeirite plastificado 2,20x1,10 17MM", price: 160.00, weight: 40, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_plastificado.webp", category: "madeirite", description: "Madeirite plastificado 2,20x1,10 17MM", rating: 4.8 },
{ id: 51, name: "Madeirite plastificado 2,20x1,10 19MM", price: 180.00, weight: 45, image: "https://images-offstore.map.azionedge.net/compressed/madeirite_plastificado.webp", category: "madeirite", description: "Madeirite plastificado 2,20x1,10 19MM", rating: 4.9 },
  }


  // Vernizes, madeirites e dobradiças seguem o mesmo padrão...
];


];

const categories = [
  { value: '', label: 'Todas as Categorias' },
  { value: 'arames', label: 'Arames' },
  { value: 'telas', label: 'Telas' },
  { value: 'ferragens', label: 'Ferragens' },
  { value: 'verniz', label: 'Verniz' },
  { value: 'madeirite', label: 'Madeirite' },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { currentUser } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Group products by category for organized display
  const productSections = [
    {
      title: 'Arames',
      categories: ['arames'],
      products: products.filter(p => p.category === 'arames')
    },
    {
      title: 'Telas',
      categories: ['telas'],
      products: products.filter(p => p.category === 'telas')
    },
    {
      title: 'Ferragens',
      categories: ['ferragens'],
      products: products.filter(p => p.category === 'ferragens')
    },
    {
      title: 'Verniz',
      categories: ['verniz'],
      products: products.filter(p => p.category === 'verniz')
    },
    {
      title: 'Madeirite',
      categories: ['madeirite'],
      products: products.filter(p => p.category === 'madeirite')
    }
  ];

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
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addItem(product);
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
        {/* Show organized sections when no filters are applied */}
        {!searchTerm && !selectedCategory ? (
          <div className="space-y-12">
            {productSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-emerald-600 pb-2">
                  {section.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {section.products.map((product) => (
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
                        
                        {/* Weight */}
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-gray-500">
                            Peso: <strong>{product.weight}kg</strong>
                          </span>
                        </div>
                        
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
              </div>
            ))}
          </div>
        ) : (
          /* Show filtered results when search or category filter is applied */
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
                  
                  {/* Weight */}
                  <div className="flex items-center mb-3">
                    <span className="text-sm text-gray-500">
                      Peso: <strong>{product.weight}kg</strong>
                    </span>
                  </div>
                  
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
        )}

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