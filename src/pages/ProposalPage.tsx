import ProposalSection from "@/components/ProposalSection";

const ProposalPage = () => {
  return (
    <>
      <ProposalSection />
      {/* Footer */}
      <footer className="bg-gradient-dreamy py-12 text-center">
        <p className="font-handwritten text-2xl text-foreground/60">
          Made with all my love, for you Shalu 🧸💖
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {["🧸", "💖", "💍", "💕", "✨"].map((emoji, i) => (
            <span
              key={i}
              className="text-xl animate-bounce-gentle"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </footer>
    </>
  );
};

export default ProposalPage;
