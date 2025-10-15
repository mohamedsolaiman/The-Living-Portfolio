
import React, { useState, useEffect } from 'react';
// FIX: Import `Variants` type from framer-motion to fix type errors with animation definitions.
import { motion, useScroll, useSpring, AnimatePresence, type Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Sandbox from './components/Sandbox';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Sandbox', href: '#sandbox' },
  { name: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // FIX: Added Variants type to ensure correct type checking for framer-motion properties.
  const menuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  };
  
  // FIX: Added Variants type to ensure correct type checking for framer-motion properties.
  const navLinkVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-brand-bg/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-2xl font-bold text-brand-primary hover:text-brand-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            G.Dev
          </motion.a>
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-brand-subtle hover:text-brand-primary font-medium transition-colors">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-brand-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
          >
            <button onClick={toggleMenu} className="absolute top-6 right-6" aria-label="Close menu">
              <X size={32} />
            </button>
            <ul className="flex flex-col items-center space-y-8">
              {navItems.map((item, i) => (
                <motion.li key={item.name} custom={i} variants={navLinkVariants} initial="hidden" animate="visible">
                  <a href={item.href} onClick={toggleMenu} className="text-3xl text-brand-subtle hover:text-brand-primary font-bold transition-colors">
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Contact: React.FC = () => {
  const socialLinks = [
    { Icon: Github, href: 'https://github.com', name: 'GitHub' },
    { Icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
    { Icon: Mail, href: 'mailto:developer@example.com', name: 'Email' },
  ];
  return (
    <footer id="contact" className="py-20 bg-brand-surface">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-text">Let's Connect</h2>
        <p className="text-brand-subtle max-w-2xl mx-auto mb-8">
          I'm currently seeking new opportunities and challenges. If you have a project in mind or just want to say hello, feel free to reach out.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map(({ Icon, href, name }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-brand-subtle hover:text-brand-primary transition-colors"
              aria-label={name}
            >
              <Icon size={32} />
            </motion.a>
          ))}
        </div>
        <p className="text-brand-subtle text-sm">&copy; {new Date().getFullYear()} Genius Developer. Built with passion and code.</p>
      </div>
    </footer>
  );
};

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-brand-primary text-brand-bg p-3 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[60] origin-left" style={{ scaleX }} />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Sandbox />
      </main>
      <Contact />
      <ScrollToTopButton />
    </>
  );
}
