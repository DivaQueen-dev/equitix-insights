import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Users, Shield, Zap, LineChart, MessageCircle, Search } from "lucide-react";

const features = [
  { icon: TrendingUp, title: "Smart Predictions", description: "Advanced pattern recognition identifies potential price movements with confidence scores." },
  { icon: BarChart3, title: "Real-time Analysis", description: "Track market movements with live data updates across all major exchanges." },
  { icon: LineChart, title: "Trend Detection", description: "Automatic identification of breakouts, reversals, and volume spikes." },
  { icon: BookOpen, title: "Learning Center", description: "Structured courses from basics to advanced strategies." },
  { icon: Users, title: "Community", description: "Connect with investors, share insights, and learn together." },
  { icon: Shield, title: "Portfolio Simulator", description: "Test strategies with realistic simulations before investing." },
  { icon: Search, title: "Stock Comparison", description: "Compare stocks side-by-side across multiple metrics." },
  { icon: Zap, title: "Health Check", description: "Get portfolio grades, risk exposure, and improvement suggestions." },
  { icon: MessageCircle, title: "Telegram Alerts", description: "Instant notifications delivered to your messenger." },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Powerful Features</h1>
            <p className="text-lg text-muted-foreground">Everything you need to analyze markets and make informed decisions.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors">
                <f.icon className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
            <Link to="/signup"><Button size="lg">Get Started<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
