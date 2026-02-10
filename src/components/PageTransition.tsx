import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode, useState, useEffect } from "react";

// Focus the route transition on heart‑style emojis for a stronger Valentine vibe
const transitionEmojis = ["💖", "💘", "💝", "💞", "💓", "💗", "❤️", "💕"];

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true);
    const timer = setTimeout(() => setShowOverlay(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Romantic transition overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Petals / hearts scatter */}
            {transitionEmojis.map((emoji, i) => (
              <motion.span
                key={`${location.pathname}-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: "50%",
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.3, 0.5],
                  y: [0, -100 - Math.random() * 150],
                  x: [(Math.random() - 0.5) * 100],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}

            {/* Soft blur overlay */}
            <motion.div
              className="absolute inset-0 bg-background/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with enter animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
