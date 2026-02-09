import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const letterLines = [
  { text: "My Dearest Love,", delay: 0, size: "text-3xl md:text-4xl" },
  { text: "", delay: 0.1, size: "" },
  {
    text: "From the very first moment I saw you, something inside me just knew — you were the one my heart had been waiting for.",
    delay: 0.15,
    size: "text-lg md:text-xl",
  },
  { text: "", delay: 0.2, size: "" },
  {
    text: "Your smile lights up my darkest days, and your laughter is the sweetest melody I've ever heard. Every second with you feels like a dream I never want to wake up from.",
    delay: 0.25,
    size: "text-lg md:text-xl",
  },
  { text: "", delay: 0.3, size: "" },
  {
    text: "I love how you scrunch your nose when you laugh. I love how you care so deeply about everyone around you. I love how you make even the most ordinary moments feel extraordinary.",
    delay: 0.35,
    size: "text-lg md:text-xl",
  },
  { text: "", delay: 0.4, size: "" },
  {
    text: "You are my sunshine on cloudy days, my calm in every storm, and my reason to believe in forever.",
    delay: 0.45,
    size: "text-lg md:text-xl",
  },
  { text: "", delay: 0.5, size: "" },
  {
    text: "I promise to hold your hand through every chapter of our story — the happy ones, the tough ones, and every beautiful one in between.",
    delay: 0.55,
    size: "text-lg md:text-xl",
  },
  { text: "", delay: 0.6, size: "" },
  {
    text: "You are not just my love — you are my home.",
    delay: 0.65,
    size: "text-xl md:text-2xl",
  },
  { text: "", delay: 0.7, size: "" },
  {
    text: "Forever & always yours,",
    delay: 0.75,
    size: "text-lg md:text-xl",
  },
  {
    text: "Your Teddy 🧸💕",
    delay: 0.8,
    size: "text-2xl md:text-3xl",
  },
];

const LetterLine = ({
  line,
  index,
}: {
  line: (typeof letterLines)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (line.text === "") {
    return <div ref={ref} className="h-6" />;
  }

  return (
    <motion.p
      ref={ref}
      className={`font-handwritten ${line.size} text-foreground/85 leading-relaxed`}
      initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, x: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.9,
        delay: line.delay * 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {line.text}
    </motion.p>
  );
};

const SealAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="flex justify-center mt-12"
      initial={{ scale: 0, rotate: -180 }}
      animate={isInView ? { scale: 1, rotate: 0 } : {}}
      transition={{ duration: 1, type: "spring", damping: 12 }}
    >
      <div className="relative w-24 h-24">
        {/* Wax seal */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose to-primary shadow-dreamy" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center">
          <span className="text-3xl">💌</span>
        </div>
        {/* Glow */}
        <motion.div
          className="absolute -inset-3 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const LoveLetter = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const envelopeY = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const envelopeOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const flapRotate = useTransform(scrollYProgress, [0.05, 0.2], [0, 180]);
  const letterSlide = useTransform(scrollYProgress, [0.15, 0.35], [200, 0]);
  const letterOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 bg-gradient-section overflow-hidden"
    >
      {/* Floating decorations */}
      {["✨", "💕", "🌸", "💫", "🦋", "✨"].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-handwritten text-gradient-love mb-3">
          💌 A Letter For You
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          Scroll slowly and read with your heart…
        </p>
      </motion.div>

      {/* Envelope */}
      <motion.div
        className="max-w-3xl mx-auto mb-8 flex justify-center"
        style={{ y: envelopeY, opacity: envelopeOpacity }}
      >
        <div className="relative w-64 h-40">
          {/* Envelope body */}
          <div className="absolute inset-0 bg-gradient-to-b from-peach to-secondary rounded-2xl shadow-dreamy border border-primary/10" />
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-20 origin-top"
            style={{
              rotateX: flapRotate,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="w-0 h-0 mx-auto"
              style={{
                borderLeft: "128px solid transparent",
                borderRight: "128px solid transparent",
                borderTop: `80px solid hsl(var(--warm-pink))`,
                borderRadius: "8px",
              }}
            />
          </motion.div>
          {/* Heart on envelope */}
          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </div>
      </motion.div>

      {/* Letter paper */}
      <motion.div
        className="max-w-2xl mx-auto"
        style={{ y: letterSlide, opacity: letterOpacity }}
      >
        <div className="relative">
          {/* Paper background */}
          <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-dreamy border border-primary/10 relative overflow-hidden">
            {/* Paper texture lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-8 right-8 border-b border-primary/5"
                style={{ top: `${60 + i * 36}px` }}
              />
            ))}

            {/* Decorative corner */}
            <div className="absolute top-4 right-4 text-3xl opacity-40">
              🌹
            </div>
            <div className="absolute bottom-4 left-4 text-3xl opacity-40">
              🧸
            </div>

            {/* Letter content */}
            <div className="relative z-10 space-y-1">
              {letterLines.map((line, index) => (
                <LetterLine key={index} line={line} index={index} />
              ))}
            </div>

            {/* Wax seal */}
            <SealAnimation />
          </div>

          {/* Paper shadow */}
          <div className="absolute -bottom-2 left-4 right-4 h-4 bg-foreground/5 rounded-full blur-md" />
        </div>
      </motion.div>

      {/* Bottom sparkle message */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <motion.p
          className="text-2xl md:text-3xl font-handwritten text-primary"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Every word written with love, just for you ✨
        </motion.p>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
