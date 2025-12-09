import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  BookOpen,
  MessageCircle,
  Zap,
  Search,
  ArrowRight,
  Shield,
  LineChart,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Analysis",
    description:
      "Track market movements with live data updates. Get instant notifications when stocks hit your target prices or show unusual activity.",
    details: [
      "Live price updates across all major exchanges",
      "Customizable alerts for price movements",
      "Historical data for trend analysis",
    ],
  },
  {
    icon: Sparkles,
    title: "Smart Predictions",
    description:
      "Advanced pattern recognition identifies potential price movements before they happen. Understand market direction with confidence scores.",
    details: [
      "Pattern recognition algorithms",
      "Confidence-weighted predictions",
      "Historical accuracy tracking",
    ],
  },
  {
    icon: PieChart,
    title: "Portfolio Simulator",
    description:
      "Test investment strategies without risking real capital. Build hypothetical portfolios and track their performance over time.",
    details: [
      "Virtual portfolio building",
      "Real-time profit/loss tracking",
      "Performance projections",
    ],
  },
  {
    icon: Activity,
    title: "Market Sentiment",
    description:
      "Gauge the overall market mood through aggregated news analysis and trading patterns. Understand what other investors are thinking.",
    details: [
      "News sentiment analysis",
      "Social media trend tracking",
      "Sector-wise mood indicators",
    ],
  },
  {
    icon: LineChart,
    title: "Trend Highlighter",
    description:
      "Automatically identify trend reversals, breakouts, and unusual volume spikes. Never miss an important market movement.",
    details: [
      "Automatic breakout detection",
      "Volume spike alerts",
      "Trend reversal identification",
    ],
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description:
      "Build your investment knowledge with guided lessons designed for all experience levels. From basics to advanced strategies.",
    details: [
      "Beginner-friendly tutorials",
      "Advanced trading strategies",
      "Interactive quizzes",
    ],
  },
  {
    icon: Search,
    title: "Stock Comparison",
    description:
      "Compare two or more stocks side-by-side. Analyze risk levels, price history, volume, and sentiment to make informed decisions.",
    details: [
      "Side-by-side analysis",
      "Risk comparison metrics",
      "Historical performance overlay",
    ],
  },
  {
    icon: Shield,
    title: "Investment Health Check",
    description:
      "Get a comprehensive grade for your portfolio. Understand your risk exposure, diversification score, and improvement suggestions.",
    details: [
      "Portfolio stability grade",
      "Diversification analysis",
      "Personalized recommendations",
    ],
  },
  {
    icon: MessageCircle,
    title: "Telegram Integration",
    description:
      "Connect your Telegram for instant alerts and insights. Get personalized notifications delivered right to your messenger.",
    details: [
      "Real-time price alerts",
      "Daily market summaries",
      "Custom notification preferences",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container mx-auto px-6 pt-24 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Powerful Features
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Everything You Need to
              <br />
              <span className="text-accent">Invest with Confidence</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Equitix combines powerful analysis tools with intuitive design to help you
              understand markets, test strategies, and make informed investment decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="xl" variant="hero">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="xl" variant="hero-outline">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card variant="elevated" padding="lg" className="h-full">
                  <CardContent className="pt-2">
                    <div className="w-12 h-12 rounded-lg bg-panel flex items-center justify-center mb-5">
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join thousands of investors who trust Equitix for their market analysis.
              Start your free trial today.
            </p>
            <Link to="/signup">
              <Button size="xl" variant="hero">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
