import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StockDetails from "./pages/StockDetails";
import Simulator from "./pages/Simulator";
import Features from "./pages/Features";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Bot from "./pages/Bot";
import Masterclasses from "./pages/Masterclasses";
import Community from "./pages/Community";
import Guide from "./pages/Guide";
import Analysis from "./pages/Analysis";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stock/:symbol" element={<StockDetails />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/masterclasses" element={<Masterclasses />} />
            <Route path="/community" element={<Community />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bot" element={<Bot />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
