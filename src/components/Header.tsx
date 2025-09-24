import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trees, User, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { getItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'INICIO', path: '/' },
    { name: 'PRODUTOS', path: '/products' },
    { name: 'SOBRE', path: '/about' },
    { name: 'DEPOIMENTOS', path: '/testimonials' },
    { name: 'CONTATO', path: '/contact' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleCartClick = () => {
    if (currentUser) {
      setIsCartOpen(true);
    } else {
      setShowLoginPrompt(true);
    }
  };
  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp" 
              alt="RUANN EUCALIPTOS Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">RUANN EUCALIPTOS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname === item.path
                    ? 'text-emerald-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {/* Cart Icon */}
                <button
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {getItemCount()}
                    </span>
                  )}
                </button>
                <span className="text-sm text-gray-700">
                  Olá, {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Cart Icon for non-logged users */}
                <button
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {getItemCount()}
                    </span>
                  )}
                </button>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Entrar</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart Icon - Only show if user is logged in */}
            {currentUser && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getItemCount()}
                  </span>
                )}
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-emerald-600"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname === item.path
                    ? 'text-emerald-600'
                    : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {currentUser ? (
              <div className="py-2">
                <span className="block text-sm text-gray-700 mb-2">
                  Olá, {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="py-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Entrar</span>
                </Link>
              </div>
            )}
            {/* Mobile Cart Icon */}
            <button
              onClick={handleCartClick}
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getItemCount()}
                </span>
              )}
            </button>
          </nav>
        )}
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
     {/* Login Prompt Modal */}
     {showLoginPrompt && (
       <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
           <div className="text-center">
             <ShoppingCart className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-gray-900 mb-2">
               Acesse sua conta
             </h3>
             <p className="text-gray-600 mb-6">
               Para visualizar seu carrinho e finalizar pedidos, você precisa estar logado.
             </p>
             
             <div className="space-y-3">
               <Link
                 to="/login"
                 onClick={() => setShowLoginPrompt(false)}
                 className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors block text-center"
               >
                 Fazer Login
               </Link>
               
               <Link
                 to="/register"
                 onClick={() => setShowLoginPrompt(false)}
                 className="w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 px-4 rounded-lg font-semibold transition-colors block text-center"
               >
                 Criar Conta
               </Link>
               
               <button
                 onClick={() => setShowLoginPrompt(false)}
                 className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors"
               >
                 Continuar navegando
               </button>
             </div>
           </div>
         </div>
       </div>
     )}
    </header>
  );
};

export default Header;