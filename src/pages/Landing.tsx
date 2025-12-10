import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Users, Shield, Zap, Sparkles, Star } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FloatingOrbs } from "@/components/ui/glow-effect";
import { AnimatedCard, StaggerContainer, StaggerItem } from "@/components/ui/animated-card";
import gsap from "gsap";

const stats = [
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "2.5M+", label: "Analyses Run", icon: BarChart3 },
  { value: "NSE/BSE", label: "Markets", icon: TrendingUp },
  { value: "99.9%", label: "Uptime", icon: Shield },
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

const testimonials = [
  { name: "Rahul M.", role: "Investor", text: "Equitix transformed how I approach the market. The insights are invaluable." },
  { name: "Priya S.", role: "Trader", text: "The masterclasses alone are worth it. I've learned more here than years of self-study." },
  { name: "Vikram K.", role: "Student", text: "Perfect for beginners. The community is supportive and the tools are intuitive." },
];

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mt-4">
          <nav className="container mx-auto px-6 h-16 flex items-center justify-between rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5">
            <Logo size="md" />
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hover:bg-gold/10">Login</Button>
              </Link>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" className="gradient-gold text-primary-foreground shadow-lg shadow-gold/20">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 gradient-radial" />
        <FloatingOrbs />
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-20 left-0 right-0 w-full h-40 opacity-30" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <motion.path
              d="M0 80 L100 60 L200 70 L300 40 L400 50 L500 30 L600 45 L700 25 L800 35 L900 15 L1000 25 L1100 10 L1200 20"
              stroke="hsl(var(--accent-gold))"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm shadow-lg shadow-gold/10"
              >
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-success"
                />
                <span className="text-sm font-medium text-foreground">
                  Trusted by 50,000+ investors across India
                </span>
                <Star className="w-4 h-4 text-gold fill-gold" />
              </motion.div>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 opacity-0"
              style={{ perspective: '1000px' }}
            >
              <span className="block">Invest Smarter.</span>
              <span className="block mt-2 gradient-text">Predict Better.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 leading-relaxed"
            >
              Simplifying stock market insights for everyone in India. 
              Navigate NSE and BSE with confidence using real-time analysis and predictive insights.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="h-14 px-10 text-base gradient-gold text-primary-foreground shadow-xl shadow-gold/25 hover:shadow-gold/40 transition-shadow">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg" className="h-14 px-10 text-base border-gold/30 hover:bg-gold/5 hover:border-gold/50">
                    Login
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-4xl mx-auto" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center hover:border-gold/30 transition-colors"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-3 text-gold" />
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
          >
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-gold rounded-full" 
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="py-32 bg-surface relative">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6"
            >
              About Equitix
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What is Equitix?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Equitix is India's intelligent investment platform that combines real-time market 
              analysis with comprehensive learning resources. Built for the Indian market, we help 
              investors of all levels understand NSE and BSE trends, simulate strategies, and make informed decisions.
            </p>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
            {[
              {
                title: "Data-Driven Insights",
                description: "Make decisions backed by comprehensive analysis of NIFTY 50, SENSEX, and individual stocks.",
                icon: BarChart3,
              },
              {
                title: "Education First",
                description: "Learn from structured courses, masterclasses, and a supportive community of Indian investors.",
                icon: BookOpen,
              },
              {
                title: "Risk Management",
                description: "Understand your exposure with detailed risk metrics and INR-based portfolio assessments.",
                icon: Shield,
              },
            ].map((item, index) => (
              <StaggerItem key={item.title}>
                <AnimatedCard className="p-8 h-full hover:border-gold/30">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6"
                  >
                    <item.icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-sm font-medium mb-6"
            >
              Features
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze the Indian market, learn investing, and build confidence.
            </p>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" staggerDelay={0.1}>
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <AnimatedCard className="p-8 group hover:border-gold/30">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center mb-6 group-hover:from-gold/30 transition-colors"
                  >
                    <feature.icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What Investors Say</h2>
          </motion.div>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <AnimatedCard className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-semibold text-sm">
                      {t.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald rounded-full blur-3xl" 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-gold" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Invest Smarter?
            </h2>
            <p className="text-lg opacity-70 mb-12">
              Join thousands of Indian investors who trust Equitix for their market analysis and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="h-14 px-10 text-base bg-background text-foreground hover:bg-background/90 shadow-xl"
                  >
                    Sign Up Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-10 text-base border-background/30 text-background hover:bg-background/10"
                  >
                    Login
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2024 Equitix. For educational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
