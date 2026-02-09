import { Outlet } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import NightModeToggle from "@/components/NightModeToggle";
import BackgroundMusic from "@/components/BackgroundMusic";
import RomanticNav from "@/components/RomanticNav";
import PageTransition from "@/components/PageTransition";

const AppLayout = () => {

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
