import { useState, useEffect, useRef, MouseEvent } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavbarLayout() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setToggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed w-full backdrop-blur-lg bg-white transition-colors duration-300"
      style={{ zIndex: "2" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            <Link to="/">DevEcho</Link>
          </motion.div>
          <div className="hidden lg:flex gap-6">
            {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
              <motion.a
                key={index}
                animate={{ y: 0 }}
                initial={{ y: -100 }}
                transition={{ duration: 0.5 + index * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/github"
              className="hidden md:flex items-center px-4 py-2 rounded-md border-2 border-gray-300 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
            >
              Login
            </Link>
            <button onClick={() => setToggleMenu(!toggleMenu)} className="lg:hidden p-2 rounded-md">
              {toggleMenu ? (
                <XMarkIcon className="h-6 text-gray-800" />
              ) : (
                <Bars3Icon className="h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>
      <motion.div
        ref={menuRef}
        className={`fixed top-0 right-0 z-40 w-full bg-gray-800 text-white lg:hidden transition-transform duration-300 ${toggleMenu ? 'translate-x-0' : '-translate-x-full'}`}
        initial={{ x: '100%' }}
        animate={{ x: toggleMenu ? 0 : '100%' }}
      >
        <div className="flex flex-col items-center py-6">
          {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
            <Link
              key={index}
              to={`/#${item.toLowerCase()}`}
              className="py-2 text-lg font-semibold hover:bg-gray-700 rounded-md w-full text-center"
              onClick={() => setToggleMenu(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

