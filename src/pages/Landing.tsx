import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  BookOpen,
  MessageCircle,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Analysis",
    description: "Track market movements with live data updates and intelligent trend detection.",
  },
  {
    icon: BarChart3,
    title: "Smart Predictions",
    description: "Advanced analytics that identify patterns and forecast potential price movements.",
  },
  {
    icon: PieChart,
    title: "Portfolio Simulator",
    description: "Test investment strategies with realistic simulations before committing capital.",
  },
  {
    icon: Activity,
    title: "Sentiment Tracking",
    description: "Gauge market mood through aggregated news analysis and social indicators.",
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description: "Build investment knowledge with guided lessons for all experience levels.",
  },
  {
    icon: MessageCircle,
    title: "Telegram Integration",
    description: "Get personalized alerts and insights delivered directly to your messenger.",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2.5M+", label: "Trades Analyzed" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Markets Covered" },
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

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container mx-auto px-6 pt-24 pb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8"
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Intelligent Market Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Invest Smarter.
              <br />
              <span className="text-accent">Predict Better.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Navigate the markets with confidence. Equitix provides real-time analysis, 
              predictive insights, and portfolio simulation tools designed for modern investors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/signup">
                <Button size="xl" variant="hero">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="xl" variant="hero-outline">
                  Explore Features
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What is Equitix */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Equitix?</h2>
            <p className="text-lg text-muted-foreground">
              Equitix is an intelligent stock analysis platform designed for modern investors. 
              We combine real-time market data with advanced analytics to help you understand 
              trends quickly, simulate investments, and make informed trading decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Data-Driven Insights",
                description: "Make decisions backed by comprehensive market analysis and trend identification.",
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                description: "Stay ahead with live market data and instant notification of significant movements.",
              },
              {
                icon: BarChart3,
                title: "Risk Assessment",
                description: "Understand your exposure with detailed risk metrics and portfolio health checks.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card variant="elevated" padding="lg">
                  <CardContent className="pt-2">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze markets, test strategies, and invest with confidence.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card variant="interactive" padding="lg" className="h-full">
                  <CardContent className="pt-2">
                    <div className="w-10 h-10 rounded-lg bg-panel flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our streamlined investment workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Sign Up", description: "Create your free account in seconds." },
              { step: "02", title: "Explore", description: "Browse markets and discover opportunities." },
              { step: "03", title: "Analyze", description: "Use our tools to evaluate investments." },
              { step: "04", title: "Decide", description: "Make informed decisions with confidence." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent/30 mb-4">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Invest Smarter?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join thousands of investors who trust Equitix for their market analysis.
            </p>
            <Link to="/signup">
              <Button size="xl" variant="hero">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
