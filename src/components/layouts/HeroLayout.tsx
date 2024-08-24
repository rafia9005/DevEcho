import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const words = [
  "Innovative Websites",
  "Cutting-Edge Tech Stack",
  "Tailored Solutions",
  "Future-Ready Designs"
];
const HeroLayout: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-nord0 text-nord4 overflow-hidden">
      <motion.div
        className="text-5xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <motion.h1
            key={currentWordIndex}
            className="text-6xl font-bold text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {words[currentWordIndex]}
          </motion.h1>
          <p className="mt-4 font-normal max-w-[700px] text-center text-lg">At DevEcho, we turn your ideas into functional and stylish websites. Using the latest technology, we bring your vision to life with a focus on quality and user experience.</p>
          <Link
            to="/contact"
            className="mt-6 px-6 py-3 bg-nord4 text-nord0 rounded-lg shadow-lg hover:bg-nord3 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroLayout;

