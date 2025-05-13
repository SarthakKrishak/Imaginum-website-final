import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

const linkVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 },
  }),
};


  return (
    <header className="w-full top-0 z-50">
      <div
        id="navbar-home"
        className="flex justify-between items-center h-[12vh] px-6 md:px-[3.8rem] lg:px-[6.2rem]"
      >
        <a
          href="/"
          aria-label="Navigate to home"
          className="text-white font-medium md:text-[1.8vw] text-xl"
        >
          <h1 className="font-['Paytone_One']">Imaginum</h1>
        </a>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={!isOpen ? { scale: 1.1, rotate: 5 } : {}}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`absolute hidden md:block md:right-[3vw] lg:right-[5.8vw] z-50 p-2 rounded-full shadow-md transition-colors ${
            isOpen
              ? "bg-red-700 hover:bg-red-600 hover:scale-[125%] text-white"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
        >
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: isOpen ? 1.1 : 1, rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {isOpen ? <X size={17} /> : <Menu size={20} />}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              role="navigation"
              aria-label="Main Navigation"
              className="absolute md:right-[8.5vw] lg:right-[9.2vw] h-[6vh] flex justify-center items-center bg-white/5 shadow-3xl z-40 p-4 rounded-2xl border border-gray-500 backdrop-blur-sm"
            >
              <div className="hidden md:block">
                <ul className="flex flex-row gap-6 relative font-['Geist'] capitalize leading-loose">
                  {[
                    { label: "Home", id: "navbar-home" },
                    { label: "About", id: "about-home" },
                    { label: "Projects", id: "project-home" },
                    { label: "Contact", id: "contact-home" },    
                  ].map((item, index) => (
                    <motion.li
                      key={item.label}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={linkVariants}
                    >
                      <button
                        onClick={() => {
                          document
                            .getElementById(item.id)
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsOpen(false);
                        }}
                        className="text-base font-semibold text-white transition-all duration-300 ease-out 
                          hover:scale-110 hover:-translate-x-1 hover:text-transparent 
                          bg-gradient-to-r from-white to-gray-400 bg-clip-text 
                          before:absolute before:bottom-0 before:left-0 before:h-0.5 
                          before:w-0 before:bg-gradient-to-r before:from-white before:to-gray-500 
                          before:transition-all before:duration-300 hover:before:w-full relative"
                        aria-label={`Navigate to ${item.label}`}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
