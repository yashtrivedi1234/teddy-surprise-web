import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-02-14T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const units: { label: string; value: number; emoji: string }[] = [
    { label: "Days", value: timeLeft.days, emoji: "🧸" },
    { label: "Hours", value: timeLeft.hours, emoji: "💖" },
    { label: "Minutes", value: timeLeft.minutes, emoji: "✨" },
    { label: "Seconds", value: timeLeft.seconds, emoji: "💕" },
  ];

  return (
    <section className="relative py-24 px-4 bg-gradient-dreamy overflow-hidden">
      {/* Decorative sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-lg pointer-events-none"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        >
          ✨
        </motion.span>
      ))}

      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-handwritten text-gradient-love mb-3">
          💍 Counting Down to Forever
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          Every second brings us closer… 🧸💖
        </p>
      </motion.div>

      {/* Countdown cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-dreamy border border-primary/10 text-center"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="block text-2xl mb-2"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {unit.emoji}
              </motion.span>

              <motion.span
                className="block text-4xl md:text-5xl font-handwritten text-gradient-love leading-none"
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>

              <span className="block text-sm font-body font-semibold text-muted-foreground mt-2 uppercase tracking-wider">
                {unit.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Special date label */}
      <motion.p
        className="text-center mt-10 font-handwritten text-2xl text-primary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        Until Valentine's Day 2026 — Our Special Day 💕
      </motion.p>
    </section>
  );
};

export default CountdownTimer;
