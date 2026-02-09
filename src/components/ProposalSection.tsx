import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teddyProposal from "@/assets/teddy-proposal.png";
import CelebrationStorybook from "./CelebrationStorybook";

const ProposalSection = () => {
  const [answered, setAnswered] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [heartsRain, setHeartsRain] = useState<number[]>([]);

  const handleYes = () => {
    setAnswered(true);
    const hearts = Array.from({ length: 80 }, (_, i) => i);
    setHeartsRain(hearts);
  };

  const handleNoHover = useCallback(() => {
    setNoButtonPos({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-proposal overflow-hidden px-4 py-24">
      {/* Romantic sparkles background */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={`sparkle-${i}`}
          className="absolute text-sm pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          {["✨", "💫", "⭐", "🌟"][i % 4]}
        </motion.span>
      ))}

      {/* Hearts rain celebration */}
      <AnimatePresence>
        {heartsRain.map((i) => (
          <motion.span
            key={i}
            className="fixed text-2xl md:text-3xl z-50 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-5%",
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: "110vh",
              opacity: [1, 1, 0.5],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              ease: "easeIn",
            }}
          >
            {["💖", "💕", "💗", "🧸", "💍", "✨", "🌸", "💞", "🎂", "🥂"][i % 10]}
          </motion.span>
        ))}
      </AnimatePresence>

      {!answered ? (
        <>
          {/* Teddy with ring */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-6 relative"
          >
            {/* Glowing ring behind teddy */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.img
              src={teddyProposal}
              alt="Teddy bear with ring"
              className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Romantic proposal text */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-lg md:text-xl font-handwritten text-foreground/60 mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨ My dearest love ✨
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-handwritten text-gradient-love">
              Will you marry me? 💍
            </h2>
          </motion.div>

          <motion.p
            className="text-base md:text-lg font-body text-foreground/70 text-center mb-10 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Every love story is beautiful, but ours is my favorite. 
            This teddy has been waiting to ask you this… 🧸
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={handleYes}
              className="px-10 py-4 bg-primary text-primary-foreground font-body font-semibold text-xl rounded-full shadow-dreamy glow-pink"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px hsl(340 72% 65% / 0.3)",
                  "0 0 40px hsl(340 72% 65% / 0.5)",
                  "0 0 20px hsl(340 72% 65% / 0.3)",
                ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              Yes, Forever! 🧸💖
            </motion.button>

            <motion.button
              className="px-8 py-3 bg-muted text-muted-foreground font-body text-lg rounded-full"
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              onHoverStart={handleNoHover}
              onTouchStart={handleNoHover}
              transition={{ type: "spring", stiffness: 300 }}
            >
              No 😢
            </motion.button>
          </motion.div>
        </>
      ) : (
        <CelebrationStorybook />
      )}
    </section>
  );
};

export default ProposalSection;
