import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";

export default function Terms() {
  const [accepted, setAccepted] = useState(false);
  const { user, isAuthenticated, acceptTerms } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccept = () => {
    if (!accepted) {
      toast({
        title: "Please accept the terms",
        description: "You must accept the Terms & Conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    // Store T&C acceptance
    localStorage.setItem("equitix_tc", "1");
    acceptTerms();

    toast({
      title: "Terms accepted",
      description: "Redirecting to your dashboard.",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <Logo size="md" />
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center">Terms and Conditions</h1>
          <p className="text-muted-foreground text-center mb-8">
            Please read and accept our terms before continuing
          </p>
          
          <div className="prose prose-neutral max-w-none space-y-6 p-6 rounded-2xl border border-border bg-card">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Equitix, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Educational Use Only</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix is designed for educational purposes only. All information, analysis, predictions, and insights provided on this platform are meant to help users learn about the stock market and investment strategies. This is not intended to be used as the sole basis for investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Use at Your Own Risk</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users acknowledge that all investment decisions made using Equitix are at their own risk. The platform provides data, analysis, and insights for informational purposes only. Past performance does not guarantee future results. Stock markets are inherently volatile and unpredictable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Not Financial Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix does not provide financial, investment, legal, or tax advice. The information presented on this platform should not be construed as professional financial advice. Always consult with a SEBI-registered financial advisor before making investment decisions in Indian markets.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Accuracy</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information about NSE and BSE markets, Equitix makes no warranties regarding the accuracy, completeness, or reliability of any data or analysis presented on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or any investment decisions made based on information provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. Users agree to conduct their own due diligence before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix reserves the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>

          {isAuthenticated && !user?.acceptedTerms && (
            <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-start gap-3 mb-6">
                <Checkbox
                  id="accept-terms"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                  className="mt-1"
                />
                <Label
                  htmlFor="accept-terms"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I have read and accept the Terms & Conditions. I understand that Equitix provides educational content only and is not financial advice. I will use this platform at my own risk.
                </Label>
              </div>
              <Button onClick={handleAccept} className="w-full h-12" disabled={!accepted}>
                Accept and Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {!isAuthenticated && (
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: December 2024
              </p>
              <Button onClick={() => navigate("/signup")}>
                Continue to Sign Up
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
