import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation, fadeInUp, fadeInLeft, fadeInRight } from '../hooks/useScrollAnimation';
import { HiCheckCircle, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineCalendar } from 'react-icons/hi';

/* ============================================================
   IMAGENS DE APOIO (stock livre - Unsplash / substitua por
   fotos reais da planta e produtos quando disponíveis em /images/)
   ============================================================ */
const IMG = {
  cattle: '/public/imgGado.jpg',
  meatCounter: 'https://images.unsplash.com/photo-1625643269470-5d3e7b69fa34?auto=format&fit=crop&w=1600&q=80',
  grill: '/public/images/imgNegocios.jpeg',
};

/* ============================================================
   CONTADOR ANIMADO (para a seção de números da empresa)
   ============================================================ */
const Counter = ({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(to);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};

/* ============================================================
   LISTA DE CORTES
   ============================================================ */
const cortesLista = [
  { id: 1, name: 'Pescoço' },
  { id: 2, name: 'Acém' },
  { id: 3, name: 'Peito' },
  { id: 4, name: 'Paleta' },
  { id: 5, name: 'Fraldinha' },
  { id: 6, name: 'Ponta de agulha' },
  { id: 7, name: 'Filé Mignon' },
  { id: 8, name: 'Filé de costela' },
  { id: 9, name: 'Contra-filé' },
  { id: 10, name: 'Capa de filé' },
  { id: 11, name: 'Alcatra' },
  { id: 12, name: 'Patinho' },
  { id: 13, name: 'Coxão duro' },
  { id: 14, name: 'Coxão Mole' },
  { id: 15, name: 'Lagarto' },
  { id: 16, name: 'Músculo dianteiro' },
  { id: 17, name: 'Músculo traseiro' },
  { id: 18, name: 'Costela' },
  { id: 19, name: 'Maminha' },
  { id: 20, name: 'Picanha' },
  { id: 21, name: 'Cupim' },
  { id: 22, name: 'Rabo' },
  { id: 23, name: 'Mocotó' },
];

/* ============================================================
   COMPONENTE DO MAPA DE CORTES
   ============================================================ */
const MapaCortes = () => {
  const [corteAtivo, setCorteAtivo] = useState<number | null>(null);

  const handleCorteClick = (id: number) => {
    setCorteAtivo(prev => (prev === id ? null : id));
  };

  const corAtiva = '#841717';
  const corInativa = '#c1bbab';

  return (
    <div className="flex flex-col md:flex-row min-h-screen #FFFFFF p-10 font-sans text-gray-800">
      {/* Lista de cortes */}
      <div className="w-full md:w-1/4 flex flex-col gap-1 pr-4 mb-10 md:mb-0 z-10 relative">
        {cortesLista.map(corte => (
          <motion.button
            key={corte.id}
            onClick={() => handleCorteClick(corte.id)}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.96 }}
            className={`text-left px-4 py-2 font-bold text-[13px] md:text-sm transition-all duration-200 w-fit rounded ${
              corteAtivo === corte.id
                ? 'bg-white text-[#841717] shadow-md transform scale-105'
                : 'text-gray-800 hover:bg-[#d6d4ce]'
            }`}
          >
            {corte.id} {corte.name}
          </motion.button>
        ))}
      </div>

      {/* SVG do boi */}
      <div className="w-full md:w-3/4 flex items-center justify-center -ml-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1079.033 709.703" className="w-full max-w-5xl h-auto">
          <g id="mapaInterativo" transform="translate(-417.011 -230.717)">
            {/* Sombras e detalhes fixos */}
            <g>
              <path id="sombra" d="M107.8,744.558c2.368-7.105,262.28-13.863,526.935-13.5S1168.794,738.89,1166.426,746s-276.506,13.84-541.161,13.48S105.434,751.663,107.8,744.558Z" transform="translate(338 185)" fill="#d1cdc3"/>
            </g>
            <g id="Grupo_25">
              <path d="M405.737,663.749h50.638s3.858,32.778,1.326,41.414c-.71,2.481-6.613,4.948-6.349,11.556s0,19.823,0,19.823-.352,7.048-5.462,7.489-51.276,0-51.276,0-2.731.088-3.436-6.167a74.46,74.46,0,0,1-.529-10.4,16.951,16.951,0,0,1,4.405-9.339c3.877-3.877,8.634-9.6,9.163-11.277s1.21-43.1,1.21-43.1Z" transform="translate(338 185)" fill="#c1bbab" stroke="#000" strokeLinejoin="round" strokeWidth="3"/>
            </g>
            <g id="Grupo_26">
              <path d="M468.537,514.585l-4.026,45.042s-.5,52.842,1.761,66.934,5.033,31.957,9.562,42.777c1.893,4.523,1.281,10.452,1.085,16.262-.246,7.339-.659,14.2-1.085,15.7-1.112,3.489-5.536,5.536-5.536,11.323v17.614H451.678V714.921s-.361-3.985,6-9.506c2-8.108-1.471-42.115-1.471-42.115l-3.523-24.408-1.007-25.918,2.768-29.692a230.215,230.215,0,0,0,8.807-31.2C466.775,534.9,468.537,514.585,468.537,514.585Z" transform="translate(338 185)" fill="#c1bbab" stroke="#000" strokeWidth="3"/>
            </g>
            <g id="Grupo_29">
              <path d="M1001.951,668.4l2.425,53.488s-8.191,11.649-10.921,20.022,0,12.013,0,12.013h39.316s6.553-5.734,9.465-12.013c1.12-4.9-1.274-5.916,2.184-13.105s8.6-5.071,11.649-15.654c.335-3.749,2.017-15.489.561-26.677s-5.053-18.075-5.053-18.075Z" transform="translate(338 185)" fill="#c1bbab" stroke="#000" strokeLinejoin="round" strokeWidth="3"/>
            </g>
            <g id="Grupo_28">
              <path d="M934.246,521.842s20.713,33.587,31.543,69.718,10.193,75.356,10.193,75.356v48.053s-7.19,6.371-10.193,14.925-1.82,19.294-1.82,19.294h28.395s1.136-9.21,4.321-15.944a44.442,44.442,0,0,1,7.324-10.986s-.63-19.38-1.508-41.789c-.432-11.032-.243-23.145-1.508-33.6-3.731-30.852-11.2-47.6-11.2-47.6s-7.377-15.353-21.756-34.465S934.246,521.842,934.246,521.842Z" transform="translate(338 185)" fill="#c1bbab" stroke="#000" strokeWidth="3"/>
            </g>
            <g id="Grupo_27">
              <path d="M471.008,485.009a133.134,133.134,0,0,1,29.4-18.762c16.872-7.7,38.084-12.041,38.084-12.041s26.043-1.82,51.245-2.8,49.565-1.12,49.565-1.12a62.894,62.894,0,0,1,15.052,5.333c6.721,3.64,5.589,4.878,12.648,8.236s7.818,2.4,15.589,5.2a92.593,92.593,0,0,1,14.676,7s8.029,4.653,16.208,4.376c.027-.027,4.048.794,15.715-9.7,11.051-10.893,14.679-21.384,30.955-32.267,10.2-6.464,19.359-9.716,29.068-15.1,14.1-7.827,28.441-16.549,42.468-17.6,2.924.172,5.3-1.422,20.212,11.949,5.7,5.108,11.582,21.471,18.346,28.679,10.509,11.2,21.088,12.858,21.088,12.858s6.6,14.984,22.491,36.686S954.9,546.055,954.9,546.055s-5.1-6.854-23.512-46.478c-9.832-21.159-21.17-56.021-31.814-80.032-9.143-20.624-17.55-30.921-17.55-30.921a453.532,453.532,0,0,0-55.572-3.585c-27.373-.63-54.69,0-54.69,0s-41.668,3.989-87.593,5.179-96.321,0-96.321,0l-77.123,1.966-38.14,82.947h5.687Z" transform="translate(338 185)" fill="#c1bbab" stroke="#000" strokeLinejoin="round" strokeWidth="3"/>
            </g>
            <g id="Grupo_30">
              <path d="M1009.781,241.21s21.007,14.076,25.831,35.008c7.291,30.488-7.1,49.851-7.1,49.851A150.12,150.12,0,0,0,1002.6,305.45c-12.07-5.11-27.387-4.755-27.387-4.755s11.264-6.238,19.637-21.164C1003.963,264.454,1009.781,241.21,1009.781,241.21Z" transform="translate(338 185)" fill="#c1bbab" stroke="#000" strokeWidth="3"/>
            </g>

            {/* ===== CORTES INTERATIVOS ===== */}
            {/* 1. Pescoço */}
            <g onClick={() => handleCorteClick(1)} className="cursor-pointer">
              <path d="M381.081,96.491l-43.928-1.877s-48.058-7.884-58.195-7.884c.053,0,52.742-36.487,52.742-36.487s-31.015-9.379-75.529,4.92c.166.049-67.581-9.819-102.527,52.274s-41.3,78.556-54.585,87.8S78.267,217.472,81.155,227.58s24.815,31.68,35.923,32.569,23.1-11.774,33.1-8.886S180.171,281.7,180.171,281.7l68.425-9.775,31.1,54.651,30.436,1.555S315,377.7,361.183,406.613c.077,0-19.9-61.949,18.773-116.014,0,0-12.117-36.439-11.725-104.029S381.081,96.491,381.081,96.491Z" transform="translate(338 185)" fill={corteAtivo === 1 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(594 387)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 1 ? '#fff' : '#000'}><tspan x="0" y="0">1</tspan></text>
            </g>

            {/* 2. Acém */}
            <g onClick={() => handleCorteClick(2)} className="cursor-pointer">
              <path d="M551.852,136.566s-7.26,26.06-9.68,52.824,0,54.232,0,54.232a344.56,344.56,0,0,0,3.463,35.409,300.572,300.572,0,0,0,7.523,33.3,278.428,278.428,0,0,0,14.515,40.1,300.553,300.553,0,0,0,21.673,37.878l-78.838,1.939s10.439-45.616-6.794-81.406c-13.687-30.241-46.924-38.281-46.924-38.281s-14.609-5.491-38.826.49a122.284,122.284,0,0,0-37.943,18.04s-11.651-44.021-11.365-92.806c-1.5-65.639,8.348-92.9,12.094-101.172.612-1.355,2.553.522,2.553.522s5.865,34.3,25.583,55.056,48.777,24.867,48.777,24.867,19.668,5.723,55.1-10.209C535.568,156.88,551.852,136.566,551.852,136.566Z" transform="translate(338 185)" fill={corteAtivo === 2 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(791 424)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 2 ? '#fff' : '#000'}><tspan x="0" y="0">2</tspan></text>
            </g>

            {/* 3. Peito */}
            <g onClick={() => handleCorteClick(3)} className="cursor-pointer">
              <path d="M180.639,281.58l21.526,30.111s7.665,21.883,22.882,33.768,37.989,13.774,37.989,13.774,6.387,25.271,16,41.322,22.438,22.883,22.438,22.883-2.113,27.872,20.883,51.319c16.44,15.773,46.025,16.787,46.025,16.787s2.427,9.3,7.078,13.348c.222,0-3.034-50.054-3.034-50.054L361,406.6a119.557,119.557,0,0,1-33.836-33.626,117.443,117.443,0,0,1-17.113-44.882l-30.258-1.478-31.86-55.137Z" transform="translate(338 185)" fill={corteAtivo === 3 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(627 575)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 3 ? '#fff' : '#000'}><tspan x="0" y="0">3</tspan></text>
            </g>

            {/* 4. Paleta */}
            <g onClick={() => handleCorteClick(4)} className="cursor-pointer">
              <path d="M372.375,458.5s25.463,9.741,50.841,13.587a270.082,270.082,0,0,0,49.542,2.444s37.279-80.889,37.494-81.279c1.229-5.386,17.864-79.2-32.409-111.414-47.832-30.749-97.623,9.546-97.623,9.546a106.528,106.528,0,0,0-21.476,47.833c-7.08,33.368,2.44,66.38,2.44,66.38Z" transform="translate(338 185)" fill={corteAtivo === 4 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(760 575)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 4 ? '#fff' : '#000'}><tspan x="0" y="0">4</tspan></text>
            </g>

            {/* 5. Fraldinha */}
            <g onClick={() => handleCorteClick(5)} className="cursor-pointer">
              <path d="M746.032,308.584s12.609,20.469,19.483,39.759c8.415,23.362,6.58,36.872,6.58,36.872s32.741-.992,60.336-.291a489.206,489.206,0,0,1,49.836,3.824s-20.075-34.159-54.042-54.17S746.032,308.584,746.032,308.584Z" transform="translate(338 185)" fill={corteAtivo === 5 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1133 554)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 5 ? '#fff' : '#000'}><tspan x="0" y="0">5</tspan></text>
            </g>

            {/* 6. Ponta de agulha */}
            <g onClick={() => handleCorteClick(6)} className="cursor-pointer">
              <path d="M553.281,312.788s61.025-6.23,109.259-7,83.448,2.8,83.448,2.8S760.2,332.53,766.71,351.432s5.32,33.883,5.32,33.883-45.434,4.2-91.288,5.04-92-.03-92-.03-13.076-21.882-21.967-40.854A238.475,238.475,0,0,1,553.281,312.788Z" transform="translate(338 185)" fill={corteAtivo === 6 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1000 549)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 6 ? '#fff' : '#000'}><tspan x="0" y="0">6</tspan></text>
            </g>

            {/* 8. Filé de costela */}
            <g onClick={() => handleCorteClick(8)} className="cursor-pointer">
              <path d="M625.268,137.088l79.106-.025s10.535,4.63,13.743,28.239c5.226,30.97,2.555,66.2,2.555,66.2a211.8,211.8,0,0,1-38.686,2.379c-20.382-.755-42.533-4.9-42.533-4.9s13.418-17.13,9.956-42.289S625.268,137.088,625.268,137.088Z" transform="translate(338 185)" fill={corteAtivo === 8 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1000 370)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 8 ? '#fff' : '#000'}><tspan x="0" y="0">8</tspan></text>
            </g>

            {/* 9. Contra-filé */}
            <g onClick={() => handleCorteClick(9)} className="cursor-pointer">
              <path d="M704.065,137.063s1.514-.025,4.519-.1c10.672-.256,41.275-1.184,68.957-3.8,34.474-3.252,32.9-6.838,64.418-9.117a474.712,474.712,0,0,1,61.65,0s7.128,46.2,5.555,80.928-11.846,57.972-11.846,57.972-51.71-18.809-95.872-26.673a346.836,346.836,0,0,0-80.774-4.781s3.271-46.8-3.774-76.5a33.767,33.767,0,0,0-8.715-14.935A16.267,16.267,0,0,0,704.065,137.063Z" transform="translate(338 185)" fill={corteAtivo === 9 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1133 350)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 9 ? '#fff' : '#000'}><tspan x="0" y="0">9</tspan></text>
            </g>

             {/* 7. Filé Mignon (Tracejado - Misto na base e por cima de outros) */}
            <g onClick={() => handleCorteClick(7)} className="cursor-pointer" strokeDasharray="12">
              <path d="M719.186,162.638c22.224,3.245,10.994,5.639,50.2,9.163,28.7,2.453,34.26-.321,64.537,0,32.554-.6,48.448,2.907,48.448,2.907s23.793,1.95,33.17,12.526c3.607,4.064,6.284,9.989,6.284,18.2,0,9.81-5.727,13.83-10.937,17.91-9.06,7.1-20.467,8.587-20.467,8.587s-15.62,4.171-57.9,0c-15.813-1.56-35.748-5.741-54.3-8.587-30.3-4.647-31.63-1.893-55.423-8.193s-29.311-12.092-30.218-27.634S696.962,159.393,719.186,162.638Z" transform="translate(338 185)" fill={corteAtivo === 7 ? corAtiva : 'transparent'} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1176 401)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 7 ? '#fff' : '#000'}><tspan x="-20" y="0">7</tspan></text>
            </g>

            {/* 10. Capa de filé */}
            <g onClick={() => handleCorteClick(10)} className="cursor-pointer">
              <path d="M587.835,137.063h37.292s23.427,26.2,24.861,55.938a56.3,56.3,0,0,1-19.954,45.8s-8.178,7.606-30.1,8.832-57.573-3.925-57.573-3.925a305.748,305.748,0,0,1,0-50.7c3.6-39.254,9.486-55.938,9.486-55.938Z" transform="translate(338 185)" fill={corteAtivo === 10 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(909 392)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 10 ? '#fff' : '#000'}><tspan x="0" y="0">10</tspan></text>
            </g>

            {/* 11. Alcatra */}
            <g onClick={() => handleCorteClick(11)} className="cursor-pointer">
              <path d="M882.266,388.748l70.706-84.215s13.287.249,22.98-4.413c7.189-4.156,21.151-18.623,31.022-48.936s8.961-71.127,8.961-71.127-21.212-28.213-49.565-42.284-63-13.784-63-13.784,7.693,45.7,5.593,84.63c-2.608,41.913-18.762,70.847-18.762,70.847L921.4,302.733s-3.62,16.517-20.891,33.335c-14.071,15.821-34.944,29.646-34.944,29.646Z" transform="translate(338 185)" fill={corteAtivo === 11 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1263 456)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 11 ? '#fff' : '#000'}><tspan x="0" y="0">11</tspan></text>
            </g>

            {/* 12. Patinho */}
            <g onClick={() => handleCorteClick(12)} className="cursor-pointer">
              <path d="M911.663,452.02l35.625-57.165s-7.581-28.127-1.657-50.869c8.119-34.3,24.327-40.9,24.327-40.9l-17.036,1.3-70.338,84.026a214.027,214.027,0,0,1,15.493,27.653C905.324,431.681,911.663,452.02,911.663,452.02Z" transform="translate(338 185)" fill={corteAtivo === 12 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1234 584)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 12 ? '#fff' : '#000'}><tspan x="0" y="0">12</tspan></text>
            </g>

            {/* 13. Coxão duro */}
            <g onClick={() => handleCorteClick(13)} className="cursor-pointer">
              <path d="M930.833,499.639s18.482-9.05,32.375-18.736a149.689,149.689,0,0,0,23.2-20.011V440.116s-11.726-.478-21.541-11.854S947.148,395,947.148,395l-35.454,57Z" transform="translate(338 185)" fill={corteAtivo === 13 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1264 653)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 13 ? '#fff' : '#000'}><tspan x="0" y="0">13</tspan></text>
            </g>

            {/* 14. Coxão Mole (tracejado) */}
            <g onClick={() => handleCorteClick(14)} className="cursor-pointer"> 
              <path d="M1004.15,305.194s30.059,15.4,39.906,39.779,0,55.5,0,55.5-5.257,19.415-15.773,31.078a44.156,44.156,0,0,1-26.778,14.731s-17.216,4.827-30.409-6.358-22.638-37.873-22.638-37.873-6.525-19.024-5.378-38.144,9.144-38.258,9.144-38.258,6.969-16.569,19.684-22.3S1004.15,305.194,1004.15,305.194Z" transform="translate(338 185)" fill={corteAtivo === 14 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1314 567)" fontSize="38" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 14 ? '#fff' : '#000'}><tspan x="0" y="0">14</tspan></text>
            </g>

            {/* 15. Lagarto */}
            <g onClick={() => handleCorteClick(15)} className="cursor-pointer">
              <path d="M1015.957,180.058s36.32,35.773,53.747,76.447c22.962,48.165,18.59,77,18.569,77.082a291,291,0,0,1-16.049,76.653c-9.171,28.7-23.242,47.325-23.242,47.325v5.321l-62.726-1.4v-21S1007.048,441.6,1020.7,429s20.162-38.924,20.162-38.924,3.161-24.34,0-40.6c-3.084-13.617-12.643-24.452-12.643-24.452s15.163-16.992,6.483-51.716c-5.04-18.2-24.965-32.28-24.965-32.28s2.908-14.694,4.523-29.886S1015.957,180.058,1015.957,180.058Z" transform="translate(338 185)" fill={corteAtivo === 15 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1376 520)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 15 ? '#fff' : '#000'}><tspan x="0" y="0">15</tspan></text>
            </g>

            {/* 16. Músculo dianteiro */}
            <g onClick={() => handleCorteClick(16)} className="cursor-pointer">
              <path d="M391.344,573.516c3.879,4.268,15.893,7.178,35.546,9.741a88.725,88.725,0,0,0,28.026,0s10.066-30.744,11.4-47.628,4-49.764,4-49.764L485.8,474.259s-28.465,1.611-55.677-1.149C403.57,469.7,372.575,458.9,372.575,458.9l2.877,46.292s6,6.887,8.22,12c0,0,1.156,16.566,3.074,30.647S389.623,571.095,391.344,573.516Z" transform="translate(338 185)" fill={corteAtivo === 16 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(740 725)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 16 ? '#fff' : '#000'}><tspan x="0" y="0">16</tspan></text>
            </g>

            {/* 17. Músculo traseiro */}
            <g onClick={() => handleCorteClick(17)} className="cursor-pointer">
              <path d="M1049.027,462.885l-63.462-1.419a173.611,173.611,0,0,1-24.523,20.878,217.738,217.738,0,0,1-30.157,16.735A416.3,416.3,0,0,0,952.094,541.5c11.847,20.215,16.611,23.487,26.18,38.442s12.1,21.375,12.1,21.375h57Z" transform="translate(338 185)" fill={corteAtivo === 17 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1321 730)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 17 ? '#fff' : '#000'}><tspan x="0" y="0">17</tspan></text>
            </g>

            {/* 18. Costela */}
            <g onClick={() => handleCorteClick(18)} className="cursor-pointer">
              <path d="M841,342.676s21.494-18.015,35.48-38.094,20.463-42.219,20.463-42.219-51.859-18.417-95.855-26.279a356.258,356.258,0,0,0-80.131-5.17,197.538,197.538,0,0,1-38.773,3.016c-20.356-.592-42.65-5.385-42.65-5.385s-8.616,17.017-34.68,18.74c-28.218,2.369-62.467-3.877-62.467-3.877s.862,18.956,3.662,36.188a280.949,280.949,0,0,0,7.539,32.742s53.851-6.139,102.1-7.108a866.4,866.4,0,0,1,90.9,3.231s30.9,5.447,54.5,14A182.371,182.371,0,0,1,841,342.676Z" transform="translate(338 185)" fill={corteAtivo === 18 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(993 470)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 18 ? '#fff' : '#000'}><tspan x="0" y="0">18</tspan></text>
            </g>

            {/* 19. Maminha */}
            <g onClick={() => handleCorteClick(19)} className="cursor-pointer">
              <path d="M890.483,279.746l30.8,22.962s-1.96,12.6-15.961,28.563-40.044,35.283-40.044,35.283a61.046,61.046,0,0,0-8.961-10.641c-6.161-6.021-15.681-13.441-15.681-13.441s17.222-14,29.683-29.683A172.877,172.877,0,0,0,890.483,279.746Z" transform="translate(338 185)" fill={corteAtivo === 19 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1209 515)" fontSize="32" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 19 ? '#fff' : '#000'}><tspan x="0" y="0">19</tspan></text>
            </g>

            {/* 20. Picanha (tracejado) */}
            <g onClick={() => handleCorteClick(20)} className="cursor-pointer" strokeDasharray="12">
              <path d="M948.605,139.35s-22.286-6.918-29.162,4.142-2.817,30.819,1.657,40.1c10.232,17.564,31.648,28.665,39.27,30.157,21.375,3.811,21.126,14.208,32.476,12.759s11.08-8.178,12.924-18.558c2.9-10.232-1.491-20.712-1.491-20.712s-9.445-17.191-23.363-29.162S948.605,139.35,948.605,139.35Z" transform="translate(338 185)" fill={corteAtivo === 20 ? corAtiva : 'transparent'} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1277 377)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 20 ? '#fff' : '#000'}><tspan x="0" y="0">20</tspan></text>
            </g>

            {/* 21. Cupim */}
            <g onClick={() => handleCorteClick(21)} className="cursor-pointer">
              <path d="M467.455,178.935c11.914,1.06,28.623-2.862,49.722-13.412s34.675-28.787,34.675-28.787-24.7-46.778-52.666-62.807-50.213-4.856-59.209-1.308c-16.585,8.558-10.6,9.627-24.65,15.613l-.211.089c-14.393,6.052-31.956,8.415-31.956,8.415S389.033,133.477,410.3,154,440.735,176.055,467.455,178.935Z" transform="translate(338 185)" fill={corteAtivo === 21 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(785 323)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 21 ? '#fff' : '#000'}><tspan x="0" y="0">21</tspan></text>
            </g>

            {/* 22. Rabo */}
            <g onClick={() => handleCorteClick(22)} className="cursor-pointer">
              <path d="M976.346,143.066s45.049,19.294,76.812,56.062,50.237,91.009,50.237,91.009a290.318,290.318,0,0,1,9.61,34.911,265.277,265.277,0,0,1,4.224,34.984s7.915,23.566,15.378,42.131,14.473,32.132,14.473,32.132,1.04,12.792,3.406,21.073,6.059,12.054,6.059,12.054V495.09s-3.1,15.654-6.921,25.118-8.369,12.741-8.369,12.741V552.6s-16.206-3.069-23.942-11.715-7-20.677-7-20.677-5.638-3.073-9.37-13.357-5.556-27.779-5.556-27.779-1.614-2.912-3.707-11.649-4.666-23.3-4.666-23.3a48.687,48.687,0,0,1,0-17.189c1.638-10.193,6.553-23.583,6.553-23.583l-6.553-96.106s-6.189-46.6-44.412-95.742C1014.934,170.46,976.346,143.066,976.346,143.066Z" transform="translate(338 185)" fill={corteAtivo === 22 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1441 666)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 22 ? '#fff' : '#000'}><tspan x="0" y="0">22</tspan></text>
            </g>

            {/* 23. Mocotó (duas pernas) */}
            <g onClick={() => handleCorteClick(23)} className="cursor-pointer">
              {/* Perna dianteira */}
              <path d="M408.605,612.822s.812,15.637,0,28.368a141.606,141.606,0,0,1-3.247,22.558h51.1l-3.076-22.558-1.2-28.368,2.905-30.077s-7.514,3.441-32.561,0c-23.1-2.782-31.353-8.716-31.353-8.716Z" transform="translate(338 185)" fill={corteAtivo === 23 ? corAtiva : corInativa} stroke="#000" strokeLinejoin="round" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(747 823)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 23 ? '#fff' : '#000'}><tspan x="0" y="0">23</tspan></text>
              {/* Perna traseira */}
              <path d="M990.536,601.314s6.131,12.924,8.782,33.139a200.806,200.806,0,0,1,2.766,33.943h49.327s-2.632-15.592-4.041-32.617a242.882,242.882,0,0,1,0-34.465Z" transform="translate(338 185)" fill={corteAtivo === 23 ? corAtiva : corInativa} stroke="#000" strokeWidth="3" className="transition-all duration-300"/>
              <text transform="translate(1341 836)" fontSize="37" fontFamily="Nunito-Bold, Nunito" fontWeight="700" fill={corteAtivo === 23 ? '#fff' : '#000'}><tspan x="0" y="0">23</tspan></text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENTE HOME
   ============================================================ */
