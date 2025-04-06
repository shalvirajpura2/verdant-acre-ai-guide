
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import FarmerAdvisorPage from "./pages/FarmerAdvisorPage";
import MarketResearcherPage from "./pages/MarketResearcherPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/farmer-advisor" element={<FarmerAdvisorPage />} />
        <Route path="/market-researcher" element={<MarketResearcherPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
