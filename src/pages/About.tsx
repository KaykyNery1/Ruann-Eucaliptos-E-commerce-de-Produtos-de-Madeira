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
            Qualidade, sustentabilidade e compromisso com a excelência
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
              Oferecemos lenha, toras, mourões e carvão vegetal, sempre priorizando a qualidade dos produtos 
              e o cuidado com o meio ambiente.
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

        {/* Team Section */}
        <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nosso Compromisso
              </h2>
              <p className="text-xl text-gray-600">
                Dedicação e qualidade em cada produto
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://madezanmadeiras.com.br/files/imagem/1293928295755e71c1de185.36080464.jpg"
                  alt="Equipe da fazenda"
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Qualidade e Sustentabilidade
                </h3>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Nossa equipe é formada por profissionais dedicados que conhecem cada detalhe do processo, 
                  garantindo a qualidade desde a seleção até a entrega do produto final.
                </p>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Utilizamos as melhores práticas para garantir produtos de alta qualidade, sempre respeitando 
                  o meio ambiente e priorizando a sustentabilidade.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Nosso compromisso é com a excelência no atendimento e a total satisfação de nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nossa Missão
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nosso objetivo é ser a escolha preferida para produtos de eucalipto, oferecendo qualidade 
            superior, atendimento personalizado e práticas sustentáveis. Trabalhamos continuamente para 
            superar as expectativas de nossos clientes e contribuir para um futuro mais sustentável.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;