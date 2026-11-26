import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { useScrollAnimation, fadeInUp, fadeInLeft, fadeInRight } from '../hooks/useScrollAnimation';
import { HiOutlineCalendar, HiOutlineUserGroup, HiOutlineTruck, HiOutlineShieldCheck } from 'react-icons/hi';

/* ============================================================
   IMAGENS DE APOIO (substitua pelos caminhos reais em /images/)
   ============================================================ */
const IMG = {
  history: '/public/assets/img-historia.jpg',
  structure: '/public/assets/img-estrutura.jpg',
  quality: '/public/assets/img-qualidade.jpg',
};

/* ============================================================
   VARIANTS
   ============================================================ */
const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const revealText = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 18 },
  },
};

/* ============================================================
   PARTÍCULAS DE FUNDO (usadas no hero e nas seções escuras)
   ============================================================ */
const FloatingParticles = ({ count = 18 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-red-400/40 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40 - Math.random() * 50, 0],
          x: [0, (Math.random() - 0.5) * 30, 0],
          opacity: [0.15, 0.7, 0.15],
          scale: [1, 1.6, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 5,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

/* ============================================================
   CONTADOR ANIMADO (mesmo comportamento da Home)
   ============================================================ */
const AnimatedCounter = ({
  target,
  suffix = '',
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

/* ============================================================
   CARD COM TILT 3D (diferencial visual da página Sobre)
   ============================================================ */
const TiltCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [7, -7]);
  const rotateY = useTransform(x, [-120, 120], [-7, 7]);
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   SEÇÃO ALTERNADA (texto + imagem)
   Tipografia igual à Home: badge "text-red-500 font-semibold text-lg",
   h2 "text-3xl md:text-4xl font-bold text-gray-800", parágrafo "text-gray-600"
   ============================================================ */
const AlternatingSection = ({
  badge,
  title,
  highlight,
  paragraphs,
  image,
  imageAlt,
  reverse = false,
  controls,
  sectionRef,
}: {
  badge: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  controls: any;
  sectionRef: any;
}) => {
  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden bg-white">
      <div
        className={`absolute ${
          reverse ? 'left-0 -translate-x-1/3' : 'right-0 translate-x-1/3'
        } top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-red-50 rounded-full opacity-60 blur-3xl pointer-events-none`}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        animate={controls}
        variants={containerStagger}
      >
        <div
          className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <motion.div variants={reverse ? fadeInRight : fadeInLeft}>
            <motion.span
              className="text-red-500 font-semibold text-lg inline-block"
              variants={revealText}
            >
              {badge}
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6"
              variants={revealText}
            >
              {title} <span className="text-red-600">{highlight}</span>
            </motion.h2>

            <motion.div className="space-y-4" variants={containerStagger}>
              {paragraphs.map((p, i) => (
                <motion.p key={i} className="text-gray-600" variants={revealText}>
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={reverse ? fadeInLeft : fadeInRight}>
            <TiltCard className="rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src={image}
                alt={imageAlt}
                className="w-full h-96 object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ============================================================
   PÁGINA SOBRE
   ============================================================ */
const About = () => {
  const [heroControls, heroRef] = useScrollAnimation(0.1);
  const [historyControls, historyRef] = useScrollAnimation(0.15);
  const [structureControls, structureRef] = useScrollAnimation(0.15);
  const [qualityControls, qualityRef] = useScrollAnimation(0.15);
  const [timelineControls, timelineRef] = useScrollAnimation(0.12);
  const [statsControls, statsRef] = useScrollAnimation(0.15);
  const [ctaControls, ctaRef] = useScrollAnimation(0.2);

  // Parallax no hero (diferente da Home, que usa o vídeo estático)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '35%']);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const springHeroY = useSpring(heroY, { stiffness: 70, damping: 28 });

  // Parallax nas seções escuras
  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ['start end', 'end start'],
  });
  const statsY = useTransform(statsProgress, [0, 1], ['-12%', '12%']);

  const stats = [
    { icon: HiOutlineCalendar, value: 22, suffix: ' anos', label: 'de tradição em Muriaé, desde 2004' },
    { icon: HiOutlineUserGroup, value: 180, suffix: '+', label: 'funcionários diretos na Zona da Mata' },
    { icon: HiOutlineTruck, value: 100, suffix: '%', label: 'frota própria de caminhões frigoríficos' },
    { icon: HiOutlineShieldCheck, value: 3, suffix: 'x', label: 'etapas: abate, desossa e industrializados' },
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* ══════════════ HERO com parallax ══════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          style={{ y: springHeroY, scale: heroScale }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/VideoEmpresa.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <FloatingParticles count={14} />
        <motion.div className="relative z-20 text-center px-4 max-w-4xl" initial="hidden" animate={heroControls} variants={fadeInUp}>
          <motion.span className="text-red-400 font-semibold text-lg inline-block mb-3" variants={fadeInUp}>
            Quem somos
          </motion.span>
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4" variants={fadeInUp}>
            Especialistas em <br />
            <span className="text-red-600">carcaças de qualidade</span>
          </motion.h1>
          <motion.p className="text-lg md:text-2xl text-gray-200 mb-8" variants={fadeInUp}>
            Uma trajetória construída com foco, rigor sanitário e tradição mineira
          </motion.p>
          <motion.a
            href="https://wa.me/553237214479"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white/10 backdrop-blur border border-white/40 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full text-lg transition-colors"
          >
            Fale conosco
          </motion.a>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ══════════════ Seção 1 – Trajetória ══════════════ */}
      <AlternatingSection
        sectionRef={historyRef}
        controls={historyControls}
        badge="Nossa trajetória"
        title="Foco e"
        highlight="especialização"
        paragraphs={[
          'O Frigorífico Sabor de Minas construiu sua reputação com base em um princípio simples: fazer uma coisa e fazê-la com perfeição.',
          'Nossa operação é dedicada ao abate e à venda de carcaças. Ao mantermos o foco apenas nesta etapa essencial, garantimos aos nossos parceiros — açougues e supermercados — uma matéria-prima de padrão impecável.',
          'Investimos continuamente em modernização de instalações e câmaras frias para que cada carcaça entregue atenda aos protocolos mais rigorosos de qualidade e segurança alimentar.',
        ]}
        image={IMG.history}
        imageAlt="Trajetória do frigorífico"
        reverse={false}
      />

      {/* ══════════════ Seção 2 – Estrutura ══════════════ */}
      <AlternatingSection
        sectionRef={structureRef}
        controls={structureControls}
        badge="Infraestrutura"
        title="Instalações de"
        highlight="alto padrão"
        paragraphs={[
          'Nossa planta foi projetada para maximizar eficiência, higiene e conservação, com protocolos rigorosos de biossegurança em cada etapa.',
          'Câmaras frias de grande porte garantem a manutenção da cadeia do frio desde o abate até a expedição, preservando qualidade e frescor.',
          'Entre 2021 e 2022 passamos por um ciclo de expansão que incluiu nova sala de abate e ampliação das câmaras frias.',
        ]}
        image={IMG.structure}
        imageAlt="Câmaras frias e estrutura moderna"
        reverse={true}
      />

      {/* ══════════════ Seção 3 – Qualidade ══════════════ */}
      <AlternatingSection
        sectionRef={qualityRef}
        controls={qualityControls}
        badge="Compromisso"
        title="Qualidade sem"
        highlight="concessões"
        paragraphs={[
          'Cada carcaça passa por inspeção criteriosa do IMA. Nosso compromisso é entregar apenas produtos que atendam aos mais altos padrões sanitários.',
          'Trabalhamos lado a lado com os órgãos de fiscalização, garantindo rastreabilidade e confiança total aos nossos clientes.',
          'O resultado é um produto consistente, fresco e seguro — o alicerce do sucesso do seu açougue ou supermercado.',
        ]}
        image={IMG.quality}
        imageAlt="Controle de qualidade"
        reverse={false}
      />

      {/* ══════════════ Timeline ══════════════ */}
      <section ref={timelineRef} className="py-20 md:py-28 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          animate={timelineControls}
          variants={containerStagger}
        >
          <div className="text-center mb-16">
            <motion.span className="text-red-400 font-semibold text-lg inline-block" variants={revealText}>
              Linha do tempo
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-white mt-2" variants={revealText}>
              Nossa evolução
            </motion.h2>
            <motion.p className="text-gray-400 mt-4 max-w-xl mx-auto" variants={revealText}>
              Uma trajetória de crescimento contínuo e especialização.
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500/50 hidden md:block origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />

            {[
              { year: 'Início', title: 'Fundação', desc: 'Primeiras instalações focadas no atendimento de açougues locais com carcaças de qualidade.', side: 'left' },
              { year: 'Expansão', title: 'Certificações', desc: 'Adequação rigorosa às normativas de inspeção, elevando o padrão de segurança alimentar.', side: 'right' },
              { year: '2021-22', title: 'Modernização', desc: 'Investimento em nova sala de abate e ampliação robusta das câmaras frias.', side: 'left' },
              { year: 'Hoje', title: 'Especialistas', desc: 'Fornecedor de carcaças para supermercados e açougues em todo o estado.', side: 'right' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  item.side === 'right' ? 'md:flex-row-reverse' : ''
                } flex-col md:flex-row`}
                variants={scaleIn}
              >
                <div className={`w-full md:w-5/12 ${item.side === 'right' ? 'md:pr-10' : 'md:pl-10'}`}>
                  <motion.div
                    className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-red-500/60 transition-all duration-300"
                    whileHover={{ scale: 1.03, y: -6 }}
                  >
                    <span className="text-red-400 font-semibold text-sm">{item.year}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                  <motion.div
                    className="w-5 h-5 bg-red-500 rounded-full ring-[6px] ring-[#1a1a1a] shadow-lg shadow-red-500/40"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, delay: idx * 0.12 }}
                  />
                </div>

                <div className="w-0 md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════ Números (visual diferente da Home) ══════════════ */}
      <section ref={statsRef} className="py-20 bg-[#1a1a1a] relative overflow-hidden">
        <FloatingParticles count={16} />
        <motion.div style={{ y: statsY }} className="absolute inset-0 opacity-20 bg-red-900/20" />

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          animate={statsControls}
          variants={containerStagger}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={scaleIn}>
              <TiltCard className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 text-center hover:border-red-500/60 transition-colors duration-300">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-red-500" />
                <p className="text-3xl md:text-4xl font-extrabold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════ CTA final (layout dividido, diferente da Home) ══════════════ */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />

        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10"
          initial="hidden"
          animate={ctaControls}
          variants={containerStagger}
        >
          <motion.div variants={fadeInLeft}>
            <motion.span className="text-red-500 font-semibold text-lg inline-block" variants={revealText}>
              Fale com a gente
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6" variants={revealText}>
              Quer levar qualidade para <span className="text-red-600">seu negócio?</span>
            </motion.h2>
            <motion.p className="text-gray-600 mb-2" variants={revealText}>
              Seja um parceiro Sabor de Minas e ofereça o melhor aos seus clientes.
            </motion.p>
            <motion.p className="text-gray-500 text-sm mb-8" variants={revealText}>
              (32) 3721-4479 · controladoria@fsminas.com.br · Fazenda Divisório, Estrada Muriaé–São Fernando, Muriaé – MG
            </motion.p>
            <motion.a
              href="https://wa.me/553237214479"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-colors"
              variants={revealText}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0.4)', '0 0 0 20px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Fale Conosco via WhatsApp
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <TiltCard className="rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-square flex items-center justify-center">
              <span className="text-7xl">🥩</span>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;