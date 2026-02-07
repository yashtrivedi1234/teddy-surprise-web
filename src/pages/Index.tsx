import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection />
      {/* Navigation hint */}
      <motion.div
        className="py-16 bg-gradient-section text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-handwritten text-2xl text-foreground/60 mb-8">
          Explore our love story… 💕
        </p>
        <motion.button
          onClick={() => navigate("/our-story")}
          className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-lg rounded-full shadow-dreamy glow-pink"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Our Story 💌
        </motion.button>
      </motion.div>
    </>
  );
};

export default Index;