const Home = () => {
  const [heroControls, heroRef] = useScrollAnimation(0.1);
  const [sobreControls, sobreRef] = useScrollAnimation(0.2);
  const [statsControls, statsRef] = useScrollAnimation(0.2);
  const [destaquesControls, destaquesRef] = useScrollAnimation(0.2);
  const [mapaControls, mapaRef] = useScrollAnimation(0.2);
  const [qualidadeControls, qualidadeRef] = useScrollAnimation(0.2);
  const [certificacoesControls, certificacoesRef] = useScrollAnimation(0.2);
  const [ctaControls, ctaRef] = useScrollAnimation(0.2);

  const stats = [
    { icon: HiOutlineCalendar, value: 22, suffix: ' anos', label: 'de tradição em Muriaé, desde 2004' },
    { icon: HiOutlineUserGroup, value: 180, suffix: '+', label: 'funcionários diretos na Zona da Mata' },
    { icon: HiOutlineTruck, value: 100, suffix: '%', label: 'frota própria de caminhões frigoríficos' },
    { icon: HiOutlineShieldCheck, value: 3, suffix: 'x', label: 'etapas: abate, desossa e industrializados' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section (mantida intacta) */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/VideoEmpresa.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div className="relative z-20 text-center px-4 max-w-4xl" initial="hidden" animate={heroControls} variants={fadeInUp}>
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4" variants={fadeInUp}>
            Frigorífico <br />
            <span className="text-red-600">Sabor de Minas</span>
          </motion.h1>
          <motion.p className="text-lg md:text-2xl text-gray-200 mb-2" variants={fadeInUp}>
            Tradição e qualidade em carnes nobres desde 2002
          </motion.p>
          <motion.p className="text-sm md:text-base text-gray-300 mb-8" variants={fadeInUp}>
            Fazenda Divisório, Muriaé – MG · Membro da AFRIG
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" variants={fadeInUp}>
            <Link to="/produtos" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-colors">
              Conheça-nos
            </Link>
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
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

     {/* Sobre / História */}
<section ref={sobreRef} className="py-20 bg-white overflow-hidden">
  <motion.div
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center"
    initial="hidden"
    animate={sobreControls}
    variants={fadeInUp}
  >
    {/* Coluna da imagem */}
    <motion.div
      className="relative"
      variants={{
        hidden: { opacity: 0, x: -80 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      }}
    >
      {/* Círculo decorativo flutuante atrás da imagem */}
      <motion.div
        className="absolute -top-10 -left-10 w-32 h-32 bg-red-100 rounded-full -z-10"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.img
        src={IMG.cattle}
        alt="Pasto e criação de gado usados na cadeia produtiva"
        className="rounded-2xl shadow-2xl w-full h-96 object-cover"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* Selo do ano de fundação */}
      <motion.div
        className="absolute -bottom-8 -right-8 bg-red-600 text-white rounded-2xl p-6 shadow-xl w-44 text-center"
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          type: 'spring',
          stiffness: 150,
          damping: 12
        }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <motion.p
          className="text-3xl font-extrabold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Counter to={2004} />
        </motion.p>
        <p className="text-xs uppercase tracking-wide mt-1">Ano de fundação</p>

        {/* Brilho pulsante no selo */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-white/20"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Círculo menor flutuando no canto inferior esquerdo da imagem */}
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-60 -z-5"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>

    {/* Coluna do texto */}
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 80 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
        }
      }}
    >
      <motion.span
        className="text-red-500 font-semibold text-lg inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Nossa história
      </motion.span>

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        viewport={{ once: true }}
      >
        Do pasto ao prato, com rastreabilidade
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-4"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        viewport={{ once: true }}
      >
        O Frigorífico Sabor de Minas Ltda. atua há mais de duas décadas em Muriaé, na Zona da Mata mineira, realizando
        abate de bovinos e suínos com inspeção do IMA (Instituto Mineiro de Agropecuária). Nossa sede fica na Fazenda
        Divisório, Zona Rural de Muriaé, onde concentramos abate, desossa e câmaras frias de grande porte.
      </motion.p>

      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        viewport={{ once: true }}
      >
        Entre 2021 e 2022, passamos por um ciclo de modernização que incluiu uma nova sala de abate e câmaras frias ampliadas. Nosso foco segue sendo a excelência no abate e na comercialização de carcaças, abastecendo açougues e supermercados em todo o estado.
      </motion.p>

      <ul className="space-y-3">
        {[
          'Inspeção sanitária pelo IMA',
          'Frota própria de caminhões frigoríficos',
          'Membro ativo da AFRIG',
          'Estação própria de tratamento de efluentes'
        ].map((item, idx) => (
          <motion.li
            key={idx}
            className="flex items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 1.1 + idx * 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
            >
              <HiCheckCircle className="text-red-500 w-6 h-6 mr-2 shrink-0" />
            </motion.div>
            <span className="text-gray-700">{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* Botão Saiba Mais com efeito de hover mais elaborado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.9 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <Link
          to="/quem-somos"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 group"
        >
          Conheça nossa história
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  </motion.div>
</section>

      {/* Números da empresa */}
      <section ref={statsRef} className="py-16 bg-[#1a1a1a] relative overflow-hidden">
  <motion.div
    className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed"
    style={{ backgroundImage: `url(${IMG.meatCounter})` }}
    initial={{ scale: 1.05 }}
    whileInView={{ scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  />
  
  <motion.div 
    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8" 
    initial="hidden" 
    animate={statsControls} 
    variants={fadeInUp}
  >
    {stats.map((stat, idx) => (
      <motion.div
        key={idx}
        className="text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.15, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <stat.icon className="w-8 h-8 mx-auto mb-3 text-red-500" />
        <p className="text-3xl md:text-4xl font-extrabold">
          <Counter to={stat.value} suffix={stat.suffix} />
        </p>
        <p className="text-sm text-gray-300 mt-2">{stat.label}</p>
      </motion.div>
    ))}
  </motion.div>
</section>



{/* Certificações e representatividade */}
<section ref={certificacoesRef} className="py-20 bg-gray-50 relative overflow-hidden">
  {/* Fundo decorativo sutil */}
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div className="absolute top-20 left-10 w-64 h-64 bg-red-200 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-100 rounded-full blur-3xl" />
  </div>

  <motion.div 
    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
    initial="hidden"
    animate={certificacoesControls}
    variants={fadeInUp}
  >
    <motion.span 
      className="text-red-500 font-semibold text-lg inline-block mb-4"
      variants={fadeInUp}
    >
      Reconhecimento
    </motion.span>
    <motion.h2 
      className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-12"
      variants={fadeInUp}
    >
      Certificações e associações
    </motion.h2>
    
    <div className="grid sm:grid-cols-3 gap-8">
      {[
        { 
          title: 'IMA', 
          desc: 'Inspeção sanitária contínua pelo Instituto Mineiro de Agropecuária.',
          icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          delay: 0.2
        },
        { 
          title: 'AFRIG', 
          desc: 'Membro ativo da Associação de Frigoríficos de Minas Gerais.',
          icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          delay: 0.4
        },
        { 
          title: 'Licença Ambiental', 
          desc: 'Licença Ambiental Concomitante renovada junto à URRAM Zona da Mata.',
          icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v1a2 2 0 002 2h2.5" />
            </svg>
          ),
          delay: 0.6
        },
      ].map((cert, idx) => (
        <motion.div
          key={cert.title}
          className="bg-white rounded-2xl shadow-md p-8 text-center group hover:shadow-xl border border-gray-100 transition-all duration-700"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: cert.delay, 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          viewport={{ once: true }}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.4 }
          }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-100 group-hover:border-red-200 transition-colors duration-500"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: cert.delay }}
          >
            {cert.icon}
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-500">
            {cert.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
            {cert.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>
      

     

      {/* Mapa de Cortes */}
      <section ref={mapaRef} className="py-20 bg-gray-50">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" initial="hidden" animate={mapaControls} variants={fadeInUp}>
          <div className="text-center mb-12">
            <motion.span className="text-red-500 font-semibold text-lg inline-block" variants={fadeInUp}>Conheça os cortes</motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2" variants={fadeInUp}>Mapa do Boi</motion.h2>
            <motion.p className="text-gray-600 mt-4 max-w-2xl mx-auto" variants={fadeInUp}>
              Clique em cada parte para descobrir os principais cortes bovinos que oferecemos.
            </motion.p>
          </div>
          <MapaCortes />
        </motion.div>
      </section>

      {/* Por que escolher? */}
      <section ref={qualidadeRef} className="py-20  bg-gray-50">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" initial="hidden" animate={qualidadeControls} variants={fadeInUp}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span className="text-red-500 font-semibold text-lg" variants={fadeInLeft}>Diferenciais</motion.span>
              <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-8" variants={fadeInLeft}>Por que escolher o Sabor de Minas?</motion.h2>
              <Accordion items={[
                { title: 'Qualidade e Rastreabilidade', content: 'Abate inspecionado pelo IMA, com rastreabilidade da origem até a desossa, garantindo procedência em cada corte.' },
                { title: 'Sustentabilidade', content: 'Estação própria de tratamento de efluentes na Fazenda Divisório, adequando os resíduos aos padrões ambientais exigidos pela fiscalização estadual.' },
                { title: 'Tecnologia de Ponta', content: 'Sala de abate modernizada, câmaras frias de grande porte e setor de desossa ampliado desde o ciclo de expansão de 2022.' },
                { title: 'Atendimento Personalizado', content: 'Frota própria de caminhões frigoríficos atende açougues, supermercados e food service em todo o estado de Minas Gerais.' },
              ]} />
            </div>
            <motion.div className="relative" variants={fadeInRight}>
              <motion.img src="/public/assets/img estrutura.jpg" alt="Frigorífico Sabor de Minas em Muriaé" className="rounded-2xl shadow-2xl w-full" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} />
              <motion.div className="absolute -top-6 -right-6 w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-lg" animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🥩</motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      
{/* Destaques – Siga no Instagram */}
<section ref={destaquesRef} className="py-20 bg-gray-50 overflow-hidden">
  <motion.div
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center"
    initial="hidden"
    animate={destaquesControls}
    variants={fadeInUp}
  >
    {/* Texto à esquerda */}
    <motion.div variants={fadeInLeft} className="space-y-5">
      <motion.span
        className="text-red-500 font-semibold text-lg inline-block bg-red-50 px-4 py-1 rounded-full"
        variants={fadeInUp}
      >
        Fique por dentro
      </motion.span>
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-gray-900"
        variants={fadeInUp}
      >
        Siga o Sabor de Minas no Instagram
      </motion.h2>
      <motion.p
        className="text-gray-600 text-lg max-w-md"
        variants={fadeInUp}
      >
        Acompanhe os bastidores, receitas e lançamentos. Leve o melhor da carne para a sua mesa todos os dias.
      </motion.p>
      <motion.div variants={fadeInUp}>
        <motion.a
          href="https://www.instagram.com/fsminas/" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Seguir no Instagram
        </motion.a>
      </motion.div>
    </motion.div>

    {/* Imagem à direita */}
    <motion.div variants={fadeInRight}>
      <img
        src="/public/assets/IMGCARNE 888.jpg"
        alt="Sabor de Minas"
        className="rounded-2xl shadow-2xl w-full h-auto"
      />
    </motion.div>
  </motion.div>
</section>
      

      {/* CTA WhatsApp */}
      <section 
  ref={ctaRef} 
  className="relative py-24 bg-cover bg-center bg-fixed" 
  style={{ backgroundImage: `url(${IMG.grill})` }}
>
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
  <motion.div 
    className="relative z-10 max-w-4xl mx-auto text-center px-4" 
    initial="hidden" 
    animate={ctaControls} 
    variants={fadeInUp}
  >
    <motion.h2 
      className="text-3xl md:text-4xl font-bold text-white mb-4" 
      variants={fadeInUp}
    >
      Quer levar qualidade para seu negócio?
    </motion.h2>
    <motion.p 
      className="text-gray-200 text-lg mb-2" 
      variants={fadeInUp}
    >
      Seja um parceiro Sabor de Minas e ofereça o melhor aos seus clientes.
    </motion.p>
    <motion.p 
      className="text-gray-300 text-sm mb-8" 
      variants={fadeInUp}
    >
      (32) 3721-4479 · controladoria@fsminas.com.br · Fazenda Divisório, Estrada Muriaé–São Fernando, Muriaé – MG
    </motion.p>
    <motion.a 
      href="https://wa.me/553237214479" 
      target="_blank" 
      rel="noreferrer" 
      className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-colors" 
      variants={fadeInUp} 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0.4)', '0 0 0 20px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)'] }} 
      transition={{ repeat: Infinity, duration: 2 }}
    >
      Fale Conosco via WhatsApp
    </motion.a>
  </motion.div>
</section>
    </div>
  );
};

/* ============================================================
   ACCORDION
   ============================================================ */
const Accordion = ({ items }: { items: { title: string; content: string }[] }) => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="space-y-4">
      {items.map((item, _) => (
        <motion.div key={_} className="bg-white rounded-xl shadow-md overflow-hidden" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: _ * 0.15, duration: 0.4 }} viewport={{ once: true }}>
          <button onClick={() => setOpenIndex(_ === openIndex ? -1 : _)} className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            {item.title}
            <motion.svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ rotate: _ === openIndex ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: _ === openIndex ? 'auto' : 0, opacity: _ === openIndex ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-5 text-gray-600">{item.content}</div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;