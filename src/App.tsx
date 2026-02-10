import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import OurStoryPage from "./pages/OurStoryPage";
import ReasonsPage from "./pages/ReasonsPage";
import MemoriesPage from "./pages/MemoriesPage";
import CountdownPage from "./pages/CountdownPage";
import LoveLetterPage from "./pages/LoveLetterPage";
import ProposalPage from "./pages/ProposalPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/reasons" element={<ReasonsPage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/countdown" element={<CountdownPage />} />
            <Route path="/love-letter" element={<LoveLetterPage />} />
            <Route path="/proposal" element={<ProposalPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
