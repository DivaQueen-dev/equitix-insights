import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Clock, User, CheckCircle, Play, ChevronRight, Mail, Send } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useToast } from "@/hooks/use-toast";
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
  image: string;
}

const masterclasses: Masterclass[] = [
  {
    id: "1",
    topic: "Understanding Market Cycles",
    instructor: "Rakesh Sharma",
    difficulty: "Intermediate",
    duration: "2h 15m",
    description: "Learn to identify and capitalize on recurring market patterns in NSE/BSE.",
    overview: "Markets move in cycles. Understanding these patterns gives you an edge in timing your investments. This masterclass breaks down the four phases of market cycles and teaches you to recognize where we are at any given time.",
    whatYouLearn: ["Identify the four phases of market cycles", "Recognize key indicators for each phase", "Develop timing strategies based on cycle analysis", "Avoid common timing mistakes"],
    chapters: [{ title: "Introduction to Cycles", duration: "15m" }, { title: "The Accumulation Phase", duration: "25m" }, { title: "The Markup Phase", duration: "30m" }, { title: "The Distribution Phase", duration: "25m" }, { title: "The Decline Phase", duration: "20m" }, { title: "Practical Application", duration: "20m" }],
    thumbnail: "MC",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    topic: "Technical Analysis Fundamentals",
    instructor: "Priya Patel",
    difficulty: "Beginner",
    duration: "3h 00m",
    description: "Master the basics of reading charts and identifying patterns.",
    overview: "Technical analysis is the study of price movements through charts. This comprehensive course covers everything from candlestick patterns to support and resistance levels.",
    whatYouLearn: ["Read and interpret candlestick charts", "Identify support and resistance levels", "Recognize common chart patterns", "Use volume analysis effectively"],
    chapters: [{ title: "Chart Basics", duration: "20m" }, { title: "Candlestick Patterns", duration: "35m" }, { title: "Trend Lines", duration: "25m" }, { title: "Support & Resistance", duration: "30m" }, { title: "Chart Patterns", duration: "40m" }, { title: "Volume Analysis", duration: "30m" }],
    thumbnail: "TA",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    topic: "Risk Management Strategies",
    instructor: "Vikram Singh",
    difficulty: "Advanced",
    duration: "2h 30m",
    description: "Protect your portfolio with professional risk management techniques.",
    overview: "Risk management separates successful investors from the rest. Learn position sizing, stop-loss strategies, and portfolio allocation techniques used by professionals.",
    whatYouLearn: ["Calculate optimal position sizes", "Set effective stop-loss levels", "Diversify your portfolio properly", "Manage drawdowns and volatility"],
    chapters: [{ title: "Why Risk Management Matters", duration: "15m" }, { title: "Position Sizing", duration: "30m" }, { title: "Stop-Loss Strategies", duration: "35m" }, { title: "Portfolio Allocation", duration: "30m" }, { title: "Managing Drawdowns", duration: "25m" }, { title: "Building a Risk Plan", duration: "15m" }],
    thumbnail: "RM",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    topic: "Fundamental Analysis Deep Dive",
    instructor: "Ananya Reddy",
    difficulty: "Intermediate",
    duration: "2h 45m",
    description: "Evaluate companies like a professional analyst.",
    overview: "Fundamental analysis helps you understand a company's true value. Learn to read financial statements, calculate key ratios, and make informed investment decisions.",
    whatYouLearn: ["Read income statements and balance sheets", "Calculate valuation ratios", "Analyze competitive advantages", "Identify undervalued stocks"],
    chapters: [{ title: "Financial Statements 101", duration: "25m" }, { title: "Income Statement Analysis", duration: "30m" }, { title: "Balance Sheet Analysis", duration: "30m" }, { title: "Valuation Metrics", duration: "35m" }, { title: "Competitive Analysis", duration: "25m" }, { title: "Case Studies", duration: "20m" }],
    thumbnail: "FA",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    topic: "Building a Long-term Portfolio",
    instructor: "Deepak Kumar",
    difficulty: "Beginner",
    duration: "1h 45m",
    description: "Create a diversified portfolio designed for steady growth.",
    overview: "Long-term investing is about building wealth over time. This masterclass teaches you how to construct a portfolio that balances growth and stability.",
    whatYouLearn: ["Define your investment goals", "Choose the right asset allocation", "Select quality investments", "Rebalance your portfolio"],
    chapters: [{ title: "Investment Goals", duration: "15m" }, { title: "Asset Allocation", duration: "25m" }, { title: "Stock Selection", duration: "25m" }, { title: "ETFs and Index Funds", duration: "20m" }, { title: "Rebalancing Strategies", duration: "20m" }],
    thumbnail: "LP",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    topic: "Psychology of Trading",
    instructor: "Dr. Neha Iyer",
    difficulty: "Advanced",
    duration: "2h 00m",
    description: "Master your emotions and develop a winning mindset.",
    overview: "Your psychology is your greatest asset or liability. Learn to control emotions, avoid common biases, and develop the mental discipline of successful traders.",
    whatYouLearn: ["Recognize cognitive biases", "Control fear and greed", "Develop trading discipline", "Build a sustainable routine"],
    chapters: [{ title: "The Emotional Investor", duration: "20m" }, { title: "Common Biases", duration: "25m" }, { title: "Fear and Greed", duration: "25m" }, { title: "Discipline and Routine", duration: "25m" }, { title: "Mental Frameworks", duration: "25m" }],
    thumbnail: "PT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  },
];

export default function Masterclasses() {
  const [selectedClass, setSelectedClass] = useState<Masterclass | null>(null);
  const [completedClasses, setCompletedClasses] = useState<string[]>([]);
  const [enrollEmail, setEnrollEmail] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollingClass, setEnrollingClass] = useState<Masterclass | null>(null);
  const { toast } = useToast();

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

  const handleEnroll = async (mc: Masterclass) => {
    setEnrollingClass(mc);
    setShowEnrollModal(true);
  };

  const submitEnrollment = async () => {
    if (!enrollEmail || !enrollingClass) return;
    
    setIsEnrolling(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store enrollment
    const enrollments = JSON.parse(localStorage.getItem("equitix-enrollments") || "[]");
    enrollments.push({
      classId: enrollingClass.id,
      className: enrollingClass.topic,
      email: enrollEmail,
      enrolledAt: new Date().toISOString()
    });
    localStorage.setItem("equitix-enrollments", JSON.stringify(enrollments));
    
    toast({
      title: "Enrollment Successful",
      description: `Confirmation email sent to ${enrollEmail} for "${enrollingClass.topic}"`,
    });
    
    setIsEnrolling(false);
    setShowEnrollModal(false);
    setEnrollEmail("");
    setEnrollingClass(null);
  };

  const recommendedClasses = masterclasses.filter(
    (m) => m.difficulty === "Beginner" && !completedClasses.includes(m.id)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-gold/10 text-gold border-gold/20";
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
                  <div onClick={() => setSelectedClass(mc)} className="rounded-2xl border border-border bg-card hover:border-gold/30 transition-all cursor-pointer group overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img src={mc.image} alt={mc.topic} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>
                    <div className="p-5">
                      <Badge className={getDifficultyColor(mc.difficulty)}>{mc.difficulty}</Badge>
                      <h3 className="font-semibold mt-3 mb-1">{mc.topic}</h3>
                      <p className="text-sm text-muted-foreground">{mc.instructor}</p>
                    </div>
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
                className="rounded-2xl border border-border bg-card hover:border-gold/30 transition-all cursor-pointer group relative overflow-hidden"
              >
                {completedClasses.includes(mc.id) && (
                  <div className="absolute top-4 right-4 z-10">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                )}
                <div className="relative h-44 overflow-hidden" onClick={() => setSelectedClass(mc)}>
                  <img src={mc.image} alt={mc.topic} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-5" onClick={() => setSelectedClass(mc)}>
                  <Badge className={getDifficultyColor(mc.difficulty)}>{mc.difficulty}</Badge>
                  <h3 className="font-semibold mt-3 mb-1">{mc.topic}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{mc.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{mc.instructor}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{mc.duration}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedClass(mc)}>
                    View Class
                  </Button>
                  <Button size="sm" className="flex-1 gradient-gold text-primary-foreground" onClick={() => handleEnroll(mc)}>
                    <Mail className="w-4 h-4 mr-1" />
                    Enroll
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Class Details Modal */}
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
              <div className="relative h-48 overflow-hidden">
                <img src={selectedClass.image} alt={selectedClass.topic} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button onClick={() => setSelectedClass(null)} className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 -mt-12 relative">
                <Badge className={getDifficultyColor(selectedClass.difficulty)}>{selectedClass.difficulty}</Badge>
                <h2 className="text-2xl font-semibold mt-2">{selectedClass.topic}</h2>
                <p className="text-muted-foreground">{selectedClass.instructor}</p>
              </div>

              <div className="p-6 pt-0 space-y-8">
                <div>
                  <h3 className="font-semibold mb-3">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedClass.overview}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {selectedClass.whatYouLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />
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
                          <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-sm font-medium">
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
                  <Button className="flex-1 gradient-gold text-primary-foreground">
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

      {/* Email Enrollment Modal */}
      <AnimatePresence>
        {showEnrollModal && enrollingClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowEnrollModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Enroll in Masterclass</h2>
                  <p className="text-sm text-muted-foreground mt-1">{enrollingClass.topic}</p>
                </div>
                <button onClick={() => setShowEnrollModal(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="enroll-email">Email Address</Label>
                  <Input
                    id="enroll-email"
                    type="email"
                    placeholder="Enter your email"
                    value={enrollEmail}
                    onChange={(e) => setEnrollEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  You will receive a confirmation email with class details and access instructions.
                </p>

                <Button 
                  onClick={submitEnrollment} 
                  className="w-full h-12 gradient-gold text-primary-foreground"
                  disabled={!enrollEmail || isEnrolling}
                >
                  {isEnrolling ? (
                    <>Sending confirmation...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Confirm Enrollment
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}