import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-neutral max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Equitix, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use at Your Own Risk</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users acknowledge that all investment decisions made using Equitix are at their own risk. The platform provides data, analysis, and insights for informational purposes only. Past performance does not guarantee future results.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Not Financial Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix does not provide financial, investment, legal, or tax advice. The information presented on this platform should not be construed as professional financial advice. Always consult with a qualified financial advisor before making investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Accuracy</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information, Equitix makes no warranties regarding the accuracy, completeness, or reliability of any data or analysis presented on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or any investment decisions made based on information provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. Users agree to conduct their own due diligence before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Equitix reserves the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: December 2024
            </p>
            <Link to="/signup">
              <Button>Continue to Sign Up</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
