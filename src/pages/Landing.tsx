import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Users, Shield, Zap } from "lucide-react";
import gsap from "gsap";

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2.5M+", label: "Analyses Run" },
  { value: "150+", label: "Markets" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  {
    icon: TrendingUp,
    title: "Smart Predictions",
    description: "Advanced analytics that identify patterns and forecast potential price movements with confidence scores.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analysis",
    description: "Track market movements with live data updates and intelligent trend detection across all major exchanges.",
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description: "Build investment knowledge with guided lessons designed for beginners to advanced traders.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow investors, share insights, and learn from experienced traders.",
  },
  {
    icon: Shield,
    title: "Portfolio Simulator",
    description: "Test investment strategies with realistic simulations before committing real capital.",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Get notified of market movements and opportunities via Telegram integration.",
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
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute inset-0 gradient-radial" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[15%] w-64 h-64 bg-muted/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-muted/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-soft" />
              <span className="text-sm text-muted-foreground">
                Trusted by 50,000+ investors worldwide
              </span>
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
              Navigate markets with confidence using real-time analysis, 
              predictive insights, and comprehensive learning resources.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
              <Link to="/signup">
                <Button size="lg" className="h-12 px-8 text-base">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  Explore Features
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
              Equitix is an intelligent investment platform that combines real-time market 
              analysis with comprehensive learning resources. We help investors of all levels 
              understand trends, simulate strategies, and make informed decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Data-Driven Insights",
                description: "Make decisions backed by comprehensive market analysis and intelligent pattern recognition.",
              },
              {
                title: "Education First",
                description: "Learn from structured courses, masterclasses, and a supportive community of investors.",
              },
              {
                title: "Risk Management",
                description: "Understand your exposure with detailed risk metrics and portfolio health assessments.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-8 rounded-2xl bg-background border border-border hover:border-foreground/20 transition-colors"
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
              Everything you need to analyze markets, learn investing, and build confidence.
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
                className="group p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-all duration-300"
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

      {/* Learning Preview */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Learning Center
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
                Master the Markets
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From understanding candlestick patterns to advanced risk management, 
                our structured learning paths help you build real investment skills.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Beginner-friendly tutorials",
                  "Expert-led masterclasses",
                  "Interactive community discussions",
                  "Practical portfolio exercises",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/guide">
                <Button variant="outline">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-muted border border-border overflow-hidden">
                <div className="p-6 space-y-4">
                  {[
                    { title: "Introduction to Stock Markets", progress: 100 },
                    { title: "Reading Chart Patterns", progress: 75 },
                    { title: "Risk Management Basics", progress: 45 },
                    { title: "Building Your First Portfolio", progress: 0 },
                  ].map((course, i) => (
                    <div
                      key={course.title}
                      className="p-4 rounded-xl bg-background border border-border"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{course.title}</span>
                        <span className="text-xs text-muted-foreground">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6">
              Learn Together, Grow Together
            </h2>
            <p className="text-muted-foreground mb-12">
              Join a community of thoughtful investors sharing knowledge, discussing strategies, 
              and supporting each other on the investment journey.
            </p>
            <Link to="/community">
              <Button>
                Join the Community
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
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
              Join thousands of investors who trust Equitix for their market analysis and learning.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-background text-foreground hover:bg-background/90"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
