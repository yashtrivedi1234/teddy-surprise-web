import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const hearts = ["💖", "💕", "💗", "💓", "💞", "🧸", "✨", "🌸"];

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingHearts = () => {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: Date.now() + Math.random(),
        emoji: hearts[Math.floor(Math.random() * hearts.length)],
        left: Math.random() * 100,
        delay: 0,
        duration: 4 + Math.random() * 4,
        size: 14 + Math.random() * 18,
      };

      setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "100vh", opacity: 0.8, x: `${heart.left}vw` }}
            animate={{ y: "-10vh", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "easeOut" }}
            className="absolute"
            style={{ fontSize: heart.size }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
