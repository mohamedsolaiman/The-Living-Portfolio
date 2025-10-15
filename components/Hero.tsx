
import React from 'react';
// FIX: Import `Variants` type from framer-motion to fix type errors with animation definitions.
import { motion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// FIX: Added Variants type to ensure correct type checking for framer-motion properties.
const wordAnimation: Variants = {
  hidden: {},
  visible: {},
};

// FIX: Added Variants type to ensure correct type checking for framer-motion properties like 'ease'.
const characterAnimation: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

// FIX: Changed 'el' prop type to React.ElementType to properly handle dynamic JSX tags and resolve JSX namespace errors.
const AnimatedText: React.FC<{ text: string; el?: React.ElementType; className?: string; stagger?: number }> = ({ text, el: Wrapper = 'span', className, stagger = 0.05 }) => {
    return (
        <Wrapper className={className}>
            <span className="sr-only">{text}</span>
            <motion.span
                aria-hidden
                variants={wordAnimation}
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: stagger }}
            >
                {text.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {word.split('').map((char, charIndex) => (
                            <motion.span
                                key={charIndex}
                                className="inline-block"
                                variants={characterAnimation}
                            >
                                {char}
                            </motion.span>
                        ))}
                        {'\u00A0'}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
};


const Hero: React.FC = () => {
    const skills = ['React', 'TypeScript', 'UI/UX', 'Animation'];
    
    return (
        <section className="h-screen w-full relative flex flex-col justify-center items-center text-center overflow-hidden gradient-background">
            <div className="relative z-10 p-6 flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <AnimatedText 
                      el="h1" 
                      text="Genius Developer." 
                      className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter" 
                  />
                </motion.div>
                
                <motion.p 
                  className="text-lg md:text-xl max-w-3xl mx-auto text-brand-subtle mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  Crafting performant and visually stunning web experiences.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap justify-center gap-x-4 gap-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    {skills.map((skill, i) => (
                      <span key={skill} className="text-sm font-medium border border-brand-primary/20 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                </motion.div>
            </div>
            
            <motion.a
                href="#about"
                className="absolute bottom-10 z-10"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: [0, 10, 0], opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
                aria-label="Scroll down"
            >
                <ArrowDown className="text-brand-primary" size={32} />
            </motion.a>
        </section>
    );
};

export default Hero;
