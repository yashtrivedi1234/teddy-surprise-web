import MemoryGallery from "@/components/MemoryGallery";
import RelationshipTimeline from "@/components/RelationshipTimeline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MemoriesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <RelationshipTimeline />
      <MemoryGallery />
      <div className="py-12 bg-gradient-dreamy text-center">
        <motion.button
          onClick={() => navigate("/countdown")}
          className="px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-lg rounded-full shadow-dreamy glow-pink"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Countdown 💍
        </motion.button>
      </div>
    </>
  );
};

export default MemoriesPage;
