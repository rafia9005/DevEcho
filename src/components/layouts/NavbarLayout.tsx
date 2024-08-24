
import { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Blog", link: "/blog" },
  { name: "Service", link: "/service" },
  { name: "Contact", link: '#contact' }
];

export default function NavbarLayout() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setToggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => document.removeEventListener("mousedown", handleClickOutside as EventListener);
  }, []);

  return (
    <nav
      className="fixed w-full backdrop-blur-lg bg-nord0 transition-colors duration-300"
      style={{ zIndex: "2" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-nord4"
          >
            <Link to="/">DevEcho</Link>
          </motion.div>
          <div className="hidden lg:flex gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                animate={{ y: 0 }}
                initial={{ y: -100 }}
                transition={{ duration: 0.5 + index * 0.1 }}
                href={item.link}
                className="hover:bg-nord1 px-4 py-2 rounded-md text-nord4 transition-colors duration-200"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4">
            <Link
              to="/github"
              className="hidden md:flex items-center px-4 py-2 rounded-md border-2 border-nord3 text-nord6 hover:bg-nord2 transition-colors duration-200"
            >
              Login
            </Link>
            <button onClick={() => setToggleMenu(!toggleMenu)} className="lg:hidden p-2 rounded-md">
              {toggleMenu ? (
                <XMarkIcon className="h-6 text-nord6" />
              ) : (
                <Bars3Icon className="h-6 text-nord6" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
      <motion.div
        ref={menuRef}
        className={`fixed top-0 right-0 z-40 w-full bg-nord1 text-nord4 lg:hidden transition-transform duration-300 ${toggleMenu ? 'translate-x-0' : '-translate-x-full'}`}
        initial={{ x: '100%' }}
        animate={{ x: toggleMenu ? 0 : '100%' }}
      >
        <div className="flex flex-col items-center py-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="py-2 text-lg font-semibold hover:bg-nord2 rounded-md w-full text-center"
              onClick={() => setToggleMenu(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

