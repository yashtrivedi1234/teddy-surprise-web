import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

const NightModeToggle = () => {
  const [isNight, setIsNight] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (isNight) {
      const newStars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
      }));
      setStars(newStars);
      document.documentElement.classList.add("dark");
    } else {
      setStars([]);
      document.documentElement.classList.remove("dark");
    }
  }, [isNight]);

  return (
    <>
      {/* Moon toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card shadow-dreamy border border-primary/20 flex items-center justify-center text-xl cursor-pointer"
        onClick={() => setIsNight(!isNight)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Toggle night mode 🌙"
      >
        {isNight ? "☀️" : "🌙"}
      </motion.button>

      {/* Night overlay with stars - Hidden Surprise #6 */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Stars */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-accent"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}

            {/* Secret night message */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <motion.p
                className="font-handwritten text-3xl md:text-5xl text-accent-foreground drop-shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Good night, my forever Shalu 🌙💞
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NightModeToggle;
