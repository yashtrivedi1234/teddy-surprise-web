import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const riddles = [
  {
    question: "I have no legs, but I can travel the world. I have no eyes, but I can make you cry. I have no hands, but I can hold you forever. What am I?",
    answer: "love",
    hint: "It's the most powerful thing between us 💕",
  },
  {
    question: "I'm given to you but you can't see me. I'm felt in the heart but never held. I grow stronger the more you share me. What am I?",
    answer: "love",
    hint: "What does this teddy feel for Shalu? 🧸",
  },
  {
    question: "I beat without a drum. I flutter without wings. I break without a sound. But when I'm yours, I sing. What am I?",
    answer: "heart",
    hint: "It beats for you, Shalu 💖",
  },
];

interface LoveRiddleGateProps {
  onUnlock: () => void;
}

const LoveRiddleGate = ({ onUnlock }: LoveRiddleGateProps) => {
  const [riddle] = useState(() => riddles[Math.floor(Math.random() * riddles.length)]);
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = guess.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === riddle.answer) {
      setUnlocking(true);
      setTimeout(onUnlock, 2000);
    } else {
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 1500);
    }
  };

  return (
    <AnimatePresence>
      {!unlocking ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-dreamy overflow-hidden px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-xl pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {["✨", "💫", "⭐", "🌸", "💖"][i % 5]}
            </motion.span>
          ))}

          <motion.div
            className="relative max-w-md w-full"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Teddy guard */}
            <motion.div
              className="text-7xl text-center mb-4"
              animate={{ rotate: [-5, 5, -5], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🧸
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-handwritten text-gradient-love text-center mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              A Secret For Shalu 💌
            </motion.h1>

            <motion.p
              className="text-base font-body text-foreground/60 text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Solve the riddle to unlock my heart…
            </motion.p>

            {/* Riddle card */}
            <motion.div
              className="bg-card/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-dreamy border border-primary/20 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p className="font-handwritten text-xl md:text-2xl text-foreground/90 leading-relaxed text-center">
                "{riddle.question}"
              </p>
            </motion.div>

            {/* Answer form */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <motion.div
                animate={wrongAttempt ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Type your answer…"
                  className="w-full px-6 py-4 rounded-2xl bg-background/80 border-2 border-primary/30 font-body text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                  autoFocus
                  maxLength={50}
                />
              </motion.div>

              <AnimatePresence>
                {wrongAttempt && (
                  <motion.p
                    className="text-center font-handwritten text-lg text-destructive"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Not quite… try again, my love 💕
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-lg rounded-2xl shadow-dreamy glow-pink"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Unlock My Heart 💖
              </motion.button>

              {/* Hint button */}
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                Need a hint? 🤫
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.p
                    className="text-center font-handwritten text-lg text-primary"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {riddle.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </motion.div>
      ) : (
        /* Unlock animation */
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-dreamy"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 0.8], opacity: [1, 1, 0] }}
            transition={{ duration: 1.8 }}
          >
            <motion.span
              className="text-7xl block mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1.5 }}
            >
              💖
            </motion.span>
            <p className="text-3xl font-handwritten text-gradient-love">
              Welcome, Shalu ✨
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoveRiddleGate;
