import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Protected routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute><Portfolio /></ProtectedRoute>
            } />
            <Route path="/stock/:symbol" element={
              <ProtectedRoute><StockDetails /></ProtectedRoute>
            } />
            <Route path="/simulator" element={
              <ProtectedRoute><Simulator /></ProtectedRoute>
            } />
            <Route path="/analysis" element={
              <ProtectedRoute><Analysis /></ProtectedRoute>
            } />
            <Route path="/guide" element={
              <ProtectedRoute><Guide /></ProtectedRoute>
            } />
            <Route path="/masterclasses" element={
              <ProtectedRoute><Masterclasses /></ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute><Community /></ProtectedRoute>
            } />
            <Route path="/bot" element={
              <ProtectedRoute><Bot /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;