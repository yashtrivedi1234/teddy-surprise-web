import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const storyPages = [
  {
    emoji: "🌸",
    title: "Chapter 1: The Beginning",
    text: "The day I met you, the whole world felt softer. Like someone had turned every harsh light into a warm glow, just for us.",
  },
  {
    emoji: "☕",
    title: "Chapter 2: Getting Closer",
    text: "We talked for hours about everything and nothing. Every laugh made me fall a little more. I didn't know hearts could feel this full.",
  },
  {
    emoji: "🌙",
    title: "Chapter 3: The Realization",
    text: "One quiet evening, I looked at you and realized — this is it. You're the one my heart had been searching for all along.",
  },
  {
    emoji: "💕",
    title: "Chapter 4: Falling Deep",
    text: "Every moment with you became a memory I wanted to keep forever. You made ordinary days feel like the most beautiful love story.",
  },
  {
    emoji: "🧸",
    title: "Chapter 5: Us, Together",
    text: "Now here we are — two hearts that found their home in each other. And I know this love will only grow with time.",
  },
];

const StoryPage = ({
  page,
  index,
}: {
  page: (typeof storyPages)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex justify-center mb-12 last:mb-0"
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <div
        className={`relative max-w-lg w-full bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-dreamy border border-primary/10 ${
          index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
        }`}
      >
        {/* Decorative tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-secondary/80 rounded-sm rotate-[-2deg]" />
        
        <motion.div
          className="text-4xl mb-3 text-center"
          animate={isInView ? { scale: [0, 1.2, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {page.emoji}
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-handwritten text-gradient-love text-center mb-3">
          {page.title}
        </h3>
        <p className="text-base font-body text-foreground/75 leading-relaxed text-center">
          {page.text}
        </p>
      </div>
    </motion.div>
  );
};

const LoveStory = () => {
  const endRef = useRef(null);
  const endInView = useInView(endRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 px-4 bg-gradient-section overflow-hidden">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-handwritten text-gradient-love mb-3">
          💌 Our Love Story
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          A teddy's diary of us…
        </p>
      </motion.div>

      {/* Story pages */}
      <div className="max-w-2xl mx-auto">
        {storyPages.map((page, index) => (
          <StoryPage key={index} page={page} index={index} />
        ))}
      </div>

      {/* Hidden Surprise #2 - Secret scroll message */}
      <div ref={endRef} className="mt-16 text-center">
        <motion.p
          className="text-2xl md:text-3xl font-handwritten text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={endInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          And this story is only beginning… 🧸✨
        </motion.p>
      </div>
    </section>
  );
};

export default LoveStory;
