import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Users, Shield, Zap } from "lucide-react";
import { Logo } from "@/components/Logo";
import gsap from "gsap";

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2.5M+", label: "Analyses Run" },
  { value: "NSE/BSE", label: "Markets" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  {
    icon: TrendingUp,
    title: "Smart Predictions",
    description: "Advanced analytics identifying patterns across NSE and BSE with confidence scores.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analysis",
    description: "Track NIFTY, SENSEX, and individual stocks with live data updates and trend detection.",
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description: "Build investment knowledge with guided lessons designed for Indian market investors.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow investors, share insights, and learn from experienced traders.",
  },
  {
    icon: Shield,
    title: "Portfolio Simulator",
    description: "Test investment strategies with realistic INR simulations before committing real capital.",
  },
  {
    icon: Zap,
    title: "Telegram Alerts",
    description: "Get notified of market movements and opportunities via our Telegram bot integration.",
  },
];

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 gradient-radial" />
        
        {/* Floating Elements - Indian Market inspired */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-success/10 rounded-full blur-3xl"
          />
          
          {/* Decorative chart line */}
          <svg
            className="absolute bottom-32 left-0 right-0 w-full h-32 opacity-10"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80 L100 60 L200 70 L300 40 L400 50 L500 30 L600 45 L700 25 L800 35 L900 15 L1000 25 L1100 10 L1200 20"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-background/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
                <span className="text-sm text-muted-foreground">
                  Trusted by 50,000+ investors across India
                </span>
              </div>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 opacity-0"
            >
              Invest Smarter.
              <br />
              <span className="text-muted-foreground">Predict Better.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0"
            >
              Simplifying stock market insights for everyone in India. 
              Navigate NSE and BSE with confidence using real-time analysis and predictive insights.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
              <Link to="/signup">
                <Button size="lg" className="h-14 px-10 text-base">
                  Sign Up
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="h-14 px-10 text-base">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-semibold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              What is Equitix?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Equitix is India's intelligent investment platform that combines real-time market 
              analysis with comprehensive learning resources. Built for the Indian market, we help 
              investors of all levels understand NSE and BSE trends, simulate strategies, and make informed decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Data-Driven Insights",
                description: "Make decisions backed by comprehensive analysis of NIFTY 50, SENSEX, and individual stocks.",
              },
              {
                title: "Education First",
                description: "Learn from structured courses, masterclasses, and a supportive community of Indian investors.",
              },
              {
                title: "Risk Management",
                description: "Understand your exposure with detailed risk metrics and INR-based portfolio assessments.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-8 rounded-2xl bg-background border border-border hover:border-foreground/20 transition-colors hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                  <span className="text-xl font-semibold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze the Indian market, learn investing, and build confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-background flex items-center justify-center mb-6 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              Ready to Invest Smarter?
            </h2>
            <p className="text-lg opacity-70 mb-12">
              Join thousands of Indian investors who trust Equitix for their market analysis and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 px-10 text-base bg-background text-foreground hover:bg-background/90"
                >
                  Sign Up Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-base border-background/30 text-background hover:bg-background/10"
                >
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
