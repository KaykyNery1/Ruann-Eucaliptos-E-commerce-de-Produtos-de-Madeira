import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Enmanuel Matute",
      photo: "https://lh3.googleusercontent.com/a-/ALV-UjV5fA5ZHBEtqm69khUKqfOgMPar3Mm1Bjp-sCfnadvdb2xmCbUoKQ=w72-h72-p-rp-mo-ba5-br100",
      rating: 5,
      comment: "Bom atendimento, promoções boas.",
      location: "São Sebastião, Brasília - DF"
    },
    {
      name: "Maria Fernanda",
      photo: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      rating: 5,
      comment: "Compro lenha há mais de 2 anos. Nunca tive problemas. Produto de primeira qualidade e preço justo.",
      location: "Taguatinga - DF"
    },
    {
      name: "João Pereira",
      photo: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
      rating: 5,
      comment: "As toras que comprei foram perfeitas para minha obra. Material resistente e bem tratado. Recomendo!",
      location: "São Sebastião - DF"
    },
    {
      name: "Ana Carolina",
      photo: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      rating: 5,
      comment: "Atendimento excepcional! Tiraram todas as dúvidas pelo WhatsApp e a entrega foi super rápida.",
      location: "Gama - DF"
    },
    {
      name: "Roberto Santos",
      photo: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
      rating: 5,
      comment: "Mourões de excelente qualidade! Instalei minha cerca há 1 ano e estão perfeitos até hoje.",
      location: "Planaltina - DF"
    },
    {
      name: "Luciana Oliveira",
      photo: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      rating: 5,
      comment: "O carvão vegetal é ótimo para churrasco. Acende fácil e dura bastante. Família toda aprova!",
      location: "Águas Claras - DF"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Depoimentos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que nossos clientes falam sobre nossos produtos e serviços
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
            <div className="text-gray-600">Clientes Atendidos</div>
          </div>
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-emerald-600 mb-2">4.9★</div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
            <div className="text-gray-600">Qualidade Garantida</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Customer Info */}
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.photo} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-600 leading-relaxed">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gray-50 p-12 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Seja Nosso Próximo Cliente Satisfeito!
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Entre em contato conosco e descubra por que somos a escolha preferida para produtos de eucalipto
          </p>
          <button 
            onClick={() => {
              const whatsappNumber = "556199910956";
              const message = "Olá! Gostaria de conhecer melhor seus produtos.";
              const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
          >
            Fale Conosco pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;