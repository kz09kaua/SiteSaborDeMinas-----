import {
  FaPhone,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaGlobe,
  FaMapPin,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

// Dados centralizados para facilitar futuras edições
const CONTACT = {
  phone: "(32) 3721-4479",
  email: "controladoria@fsminas.com.br",
  address: {
    line1: "Fazenda Divisório, Zona Rural",
    line2: "Muriaé - MG | CEP: 36880-000",
  },
  schedule: {
    weekdays: "Seg a Sex: 07h - 17h",
    saturday: "Sábado: 07h - 11h",
    sunday: "Domingo: Fechado",
  },
  social: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    whatsapp: "#", // <--- ADICIONADO
  },
  website: "https://www.fsminas.com.br",
  developer: "kz09",
  developerEmail: "kauaf4316@gmail.com",
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-gray-900 to-gray-800 text-white border-t border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Grid Principal – agora com 4 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Coluna 1 – Contato */}
          <address className="flex flex-col space-y-4 not-italic">
            <h3 className="font-bold text-sm uppercase tracking-wide flex items-center">
              <span className="text-red-500 mr-2">◆</span>
              Fale Conosco
            </h3>

            {/* Telefone */}
            <div className="flex items-start space-x-3">
              <FaPhone
                className="text-red-500 mt-0.5"
                size={12}
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Comercial</p>
                <a
                  href={`tel:+55${CONTACT.phone.replace(/\D/g, "")}`}
                  className="text-xs text-gray-300 hover:text-red-400 transition"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
              <FaEnvelope
                className="text-red-500 mt-0.5"
                size={12}
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] text-gray-400 font-medium">E-mail</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-xs text-gray-300 hover:text-red-400 transition break-all"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </address>

          {/* Coluna 2 – Localização */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wide flex items-center">
              <span className="text-red-500 mr-2">◆</span>
              Localização
            </h3>
            <div className="flex items-start space-x-3">
              <FaMapPin
                className="text-red-500 mt-0.5"
                size={12}
                aria-hidden="true"
              />
              <p className="text-xs text-gray-300 leading-relaxed">
                {CONTACT.address.line1}
                <br />
                {CONTACT.address.line2}
              </p>
            </div>
          </div>

          {/* Coluna 3 – Atendimento */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wide flex items-center">
              <span className="text-red-500 mr-2">◆</span>
              Atendimento
            </h3>
            <div className="flex items-start space-x-3">
              <FaClock
                className="text-red-500 mt-0.5"
                size={12}
                aria-hidden="true"
              />
              <div>
                <p className="text-xs text-gray-300">
                  {CONTACT.schedule.weekdays}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  {CONTACT.schedule.saturday}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {CONTACT.schedule.sunday}
                </p>
              </div>
            </div>
          </div>

          {/* Coluna 4 – Redes Sociais */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wide flex items-center">
              <span className="text-red-500 mr-2">◆</span>
              Redes Sociais
            </h3>
            <div className="flex items-start space-x-3">
              <div className="flex space-x-3">
                <a
                  href={CONTACT.social.instagram}
                  aria-label="Acessar Instagram"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-linear-to-br hover:from-pink-500 hover:to-purple-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href={CONTACT.social.whatsapp}
                  aria-label="Acessar WhatsApp"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-green-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaWhatsapp size={14} />
                </a>
                <a
                  href={CONTACT.social.facebook}
                  aria-label="Acessar Facebook"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaFacebook size={14} />
                </a>
              </div>
            </div>
            {/* Link para o site (opcional, pode ser mantido aqui) */}
            <div className="pt-2">
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-red-400 transition flex items-center space-x-1"
              >
                <FaGlobe size={10} />
                <span>fsminas.com.br</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divisor e Footer Inferior – com crédito do desenvolvedor */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1 text-center md:text-left">
            <span>
              © {currentYear} Frigorífico Sabor de Minas. Todos os direitos
              reservados.
            </span>
          </div>

          {/* Substituído por "Criado por kz09" com link para e-mail */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href={`mailto:${CONTACT.developerEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition flex items-center space-x-2"
            >
              <span>Criado por</span>
              <span className="font-medium text-red-400 hover:text-red-300">
                {CONTACT.developer}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;