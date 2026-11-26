import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cutLink, setCutLink] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/quem-somos', label: 'Quem Somos' },
    { to: '/produtos', label: 'Produtos' },
    { to: '/contato', label: 'Contato' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!cutLink) {
      const current = navLinks.find((l) => l.to === location.pathname);
      if (current) setCutLink(current.label);
    }
  }, [location.pathname, cutLink]);

  const handleKnifeClick = useCallback(
    (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
      e.preventDefault();
      if (animating) return;

      setAnimating(true);
      setCutLink(null);

      setTimeout(() => {
        setCutLink(link.label);
      }, 10);

      setTimeout(() => {
        navigate(link.to);
        setAnimating(false);
      }, 700);
    },
    [animating, navigate]
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-red-600/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
  <div className="relative h-20 w-40">
    {/* Imagem original (centralizada) */}
    <img
      src="/assets/logo32111.png"
      alt="Frigorífico Sabor de Minas"
      className={`h-15 w-31 transition-all duration-500 ${
        scrolled ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
      } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg`}
    />
    {/* Nova imagem (já ocupa todo o container) */}
    <img
      src="/assets/p5-removebg-preview.png"
      alt="Frigorífico Sabor de Minas"
      className={`h-20 w-40 transition-all duration-500 ${
        scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } drop-shadow-lg`}
    />
    {/* Linha decorativa inferior */}
    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
  </div>
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive =
                cutLink === link.label || location.pathname === link.to;
              return (
                <div key={link.to} className="relative inline-block">
                  <Link
                    to={link.to}
                    onClick={(e) => handleKnifeClick(e, link)}
                    className={`relative text-sm uppercase tracking-widest font-semibold transition-colors duration-300 z-10 ${
                      isActive
                        ? 'text-red-400'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {cutLink === link.label && !animating && (
                      <motion.div
  className="absolute -top-6 left-1/2 -translate-x-1/2 w-7 h-7 drop-shadow-lg"
  initial={{ y: -30, rotate: -45, opacity: 0 }}
  animate={{ y: 0, rotate: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
>
  <img
    src="/images/ImgDeFaca.png"
    alt="Faca cravada"
    className="w-full h-full object-contain"
  />
</motion.div>
                    )}
                  </Link>

                  {!cutLink && (
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-red-500 transition-all duration-300 ${
                        location.pathname === link.to
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      }`}
                    />
                  )}
                </div>
              );
            })}
            <Link
              to="/contato"
              onClick={(e) => {
                e.preventDefault();
                setCutLink('Fale Conosco');
                setTimeout(() => {
                  navigate('/contato');
                  setCutLink(null);
                }, 700);
              }}
              className="ml-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            >
              Fale Conosco
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white text-3xl transition-transform duration-300 hover:scale-110"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen
            ? 'max-h-96 opacity-100 bg-gray-900/95 backdrop-blur-md'
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-medium transition-colors duration-300 ${
                location.pathname === link.to
                  ? 'text-red-400 border-l-4 border-red-500 pl-4'
                  : 'text-white/80 hover:text-white hover:pl-4 border-l-4 border-transparent pl-0'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contato"
            onClick={() => setIsOpen(false)}
            className="block mt-4 bg-red-600 text-white text-center py-3 rounded-full font-bold uppercase tracking-wide shadow-lg"
          >
            Fale Conosco
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;