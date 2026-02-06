import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    text: "Your smile lights up my entire universe 🌟",
    secret: "You make my world feel soft and safe",
    emoji: "🧸",
  },
  {
    text: "The way you care for everyone around you 💛",
    secret: "Your kindness makes me want to be better every day",
    emoji: "🌸",
  },
  {
    text: "Your laugh is my favorite sound ever 🎵",
    secret: "I replay your laugh in my head when I miss you",
    emoji: "🎀",
  },
  {
    text: "You make the simplest moments magical ✨",
    secret: "You're my favorite human forever 💖",
    emoji: "💫",
  },
  {
    text: "The way you understand without words 💕",
    secret: "You read my heart like an open book",
    emoji: "📖",
  },
  {
    text: "How you make every day worth waking up for 🌅",
    secret: "My mornings start with thoughts of you",
    emoji: "☀️",
  },
];

const ReasonCard = ({ reason, index }: { reason: typeof reasons[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      {/* Speech bubble */}
      <motion.div
        className="bg-card rounded-3xl p-6 shadow-soft border border-primary/10 relative cursor-pointer"
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Teddy emoji */}
        <motion.span
          className="absolute -top-4 -left-2 text-3xl"
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          {reason.emoji}
        </motion.span>

        <p className="font-body text-foreground/85 text-base pl-4">
          {reason.text}
        </p>

        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-card border-b border-r border-primary/10 rotate-45" />

        {/* Hidden Surprise #3 - Hover magic */}
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 12 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-3 border-t border-primary/10">
            <p className="font-handwritten text-xl text-primary text-center">
              🔐 Secret: "{reason.secret}" 💖
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ReasonsSection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-dreamy overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-handwritten text-gradient-love mb-3">
          🎀 Reasons I Love You
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          Hover over each one for a secret surprise… 🔐
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {reasons.map((reason, index) => (
          <ReasonCard key={index} reason={reason} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ReasonsSection;
