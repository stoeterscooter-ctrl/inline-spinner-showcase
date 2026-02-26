import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudioLayout } from "@/components/studio/StudioLayout";
import { studioComponents } from "@/components/studio/studioComponents";
import Playground from "./pages/Playground";
import Index from "./pages/Index";
import GooeySwitchShowcase from "./pages/GooeySwitchShowcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Playground landing */}
          <Route path="/" element={<Playground />} />

          {/* Studio routes */}
          <Route
            path="/studio/*"
            element={
              <StudioLayout components={studioComponents}>
                <Routes>
                  <Route index element={<Index />} />
                  <Route path="gooey-switch" element={<GooeySwitchShowcase />} />
                </Routes>
              </StudioLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
