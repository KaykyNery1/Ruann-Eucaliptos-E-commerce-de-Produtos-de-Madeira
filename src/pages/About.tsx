import React from 'react';
import { Award, Users, Leaf, Clock } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Qualidade",
      description: "Produtos selecionados com rigoroso controle de qualidade"
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      title: "Resistência Natural",
      description: "Durabilidade que só a madeira de eucalipto pode oferecer"
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Atendimento Personalizado",
      description: "Relacionamento próximo e atendimento dedicado"
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      title: "Confiabilidade",
      description: "Compromisso com prazos e qualidade dos produtos"
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre a RUANN EUCALIPTOS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Qualidade, confiança e compromisso com a excelência.
          </p>
        </div>

        {/* Hero Image and Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <img 
              src="https://lh3.googleusercontent.com/p/AF1QipMTGlzwtBQQRh_U07Np8UgYzNGgpZqejvOdF3k=s680-w680-h510-rw"
              alt="Fazenda de eucalipto"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Quem Somos
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              A Ruann Eucaliptos é uma empresa dedicada ao fornecimento de produtos de eucalipto de alta qualidade. 
              Localizada em São Sebastião, no Distrito Federal, nossa missão é oferecer produtos que atendam às 
              necessidades de nossos clientes com excelência e confiança.
            </p>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Construímos nossa reputação baseada na confiança, qualidade e relacionamento próximo com nossos 
              clientes.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
             Oferecemos uma ampla variedade de produtos de madeira, sempre priorizando a qualidade e a satisfação dos nossos clientes.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600">
              Os princípios que guiam nosso trabalho diário
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

  
};

export default About;