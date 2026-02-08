import LoveLetter from "@/components/LoveLetter";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoveLetterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <LoveLetter />
      <div className="py-12 bg-gradient-dreamy text-center">
        <motion.button
          onClick={() => navigate("/proposal")}
          className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-lg rounded-full shadow-dreamy glow-pink"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Big Question 💍
        </motion.button>
      </div>
    </>
  );
};

export default LoveLetterPage;
