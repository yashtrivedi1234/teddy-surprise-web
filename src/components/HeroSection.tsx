import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teddyHero from "@/assets/teddy-hero.png";
import girlAvatar from "@/assets/girl-avatar.png";

const HeroSection = () => {
  const [showLetter, setShowLetter] = useState(false);
  const [miniHearts, setMiniHearts] = useState<number[]>([]);

  const handleTeddyClick = () => {
    setShowLetter(true);
    // Spawn mini hearts
    const newHearts = Array.from({ length: 12 }, (_, i) => Date.now() + i);
    setMiniHearts(newHearts);
    setTimeout(() => setMiniHearts([]), 3000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-dreamy overflow-hidden px-4">
      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            fontSize: 10 + Math.random() * 14,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.h1
        className="text-5xl md:text-7xl font-handwritten text-gradient-love text-center mb-2 z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Hey Beautiful…
      </motion.h1>

      <motion.p
        className="text-2xl md:text-3xl font-handwritten text-foreground/80 text-center mb-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        This Teddy Has Something to Tell You 🧸💖
      </motion.p>

      {/* Girl avatar */}
      <motion.div
        className="mb-4 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-primary/30 shadow-dreamy">
          <img src={girlAvatar} alt="Her" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Clickable Teddy */}
      <motion.div
        className="relative cursor-pointer z-20"
        onClick={handleTeddyClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <img
          src={teddyHero}
          alt="Cute teddy bear holding a heart"
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
        />
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-body font-medium text-primary bg-card/80 px-4 py-1.5 rounded-full shadow-soft">
            Tap me! 🧸
          </span>
        </motion.div>

        {/* Mini hearts on click */}
        <AnimatePresence>
          {miniHearts.map((id, i) => (
            <motion.span
              key={id}
              className="absolute text-lg pointer-events-none"
              style={{ left: "50%", top: "50%" }}
              initial={{ opacity: 1, scale: 0 }}
              animate={{
                opacity: 0,
                scale: 1,
                x: (Math.random() - 0.5) * 200,
                y: -80 - Math.random() * 120,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: i * 0.08 }}
            >
              💖
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.p
        className="text-lg font-body text-muted-foreground mt-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        ↓ Scroll down for more surprises ↓
      </motion.p>

      {/* Love Letter Popup - Hidden Surprise #1 */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setShowLetter(false)}
            />
            <motion.div
              className="relative bg-card rounded-3xl p-8 md:p-12 max-w-md w-full shadow-dreamy border-2 border-primary/20"
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💌
                </motion.div>
                <h3 className="text-3xl font-handwritten text-gradient-love mb-4">
                  A Secret Message…
                </h3>
                <p className="text-lg font-body text-foreground/80 leading-relaxed">
                  You are the safest place my heart has ever known 💕
                </p>
                <motion.div
                  className="mt-6 flex justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {["💖", "🧸", "💖"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
                <button
                  onClick={() => setShowLetter(false)}
                  className="mt-6 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  Close with love 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
