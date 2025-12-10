import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user has accepted T&C before
    const tcAccepted = localStorage.getItem("equitix_tc") === "1";

    login({
      email,
      name: email.split("@")[0],
      acceptedTerms: tcAccepted,
    });

    toast({
      title: "Welcome back",
      description: tcAccepted ? "Redirecting to your dashboard." : "Please accept our Terms & Conditions.",
    });

    setIsLoading(false);
    
    if (tcAccepted) {
      navigate("/dashboard");
    } else {
      navigate("/terms");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-foreground text-background items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <path
              d="M0 300 L50 280 L100 290 L150 250 L200 260 L250 220 L300 240 L350 180 L400 200"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 350 L50 330 L100 340 L150 300 L200 310 L250 270 L300 290 L350 230 L400 250"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
        
        <div className="max-w-md relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                <path
                  d="M6 36L14 28L22 32L30 20L38 24L42 12"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-2xl">Equitix</span>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Welcome back</h2>
          <p className="text-background/60 leading-relaxed">
            Continue your investment journey with real-time analysis of NSE and BSE, 
            learning resources, and community insights.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Logo size="md" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Login to your account</h1>
            <p className="text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-foreground font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
