import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/our-story", label: "Our Story", emoji: "💌" },
  { to: "/reasons", label: "Reasons", emoji: "🎀" },
  { to: "/memories", label: "Memories", emoji: "📸" },
  { to: "/countdown", label: "Countdown", emoji: "💍" },
  { to: "/love-letter", label: "Love Letter", emoji: "💌" },
  { to: "/proposal", label: "Proposal", emoji: "💖" },
  // Simple admin entry – you can hide/remove from here if you want a secret route
  { to: "/admin", label: "Admin", emoji: "🛠️" },
];

const RomanticNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <motion.button
        className="fixed top-4 left-4 z-[80] w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm shadow-dreamy border border-primary/20 flex items-center justify-center md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-xl">{isOpen ? "✕" : "🧸"}</span>
      </motion.button>

      {/* Desktop nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[70] hidden md:flex justify-center py-3 px-4"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center gap-1 bg-card/80 backdrop-blur-md rounded-full px-3 py-2 shadow-dreamy border border-primary/15">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground/70 hover:text-foreground hover:bg-primary/10"
                }`
              }
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </motion.nav>

      {/* Mobile nav drawer */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[75] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-64 bg-card/95 backdrop-blur-md shadow-dreamy border-r border-primary/15 p-6 pt-20"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl font-body font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-foreground/70 hover:bg-primary/10"
                      }`
                    }
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="mt-8 font-handwritten text-lg text-primary/60 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Navigate with love 💕
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default RomanticNav;
