import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teddyProposal from "@/assets/teddy-proposal.png";
import teddyHug from "@/assets/teddy-hug.png";

const ProposalSection = () => {
  const [answered, setAnswered] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [heartsRain, setHeartsRain] = useState<number[]>([]);

  const handleYes = () => {
    setAnswered(true);
    // Trigger hearts rain
    const hearts = Array.from({ length: 50 }, (_, i) => i);
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
      {/* Hearts rain - Hidden Surprise #5 */}
      <AnimatePresence>
        {heartsRain.map((i) => (
          <motion.span
            key={i}
            className="fixed text-2xl z-50 pointer-events-none"
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
              delay: Math.random() * 2,
              ease: "easeIn",
            }}
          >
            {["💖", "💕", "💗", "🧸", "💍", "✨", "🌸", "💞"][i % 8]}
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
            className="mb-8"
          >
            <motion.img
              src={teddyProposal}
              alt="Teddy bear with ring"
              className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Proposal text */}
          <motion.h2
            className="text-4xl md:text-6xl font-handwritten text-gradient-love text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Shalu, will you marry me? 💍
          </motion.h2>

          <motion.p
            className="text-lg font-body text-foreground/70 text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
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
              Yes 🧸💖
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
        /* After saying Yes - Hidden Surprise #5 reveal */
        <motion.div
          className="text-center z-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          {/* Teddy hug */}
          <motion.img
            src={teddyHug}
            alt="Happy teddy bear"
            className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto mb-6 drop-shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [-3, 3, -3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.h2
            className="text-5xl md:text-7xl font-handwritten text-gradient-love mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            She said YES! 💍✨
          </motion.h2>

          <motion.p
            className="text-2xl font-handwritten text-foreground/80 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            🧸 *teddy happy dance* 🧸
          </motion.p>

          <motion.div
            className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-dreamy border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="font-handwritten text-2xl text-primary leading-relaxed">
              "I promise to love you in every lifetime." 💕
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {["💍", "🧸", "💖", "✨", "🌸", "💕"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProposalSection;
