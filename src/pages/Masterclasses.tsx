import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, User, BarChart, CheckCircle, Play, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Chapter {
  title: string;
  duration: string;
}

interface Masterclass {
  id: string;
  topic: string;
  instructor: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  overview: string;
  whatYouLearn: string[];
  chapters: Chapter[];
  thumbnail: string;
}

const masterclasses: Masterclass[] = [
  {
    id: "1",
    topic: "Understanding Market Cycles",
    instructor: "Sarah Chen",
    difficulty: "Intermediate",
    duration: "2h 15m",
    description: "Learn to identify and capitalize on recurring market patterns.",
    overview: "Markets move in cycles. Understanding these patterns gives you an edge in timing your investments. This masterclass breaks down the four phases of market cycles and teaches you to recognize where we are at any given time.",
    whatYouLearn: ["Identify the four phases of market cycles", "Recognize key indicators for each phase", "Develop timing strategies based on cycle analysis", "Avoid common timing mistakes"],
    chapters: [{ title: "Introduction to Cycles", duration: "15m" }, { title: "The Accumulation Phase", duration: "25m" }, { title: "The Markup Phase", duration: "30m" }, { title: "The Distribution Phase", duration: "25m" }, { title: "The Decline Phase", duration: "20m" }, { title: "Practical Application", duration: "20m" }],
    thumbnail: "MC"
  },
  {
    id: "2",
    topic: "Technical Analysis Fundamentals",
    instructor: "Michael Roberts",
    difficulty: "Beginner",
    duration: "3h 00m",
    description: "Master the basics of reading charts and identifying patterns.",
    overview: "Technical analysis is the study of price movements through charts. This comprehensive course covers everything from candlestick patterns to support and resistance levels.",
    whatYouLearn: ["Read and interpret candlestick charts", "Identify support and resistance levels", "Recognize common chart patterns", "Use volume analysis effectively"],
    chapters: [{ title: "Chart Basics", duration: "20m" }, { title: "Candlestick Patterns", duration: "35m" }, { title: "Trend Lines", duration: "25m" }, { title: "Support & Resistance", duration: "30m" }, { title: "Chart Patterns", duration: "40m" }, { title: "Volume Analysis", duration: "30m" }],
    thumbnail: "TA"
  },
  {
    id: "3",
    topic: "Risk Management Strategies",
    instructor: "David Park",
    difficulty: "Advanced",
    duration: "2h 30m",
    description: "Protect your portfolio with professional risk management techniques.",
    overview: "Risk management separates successful investors from the rest. Learn position sizing, stop-loss strategies, and portfolio allocation techniques used by professionals.",
    whatYouLearn: ["Calculate optimal position sizes", "Set effective stop-loss levels", "Diversify your portfolio properly", "Manage drawdowns and volatility"],
    chapters: [{ title: "Why Risk Management Matters", duration: "15m" }, { title: "Position Sizing", duration: "30m" }, { title: "Stop-Loss Strategies", duration: "35m" }, { title: "Portfolio Allocation", duration: "30m" }, { title: "Managing Drawdowns", duration: "25m" }, { title: "Building a Risk Plan", duration: "15m" }],
    thumbnail: "RM"
  },
  {
    id: "4",
    topic: "Fundamental Analysis Deep Dive",
    instructor: "Emily Watson",
    difficulty: "Intermediate",
    duration: "2h 45m",
    description: "Evaluate companies like a professional analyst.",
    overview: "Fundamental analysis helps you understand a company's true value. Learn to read financial statements, calculate key ratios, and make informed investment decisions.",
    whatYouLearn: ["Read income statements and balance sheets", "Calculate valuation ratios", "Analyze competitive advantages", "Identify undervalued stocks"],
    chapters: [{ title: "Financial Statements 101", duration: "25m" }, { title: "Income Statement Analysis", duration: "30m" }, { title: "Balance Sheet Analysis", duration: "30m" }, { title: "Valuation Metrics", duration: "35m" }, { title: "Competitive Analysis", duration: "25m" }, { title: "Case Studies", duration: "20m" }],
    thumbnail: "FA"
  },
  {
    id: "5",
    topic: "Building a Long-term Portfolio",
    instructor: "James Miller",
    difficulty: "Beginner",
    duration: "1h 45m",
    description: "Create a diversified portfolio designed for steady growth.",
    overview: "Long-term investing is about building wealth over time. This masterclass teaches you how to construct a portfolio that balances growth and stability.",
    whatYouLearn: ["Define your investment goals", "Choose the right asset allocation", "Select quality investments", "Rebalance your portfolio"],
    chapters: [{ title: "Investment Goals", duration: "15m" }, { title: "Asset Allocation", duration: "25m" }, { title: "Stock Selection", duration: "25m" }, { title: "ETFs and Index Funds", duration: "20m" }, { title: "Rebalancing Strategies", duration: "20m" }],
    thumbnail: "LP"
  },
  {
    id: "6",
    topic: "Psychology of Trading",
    instructor: "Dr. Lisa Thompson",
    difficulty: "Advanced",
    duration: "2h 00m",
    description: "Master your emotions and develop a winning mindset.",
    overview: "Your psychology is your greatest asset or liability. Learn to control emotions, avoid common biases, and develop the mental discipline of successful traders.",
    whatYouLearn: ["Recognize cognitive biases", "Control fear and greed", "Develop trading discipline", "Build a sustainable routine"],
    chapters: [{ title: "The Emotional Investor", duration: "20m" }, { title: "Common Biases", duration: "25m" }, { title: "Fear and Greed", duration: "25m" }, { title: "Discipline and Routine", duration: "25m" }, { title: "Mental Frameworks", duration: "25m" }],
    thumbnail: "PT"
  },
];

