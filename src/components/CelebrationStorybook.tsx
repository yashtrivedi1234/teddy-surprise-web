import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teddyHug from "@/assets/teddy-hug.png";

const storyPages = [
  {
    emoji: "💍",
    title: "She Said Yes!",
    text: "The most beautiful word in the world, spoken by the most beautiful person in the world.",
    bg: "from-primary/20 to-rose/20",
  },
  {
    emoji: "🧸",
    title: "Two Hearts, One Story",
    text: "From the first hello to forever — every moment with you has been a chapter I never want to end.",
    bg: "from-lavender/30 to-baby-pink/30",
  },
  {
    emoji: "🎂",
    title: "Our Wedding Cake Awaits",
    text: "Layer by layer, sweet like our love. Soon we'll cut this cake together, hand in hand, as husband and wife.",
    bg: "from-peach/30 to-cream/30",
    showCake: true,
  },
  {
    emoji: "💕",
    title: "Forever & Always",
    text: "I promise to love you in every sunrise, every sunset, every heartbeat. This is just the beginning of our forever.",
    bg: "from-primary/20 to-lavender/20",
  },
];

const CakeAnimation = () => (
  <motion.div
    className="relative flex flex-col items-center my-6"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", delay: 0.5 }}
  >
    {/* Candles */}
    <motion.div className="flex gap-4 mb-1">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="flex flex-col items-center">
          <motion.span
            className="text-lg"
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.3 }}
          >
            🕯️
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
    
    {/* Cake layers */}
    <div className="flex flex-col items-center">
      <motion.div
        className="w-24 h-8 bg-gradient-to-r from-primary to-rose rounded-t-xl border-2 border-primary-foreground/20 flex items-center justify-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs text-primary-foreground font-bold">S ❤ S</span>
      </motion.div>
      <motion.div
        className="w-32 h-8 bg-gradient-to-r from-peach to-baby-pink border-2 border-primary-foreground/20 flex items-center justify-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.0 }}
      >
        <span className="text-xs">💖💖💖</span>
      </motion.div>
      <motion.div
        className="w-40 h-10 bg-gradient-to-r from-cream to-lavender rounded-b-lg border-2 border-primary-foreground/20 flex items-center justify-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-sm font-handwritten text-primary">Forever</span>
      </motion.div>
    </div>
    
    {/* Sparkles around cake */}
    {[...Array(6)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute text-lg"
        style={{
          left: `${20 + i * 12}%`,
          top: `${10 + (i % 3) * 30}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.2, 0.5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
        }}
      >
        ✨
      </motion.span>
    ))}
  </motion.div>
);

const CelebrationStorybook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => {
        if (prev >= storyPages.length - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <motion.div
      className="text-center z-40 w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 12 }}
    >
      {/* Teddy hug */}
      <motion.img
        src={teddyHug}
        alt="Happy teddy bear"
        className="w-36 h-36 md:w-48 md:h-48 object-contain mx-auto mb-4 drop-shadow-2xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [-3, 3, -3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Storybook */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={`bg-gradient-to-br ${storyPages[currentPage].bg} backdrop-blur-sm rounded-3xl p-8 shadow-dreamy border border-primary/20`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="text-5xl block mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.3 }}
            >
              {storyPages[currentPage].emoji}
            </motion.span>
            
            <motion.h2
              className="text-3xl md:text-5xl font-handwritten text-gradient-love mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {storyPages[currentPage].title}
            </motion.h2>
            
            <motion.p
              className="text-base md:text-lg font-body text-foreground/80 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {storyPages[currentPage].text}
            </motion.p>

            {storyPages[currentPage].showCake && <CakeAnimation />}
          </motion.div>
        </AnimatePresence>

        {/* Page navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {storyPages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setCurrentPage(i);
                setAutoPlay(false);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentPage ? "bg-primary" : "bg-primary/30"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Bottom emojis */}
      <motion.div
        className="mt-6 flex justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        {["💍", "🧸", "💖", "🎂", "🌸", "💕"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl md:text-3xl"
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
  );
};

export default CelebrationStorybook;
