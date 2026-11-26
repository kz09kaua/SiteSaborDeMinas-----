import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useScrollAnimation, fadeInUp } from '../hooks/useScrollAnimation';

// ──────────────────────────────────────
// Imagens dos produtos
// ──────────────────────────────────────
const IMG = {
  hero: '/images/products-hero.jpg',
  beefCarcass: '/images/beef-carcass.jpg',
  porkCarcass: '/images/pork-carcass.jpg',
  halfCarcass: '/images/half-carcass.jpg',
  coldStorage: '/images/cold-storage.jpg',
  qualityBg: '/images/quality-bg.jpg',
};

// ──────────────────────────────────────
// Variants minimalistas
// ──────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ──────────────────────────────────────
// Dados dos produtos
// ──────────────────────────────────────
const products = [
  {
    name: 'Carcaça Bovina Inteira',
    description:
      'Carcaça bovina refrigerada, proveniente de animais selecionados, com gordura de cobertura uniforme e excelente marmoreio.',
    specs: ['Peso médio: 250–320 kg', 'Resfriamento: 24h em câmara fria', 'Embalagem: A vácuo ou convencional'],
    image: IMG.beefCarcass,
    highlight: 'Premium',
    color: 'from-red-600 to-rose-700',
  },
  {
    name: 'Carcaça Suína Inteira',
    description:
      'Carcaça suína de alta qualidade, tipificação uniforme, ideal para açougues e supermercados que prezam por consistência.',
    specs: ['Peso médio: 80–110 kg', 'Resfriamento controlado', 'Tipificação padronizada'],
    image: IMG.porkCarcass,
    highlight: 'Alta demanda',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Meia Carcaça Bovina',
    description:
      'Meia carcaça serrada com precisão, perfeita para estabelecimentos que trabalham com desossa própria e cortes especiais.',
    specs: ['Peso médio: 125–160 kg', 'Serra de fita — corte limpo', 'Disponível diariamente'],
    image: IMG.halfCarcass,
    highlight: 'Flexível',
    color: 'from-red-500 to-amber-500',
  },
  {
    name: 'Quarto de Carcaça',
    description:
      'Quartos dianteiros e traseiros separados, facilitando logística e manipulação em açougues de menor porte.',
    specs: ['Dianteiro / Traseiro', 'Embalagem individual', 'Ideal para espaços compactos'],
    image: IMG.beefCarcass,
    highlight: 'Praticidade',
    color: 'from-rose-600 to-pink-600',
  },
];

const differentials = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Inspeção Sanitária',
    desc: 'Todas as carcaças passam por rigorosa inspeção antes da liberação.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Cadeia de Frio',
    desc: 'Resfriamento imediato e transporte refrigerado até o destino final.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Consistência',
    desc: 'Padronização rigorosa para garantir uniformidade em cada entrega.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Agilidade',
    desc: 'Entregas programadas com pontualidade para seu negócio não parar.',
  },
];

// ──────────────────────────────────────
// PÁGINA PRINCIPAL
// ──────────────────────────────────────
const Products = () => {
  const [heroControls, heroRef] = useScrollAnimation(0.1);
  const [productsControls, productsRef] = useScrollAnimation(0.1);
  const [diffControls, diffRef] = useScrollAnimation(0.15);
  const [processControls, processRef] = useScrollAnimation(0.12);
  const [ctaControls, ctaRef] = useScrollAnimation(0.2);

  // Parallax hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.25]);
  const springHeroY = useSpring(heroY, { stiffness: 50, damping: 30 });

  return (
    <div className="bg-white text-gray-800 antialiased">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: springHeroY, opacity: heroOpacity }}
        >
          <img
            src={IMG.hero}
            alt="Nossos Produtos"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-3xl"
          initial="hidden"
          animate={heroControls}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeIn}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-red-300"
          >
            Nossos Produtos
          </motion.p>
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
          >
            Carcaças de{' '}
            <span className="font-semibold">alto padrão</span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-gray-200 font-light max-w-xl mx-auto"
          >
            Fornecemos exclusivamente carcaças refrigeradas para açougues e supermercados exigentes.
          </motion.p>
        </motion.div>

        {/* Scroll indicator sutil */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════ LISTA DE PRODUTOS ═══════════════ */}
      <section ref={productsRef} className="py-24 md:py-32">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate={productsControls}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-20" variants={fadeIn}>
            <span className="text-red-500 text-sm font-medium tracking-[0.2em] uppercase block mb-3">
              Catálogo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
              Nossas{' '}
              <span className="font-semibold text-red-600">especialidades</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto text-lg font-light">
              Produtos desenvolvidos para atender as necessidades do seu estabelecimento com excelência.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
              >
                {/* Imagem */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-4 bg-gradient-to-r ${product.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide shadow-lg`}
                  >
                    {product.highlight}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-5 font-light">
                    {product.description}
                  </p>

                  {/* Especificações */}
                  <div className="space-y-2">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ DIFERENCIAIS ═══════════════ */}
      <section
        ref={diffRef}
        className="py-24 md:py-32 bg-gray-50 border-y border-gray-100"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate={diffControls}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="text-red-500 text-sm font-medium tracking-[0.2em] uppercase block mb-3">
              Por que nos escolher
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
              Diferenciais que{' '}
              <span className="font-semibold text-red-600">entregam valor</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm border border-gray-100 group-hover:border-red-200 group-hover:text-red-600 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ PROCESSO ═══════════════ */}
      <section ref={processRef} className="py-24 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate={processControls}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="text-red-500 text-sm font-medium tracking-[0.2em] uppercase block mb-3">
              Nosso processo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
              Da origem ao{' '}
              <span className="font-semibold text-red-600">seu cliente</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Seleção rigorosa',
                desc: 'Animais de procedência comprovada, selecionados por padrões de qualidade e sanidade.',
              },
              {
                step: '02',
                title: 'Abate humanizado',
                desc: 'Processo conduzido com rigor técnico, respeitando todas as normas de bem-estar animal.',
              },
              {
                step: '03',
                title: 'Resfriamento controlado',
                desc: 'Carcaças resfriadas por 24 horas em câmaras de última geração para garantir textura e segurança.',
              },
              {
                step: '04',
                title: 'Expedição refrigerada',
                desc: 'Transporte em veículos com controle de temperatura, preservando a cadeia de frio até o destino.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="flex gap-6 items-start group"
              >
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-semibold text-lg md:text-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section ref={ctaRef} className="relative py-28 md:py-36 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMG.coldStorage})`,
            filter: 'brightness(0.35)',
          }}
        />
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <motion.div
          className="max-w-3xl mx-auto px-4 text-center relative z-10 text-white"
          initial="hidden"
          animate={ctaControls}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-5xl font-light mb-6 leading-tight"
          >
            Pronto para abastecer seu negócio com{' '}
            <span className="font-semibold text-red-300">qualidade superior</span>?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-gray-200 mb-10 max-w-xl mx-auto text-lg font-light"
          >
            Solicite uma cotação e descubra como nossas carcaças podem elevar o padrão do seu açougue ou supermercado.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-block bg-red-600 hover:bg-red-500 text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-300"
            >
              Solicitar Cotação
            </a>
            <a
              href="tel:+5531999999999"
              className="inline-block border border-white/40 hover:border-white text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-300"
            >
              Ligar Agora
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Products;