export default function Masterclasses() {
  const [selectedClass, setSelectedClass] = useState<Masterclass | null>(null);
  const [completedClasses, setCompletedClasses] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("equitix-completed-classes");
    if (stored) setCompletedClasses(JSON.parse(stored));
  }, []);

  const toggleComplete = (id: string) => {
    const updated = completedClasses.includes(id)
      ? completedClasses.filter((c) => c !== id)
      : [...completedClasses, id];
    setCompletedClasses(updated);
    localStorage.setItem("equitix-completed-classes", JSON.stringify(updated));
  };

  const recommendedClasses = masterclasses.filter(
    (m) => m.difficulty === "Beginner" && !completedClasses.includes(m.id)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-accent-gold/10 text-accent-gold border-accent-gold/20";
      case "Advanced": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Masterclasses</h1>
          <p className="text-lg text-muted-foreground">Learn directly from seasoned market experts.</p>
        </motion.div>

        {/* Recommended Section */}
        {recommendedClasses.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Recommended for You</h2>
            <Swiper modules={[Autoplay]} spaceBetween={16} slidesPerView="auto" autoplay={{ delay: 5000, disableOnInteraction: false }} className="!overflow-visible">
              {recommendedClasses.map((mc) => (
                <SwiperSlide key={mc.id} className="!w-80">
                  <div onClick={() => setSelectedClass(mc)} className="p-6 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-all cursor-pointer group">
                    <div className="w-full h-32 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground/5 transition-colors">
                      <span className="text-3xl font-bold text-muted-foreground">{mc.thumbnail}</span>
                    </div>
                    <Badge className={getDifficultyColor(mc.difficulty)}>{mc.difficulty}</Badge>
                    <h3 className="font-semibold mt-3 mb-1">{mc.topic}</h3>
                    <p className="text-sm text-muted-foreground">{mc.instructor}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* All Masterclasses Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-semibold mb-6">All Masterclasses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterclasses.map((mc, i) => (
              <motion.div
                key={mc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedClass(mc)}
                className="p-6 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-all cursor-pointer group relative"
              >
                {completedClasses.includes(mc.id) && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                )}
                <div className="w-full h-32 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground/5 transition-colors">
                  <span className="text-3xl font-bold text-muted-foreground">{mc.thumbnail}</span>
                </div>
                <Badge className={getDifficultyColor(mc.difficulty)}>{mc.difficulty}</Badge>
                <h3 className="font-semibold mt-3 mb-1">{mc.topic}</h3>
                <p className="text-sm text-muted-foreground mb-3">{mc.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{mc.instructor}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{mc.duration}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Class<ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedClass(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-border flex items-start justify-between sticky top-0 bg-card z-10">
                <div>
                  <Badge className={getDifficultyColor(selectedClass.difficulty)}>{selectedClass.difficulty}</Badge>
                  <h2 className="text-2xl font-semibold mt-2">{selectedClass.topic}</h2>
                  <p className="text-muted-foreground">{selectedClass.instructor}</p>
                </div>
                <button onClick={() => setSelectedClass(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                <div>
                  <h3 className="font-semibold mb-3">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedClass.overview}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {selectedClass.whatYouLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Chapters ({selectedClass.chapters.length})</h3>
                  <div className="space-y-2">
                    {selectedClass.chapters.map((chapter, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </div>
                          <span className="text-sm font-medium">{chapter.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{chapter.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />Start Class
                  </Button>
                  <Button
                    variant={completedClasses.includes(selectedClass.id) ? "default" : "outline"}
                    onClick={() => toggleComplete(selectedClass.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedClasses.includes(selectedClass.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
