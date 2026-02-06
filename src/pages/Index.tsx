import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import LoveStory from "@/components/LoveStory";
import ReasonsSection from "@/components/ReasonsSection";
import MemoryGallery from "@/components/MemoryGallery";
import ProposalSection from "@/components/ProposalSection";
import NightModeToggle from "@/components/NightModeToggle";

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      <FloatingHearts />
      <NightModeToggle />
      <HeroSection />
      <LoveStory />
      <ReasonsSection />
      <MemoryGallery />
      <ProposalSection />

      {/* Footer */}
      <footer className="bg-gradient-dreamy py-12 text-center">
        <p className="font-handwritten text-2xl text-foreground/60">
          Made with all my love, for you Shalu 🧸💖
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {["🧸", "💖", "💍", "💕", "✨"].map((emoji, i) => (
            <span key={i} className="text-xl animate-bounce-gentle" style={{ animationDelay: `${i * 0.2}s` }}>
              {emoji}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Index;
