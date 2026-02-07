import LoveStory from "@/components/LoveStory";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OurStoryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <LoveStory />
      <div className="py-12 bg-gradient-dreamy text-center">
        <motion.button
          onClick={() => navigate("/reasons")}
          className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-lg rounded-full shadow-dreamy glow-pink"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why I Love You 🎀
        </motion.button>
      </div>
    </>
  );
};

export default OurStoryPage;
