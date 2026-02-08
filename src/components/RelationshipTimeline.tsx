import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    date: "22 Feb 2025",
    title: "First Meeting in College",
    emoji: "🎓",
    description: "The day our eyes met for the first time in college. That one glance changed everything forever.",
    color: "from-baby-pink to-peach",
    side: "left" as const,
  },
  {
    date: "10 March 2025",
    title: "Our First Call",
    emoji: "📞",
    description: "Remember how nervous we were? That first call felt like a whole new chapter beginning.",
    color: "from-lavender to-baby-pink",
    side: "right" as const,
  },
  {
    date: "20 May 2025",
    title: "First Long Call",
    emoji: "🌙",
    description: "We talked for hours and hours… time stopped, and all that existed was your voice and mine.",
    color: "from-peach to-cream",
    side: "left" as const,
  },
  {
    date: "30 May 2025",
    title: "You Sent Me Your Pic 💕",
    emoji: "📸",
    description: "The moment I saw your picture in May, my heart skipped a beat. You looked like a dream I never wanted to wake up from.",
    color: "from-baby-pink to-lavender",
    side: "right" as const,
  },
  {
    date: "10 June 2025",
    title: "The Flower Date 🌹",
    emoji: "🌸",
    description: "Flowers for the most beautiful flower in my life. That day was pure magic — just you, me, and a bouquet of love.",
    color: "from-rose to-baby-pink",
    side: "left" as const,
  },
  {
    date: "22 July 2025",
    title: "Crypto Teaching Date 📈",
    emoji: "💰",
    description: "I taught you about crypto, but honestly? You were the one investing in my heart. Best teacher-student moment ever.",
    color: "from-cream to-peach",
    side: "right" as const,
  },
  {
    date: "10 Jan 2026",
    title: "You Sent Me Your Pic Again 🥰",
    emoji: "💌",
    description: "And once again, you left me speechless. Every time I see your face, I fall in love all over again.",
    color: "from-lavender to-rose",
    side: "left" as const,
  },
  {
    date: "26 Jan 2026",
    title: "Party Date & MERN Teaching 🎉",
    emoji: "🎊",
    description: "Republic Day party + MERN teaching session = the most fun date ever! We celebrated, we coded, we laughed — perfect combo.",
    color: "from-peach to-lavender",
    side: "right" as const,
  },
];

const MilestoneCard = ({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isLeft = milestone.side === "left";

  return (
    <div
      ref={ref}
      className={`flex items-center w-full mb-8 md:mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:gap-8`}
    >
      {/* Card */}
      <motion.div
        className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}
        initial={{
          opacity: 0,
          x: isLeft ? -80 : 80,
          scale: 0.9,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1 }
            : {}
        }
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div
          className={`relative bg-card/90 backdrop-blur-sm rounded-3xl p-6 shadow-dreamy border border-primary/10 overflow-hidden`}
        >
          {/* Gradient accent bar */}
          <div
            className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} w-1.5 h-full bg-gradient-to-b ${milestone.color}`}
          />

          {/* Date badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full mb-3"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.4, type: "spring", damping: 12 }}
          >
            <span className="text-xs font-body font-semibold text-primary">
              {milestone.date}
            </span>
          </motion.div>

          <div className="flex items-center gap-3 mb-2">
            <motion.span
              className="text-3xl"
              animate={isInView ? { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {milestone.emoji}
            </motion.span>
            <h3 className="text-xl md:text-2xl font-handwritten text-gradient-love">
              {milestone.title}
            </h3>
          </div>

          <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
            {milestone.description}
          </p>

          {/* Sparkle decoration */}
          <motion.span
            className="absolute bottom-2 right-3 text-lg opacity-40"
            animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </div>
      </motion.div>

      {/* Center dot on timeline */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <motion.div
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, type: "spring", damping: 10 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shadow-dreamy">
            <span className="text-lg">{milestone.emoji}</span>
          </div>
          {/* Pulse ring */}
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
        </motion.div>
      </div>

      {/* Mobile dot */}
      <motion.div
        className="md:hidden my-3"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shadow-soft">
          <span className="text-sm">{milestone.emoji}</span>
        </div>
      </motion.div>

      {/* Spacer for the other side */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
};

const RelationshipTimeline = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-24 px-4 bg-gradient-dreamy overflow-hidden">
      {/* Floating decorations */}
      {["💕", "🌸", "✨", "🧸", "💫"].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none opacity-30"
          style={{
            left: `${5 + i * 20}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Section header */}
      <motion.div
        ref={headerRef}
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-handwritten text-gradient-love mb-3">
          💞 Our Journey Together
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          Every date, every moment — written in the stars ✨
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-primary/40 via-rose/30 to-primary/40"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* Mobile vertical line */}
        <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/20 via-rose/20 to-primary/20" />

        {/* Milestone cards */}
        {milestones.map((milestone, index) => (
          <MilestoneCard key={index} milestone={milestone} index={index} />
        ))}

        {/* Timeline end heart */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 10 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shadow-dreamy">
            <motion.span
              className="text-2xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💖
            </motion.span>
          </div>
        </motion.div>

        <motion.p
          className="text-center mt-6 text-2xl font-handwritten text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          And this is just the beginning… 🧸💕
        </motion.p>
      </div>
    </section>
  );
};

export default RelationshipTimeline;
