import React from 'react';
import { Trees, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Trees className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">RUANN EUCALIPTOS</span>
            </div>
            <p className="text-gray-300 mb-4">
              Fornecemos eucalipto de alta qualidade com compromisso com a sustentabilidade 
              e excelência no atendimento. Produtos selecionados para suas necessidades.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">(61) 99991-0956</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">contato@ruanneucaliptos.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">São Sebastião - DF</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <div className="space-y-2">
              <a href="/products" className="block text-gray-300 hover:text-emerald-400 transition-colors">
               
              </a>
              <a href="/about" className="block text-gray-300 hover:text-emerald-400 transition-colors">
               
              </a>
              <a href="/contact" className="block text-gray-300 hover:text-emerald-400 transition-colors">
               
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 RUANN EUCALIPTOS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;