import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  { id: 1, note: "This moment lives in my heart 🧸💕", color: "bg-baby-pink", rotation: -3 },
  { id: 2, note: "I smile every time I think of this 💖", color: "bg-peach", rotation: 2 },
  { id: 3, note: "One of my favorite days with you 🌸", color: "bg-lavender", rotation: -1 },
  { id: 4, note: "You looked so beautiful here ✨", color: "bg-cream", rotation: 3 },
  { id: 5, note: "I want a million more moments like this 💕", color: "bg-baby-pink", rotation: -2 },
  { id: 6, note: "My heart was so full this day 🧸", color: "bg-peach", rotation: 1 },
];

const MemoryCard = ({ memory, index }: { memory: typeof memories[0]; index: number }) => {
  const [showNote, setShowNote] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotate: `${memory.rotation}deg` }}
    >
      <motion.div
        className={`${memory.color} rounded-2xl p-3 shadow-dreamy`}
        whileHover={{ scale: 1.05, rotate: 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowNote(!showNote)}
      >
        {/* Ribbon decoration */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">🎀</div>

        {/* Polaroid frame */}
        <div className="bg-card/90 rounded-xl p-2 pb-8 shadow-soft">
          <div className="w-full aspect-square bg-secondary/50 rounded-lg flex items-center justify-center overflow-hidden">
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            >
              {["📸", "🌸", "🎀", "✨", "💕", "🧸"][index]}
            </motion.span>
          </div>
          <p className="font-handwritten text-center text-foreground/60 text-lg mt-2">
            Memory #{memory.id}
          </p>
        </div>

        {/* Tap hint */}
        <motion.p
          className="text-xs font-body text-center text-muted-foreground mt-2"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to reveal 🔐
        </motion.p>
      </motion.div>

      {/* Hidden Surprise #4 - Photo Easter Egg */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNote(false)}
          >
            <motion.div
              className="bg-card rounded-2xl p-5 shadow-dreamy border-2 border-primary/20 mx-2"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <p className="font-handwritten text-xl text-primary text-center">
                {memory.note}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MemoryGallery = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-section overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-handwritten text-gradient-love mb-3">
          📸 Memory Gallery
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          Each photo holds a secret note… tap to find them 🔐
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {memories.map((memory, index) => (
          <MemoryCard key={memory.id} memory={memory} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MemoryGallery;
