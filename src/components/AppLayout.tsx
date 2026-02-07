import { useState } from "react";
import { Outlet } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import NightModeToggle from "@/components/NightModeToggle";
import BackgroundMusic from "@/components/BackgroundMusic";
import RomanticNav from "@/components/RomanticNav";
import LoveRiddleGate from "@/components/LoveRiddleGate";
import PageTransition from "@/components/PageTransition";

const AppLayout = () => {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <LoveRiddleGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="relative overflow-x-hidden">
      <FloatingHearts />
      <NightModeToggle />
      <BackgroundMusic />
      <RomanticNav />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
};

export default AppLayout;
