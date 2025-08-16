import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const whatsappNumber = "556199910956";

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de mais informações sobre os produtos.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      title: "Telefone",
      info: "(61) 99991-0956",
      action: () => window.open("tel:6199910956")
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-emerald-600" />,
      title: "WhatsApp",
      info: "(61) 99991-0956",
      action: handleWhatsAppClick
    },
    {
      icon: <Mail className="h-6 w-6 text-emerald-600" />,
      title: "E-mail",
      info: "contato@ruanneucaliptos.com",
      action: () => window.open("mailto:contato@ruanneucaliptos.com")
    },
    {
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
      title: "Endereço",
      info: "São Sebastião - DF, Brasil",
      action: () => {window.open("https://maps.app.goo.gl/G2gBHXnhRfyugq9x6", "_blank");}
    }
  ];

  const businessHours = [
    { day: "Segunda a Sexta", hours: "08:00 - 18:00" },
    { day: "Sábado", hours: "08:00 - 12:00" },
    { day: "Domingo", hours: "Fechado" }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender você! Entre em contato conosco e faça seu orçamento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Informações de Contato
            </h2>

            <div className="space-y-6 mb-10">
              {contactInfo.map((contact, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={contact.action}
                >
                  {contact.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.title}</h3>
                    <p className="text-gray-600">{contact.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Horário de Funcionamento
                </h3>
              </div>
              <div className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Atendimento Imediato
              </h3>
              <p className="text-gray-600 mb-4">
                Para um atendimento mais rápido, entre em contato via WhatsApp. 
                Respondemos em poucos minutos!
              </p>
              <button 
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Conversar no WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Nossa Localização
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.700934849839!2d-47.7566452!3d-15.9247312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a1f01829c77a3%3A0x74ad726cf411a35f!2sRuann%20Eucaliptos!5e0!3m2!1spt-BR!2sbr!4v1755309671556!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></iframe>
            </div>

            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Como Chegar
              </h3>
              <p className="text-gray-600 mb-4">
                Estamos localizados em São Sebastião, Distrito Federal, em uma região 
                de fácil acesso, próxima às principais rodovias.
              </p>
              <p className="text-gray-600">
                <strong>Dica:</strong> Entre em contato conosco para receber as coordenadas 
                exatas e orientações detalhadas de como chegar.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl font-bold mb-2">DF</div>
            <div className="text-gray-600">Atendemos Todo o Distrito Federal</div>
          </div>
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl font-bold mb-2">24/7</div>
            <div className="text-gray-600">Atendimento via WhatsApp</div>
          </div>
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl font-bold mb-2">100%</div>
            <div className="text-gray-600">Garantia de Qualidade</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;