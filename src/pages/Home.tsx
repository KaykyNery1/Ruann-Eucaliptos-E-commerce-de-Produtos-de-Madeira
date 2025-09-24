import React from 'react';
import { Truck, Award, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const whatsappNumber = "556199910956";
  
  const handleWhatsAppClick = (product: string) => {
    const message = `Olá! Tenho interesse no produto: ${product}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const highlights = [
    {
      icon: <Truck className="h-8 w-8 text-emerald-600" />,
      title: "Entrega Rápida",
      description: "Entrega ágil na região do Distrito Federal"
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Alta Qualidade",
      description: "Produtos selecionados com rigoroso controle de qualidade"
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Atendimento Personalizado",
      description: "Suporte direto e personalizado para suas necessidades"
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      title: "Durabilidade Garantida",
      description: "Madeiras resistentes que oferecem longa vida útil para seu projeto."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://i.imgur.com/Zc7A4k7.png)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-emerald-400">RUANN EUCALIPTOS</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 font-semibold">
            Eucalipto resistente e de confiança para todo projeto.
          </p>
          <button 
            onClick={() => handleWhatsAppClick("Informações gerais")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto touch-manipulation"
          >
            <span>Fale Conosco</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Business Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Diferenciais
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Qualidade, confiança e agilidade para cada projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Como funciona a entrega?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Realizamos entregas em todo o Distrito Federal. Entre em contato para verificar disponibilidade e prazos.
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Quais formas de pagamento são aceitas?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Aceitamos PIX, dinheiro, cartão de débito e crédito. Consulte as opções disponíveis no momento da compra.
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Como garantem a qualidade dos produtos?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Todos os nossos produtos passam por rigoroso controle de qualidade, garantindo que atendam aos mais altos padrões.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
