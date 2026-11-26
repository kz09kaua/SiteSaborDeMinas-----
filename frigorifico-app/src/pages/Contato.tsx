import { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// ──────────────────────────────────────
// Mídia
// ──────────────────────────────────────
const IMG = {
  hero: '/images/contact-hero.jpg',
  map: '/images/map-placeholder.jpg',
};

// ──────────────────────────────────────
// Variants de Animação
// ──────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ──────────────────────────────────────
// Dados de Contato
// ──────────────────────────────────────
const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Unidade Industrial',
    details: ['Rodovia BR-040, Km 680', 'Zona Rural — Minas Gerais'],
    action: { text: 'Ver no mapa', href: '#mapa' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Central de Vendas',
    details: ['(31) 99999-9999 (WhatsApp)', '(31) 3333-3333 (Fixo)'],
    action: { text: 'Ligar para vendas', href: 'tel:+5531999999999' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Atendimento Comercial',
    details: ['comercial@sabordeminas.com.br', 'contato@sabordeminas.com.br'],
    action: { text: 'Enviar e-mail', href: 'mailto:comercial@sabordeminas.com.br' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Expedição & Pedidos',
    details: ['Segunda a Sexta: 06h às 18h', 'Sábado: 06h às 12h'],
    action: { text: 'Solicitar cotação', href: '#formulario' },
  },
];

// ──────────────────────────────────────
// Perguntas Frequentes (FAQ)
// ──────────────────────────────────────
const faqItems = [
  {
    q: 'Quais tipos de carcaças o Frigorífico Sabor de Minas fornece?',
    a: 'Somos especializados exclusivamente no abate e fornecimento de carcaças bovinas e suínas de alta qualidade (inteiras ou meias-carcaças), preparadas para abastecer açougues, frigoríficos, redes de supermercados e distribuidores.',
  },
  {
    q: 'Como funciona a logística e a manutenção da cadeia de frio?',
    a: 'Possuímos frota própria com controle rígido de temperatura refrigerada. Nossas entregas são programadas com agilidade para garantir que o produto chegue ao seu estabelecimento mantendo o frescor e os mais altos padrões sanitários.',
  },
  {
    q: 'Qual é a área de cobertura para entregas?',
    a: 'Atendemos todo o estado de Minas Gerais com frota própria. Para entregas em estados vizinhos ou regiões limítrofes, consulte nossa equipe comercial para alinhar prazos e volumes mínimos.',
  },
  {
    q: 'O frigorífico possui certificação de inspeção sanitária?',
    a: 'Sim. Todos os nossos processos operacionais de abate e expedição atendem rigorosamente às exigências dos órgãos de fiscalização sanitária, garantindo rastreabilidade e segurança alimentar total.',
  },
];

// ──────────────────────────────────────
// PÁGINA PRINCIPAL
// ──────────────────────────────────────
const Contact = () => {
  const [heroControls, heroRef] = useScrollAnimation(0.1);
  const [infoControls, infoRef] = useScrollAnimation(0.15);
  const [formControls, formRef] = useScrollAnimation(0.15);
  const [mapControls, mapRef] = useScrollAnimation(0.15);
  const [faqControls, faqRef] = useScrollAnimation(0.12);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Cotação de Carcaças Bovinas',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado do Accordion (FAQ)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Cotação de Carcaças Bovinas',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  // Parallax no Hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.2]);
  const springHeroY = useSpring(heroY, { stiffness: 50, damping: 30 });

  return (
    <div className="bg-slate-50 text-gray-800 antialiased overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-gray-950"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: springHeroY, opacity: heroOpacity }}
        >
          <img
            src={IMG.hero}
            alt="Atendimento Frigorífico Sabor de Minas"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
        </motion.div>
        
        {/* Overlays de gradiente para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-gray-950/40 to-gray-950/80 z-[1]" />

        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-10"
          initial="hidden"
          animate={heroControls}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase bg-red-600/30 text-red-300 border border-red-500/30 backdrop-blur-md">
              Frigorífico Sabor de Minas
            </span>
          </motion.div>
          
          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight mb-6 leading-[1.1]"
          >
            Sua parceira em <br className="hidden sm:inline" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-red-300">
              carcaças de excelência
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-base sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Atendimento direto para supermercados, açougues e distribuidores. Qualidade garantida do abate à entrega.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════ CARDS DE INFORMAÇÕES DE CONTATO ═══════════════ */}
      <section ref={infoRef} className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={infoControls}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              className="group bg-white/90 backdrop-blur-md p-7 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 mb-6 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                <div className="space-y-1 mb-6">
                  {item.details.map((line, i) => (
                    <p key={i} className="text-gray-600 text-sm font-normal leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <a
                href={item.action.href}
                className="inline-flex items-center gap-2 text-red-600 text-sm font-semibold group-hover:text-red-700 transition-colors"
              >
                {item.action.text}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ FORMULÁRIO DE CONTATO & ATENDIMENTO ═══════════════ */}
      <section ref={formRef} id="formulario" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={formControls}
          variants={staggerContainer}
          className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden grid lg:grid-cols-12"
        >
          {/* Lado Esquerdo - Destaques Comerciais B2B */}
          <motion.div 
            variants={fadeIn}
            className="lg:col-span-5 bg-gradient-to-br from-gray-900 via-gray-900 to-red-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-red-400 text-xs font-semibold tracking-widest uppercase block mb-3">
                Atendimento Comercial Direct
              </span>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight mb-6">
                Solicite uma cotação para o seu <span className="font-semibold text-red-400">estabelecimento</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
                Preencha os dados e nossa equipe comercial entrará em contato para apresentar tabelas de preços, programação de abates e condições de entrega.
              </p>
            </div>

            <div className="relative z-10 space-y-6 pt-8 border-t border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-red-400 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Controle de Qualidade Sanitarista</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Abate padronizado com selo de inspeção oficial.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-red-400 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Cadeia de Frio Garantida</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Frota refrigerada para preservação total do produto.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito - O Formulário */}
          <motion.div variants={fadeIn} className="lg:col-span-7 p-8 sm:p-12 bg-white">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Fale com nossos consultores</h3>
            <p className="text-sm text-gray-500 mb-8">Envie sua dúvida ou solicitação de cotação.</p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-8"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-emerald-900 mb-2">Mensagem enviada!</h4>
                  <p className="text-emerald-700 text-sm max-w-md mx-auto">
                    Agradecemos o contato. Nossa equipe de vendas do Frigorífico Sabor de Minas responderá em breve.
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Nome / Razão Social
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Mercado Sabor / João Silva"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(31) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contato@empresa.com.br"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Interesse Principal
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      >
                        <option value="Cotação de Carcaças Bovinas">Cotação — Carcaças Bovinas</option>
                        <option value="Cotação de Carcaças Suínas">Cotação — Carcaças Suínas</option>
                        <option value="Serviços de Abate">Prestação de Serviços de Abate</option>
                        <option value="Dúvidas e Outros">Outros Assuntos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Sua Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Informe detalhes como volume semanal/mensal estimado, cidade de entrega ou dúvidas..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-red-600/20 hover:shadow-red-600/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando mensagem...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ MAPA DE LOCALIZAÇÃO ═══════════════ */}
      <section ref={mapRef} id="mapa" className="py-12 pb-24">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate={mapControls}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeIn}>
            <span className="text-red-600 text-xs font-semibold tracking-widest uppercase block mb-2">
              Localização Estratégica
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900">
              Nossa <span className="font-semibold text-red-600">planta industrial</span>
            </h2>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 aspect-[16/9] md:aspect-[21/9] bg-gray-100 group"
          >
            <img
              src={IMG.map}
              alt="Mapa de localização do Frigorífico Sabor de Minas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/40 shadow-lg max-w-md">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                  Frigorífico Sabor de Minas
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Rodovia BR-040, Km 680 — Zona Rural, Minas Gerais
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  Abrir rotas no Google Maps
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ FAQ INTERATIVO (ACCORDION) ═══════════════ */}
      <section ref={faqRef} className="py-24 bg-gray-950 text-white relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          animate={faqControls}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="text-red-400 text-xs font-semibold tracking-widest uppercase block mb-3">
              Perguntas Frequentes
            </span>
            <h2 className="text-3xl sm:text-5xl font-light">
              Tire suas <span className="font-semibold text-red-400">dúvidas</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors hover:border-gray-700"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-semibold text-base sm:text-lg text-gray-100">
                      {item.q}
                    </span>
                    <span className={`p-2 rounded-full bg-gray-800 text-red-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-gray-400 text-sm sm:text-base leading-relaxed border-t border-gray-800/50 pt-4 font-light">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
            Atendimento imediato via <span className="font-semibold text-red-600">Telefone ou WhatsApp</span>
          </h3>
          <p className="text-gray-500 font-light mb-8 max-w-lg mx-auto text-sm sm:text-base">
            Fale diretamente com nossa mesa de vendas para agendar entregas ou consultar lotes disponíveis.
          </p>

          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (31) 99999-9999
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;