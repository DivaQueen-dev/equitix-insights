import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, BookOpen, ArrowRight, CheckCircle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string[];
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

const chapters: Chapter[] = [
  {
    id: "1",
    title: "Introduction to the Stock Market",
    description: "Understanding the fundamentals of how markets work",
    lessons: [
      { id: "1-1", title: "What is a Stock?", duration: "5 min", content: ["A stock represents ownership in a company. When you buy a stock, you're purchasing a small piece of that company.", "Stocks are also called shares or equity. Owning stock makes you a shareholder.", "Companies issue stock to raise money for growth, research, or other business needs.", "As a shareholder, you may benefit from the company's growth through stock price appreciation or dividends."] },
      { id: "1-2", title: "How Stock Markets Work", duration: "8 min", content: ["Stock markets are organized exchanges where buyers and sellers trade stocks.", "The two largest U.S. exchanges are the NYSE and NASDAQ.", "Stock prices are determined by supply and demand - when more people want to buy than sell, prices go up.", "Trading happens during market hours, typically 9:30 AM to 4:00 PM Eastern Time."] },
      { id: "1-3", title: "Key Market Participants", duration: "6 min", content: ["Individual investors like you buy and sell stocks for personal portfolios.", "Institutional investors (mutual funds, pension funds) manage large pools of money.", "Market makers ensure there's always someone to trade with by providing liquidity.", "Brokers execute trades on behalf of investors and provide trading platforms."] },
    ],
  },
  {
    id: "2",
    title: "Reading Stock Charts",
    description: "Learn to interpret price movements and patterns",
    lessons: [
      { id: "2-1", title: "Understanding Candlestick Charts", duration: "10 min", content: ["Candlesticks show four price points: open, high, low, and close.", "A green/white candle means the price closed higher than it opened.", "A red/black candle means the price closed lower than it opened.", "The 'wick' or 'shadow' shows the high and low prices during that period."] },
      { id: "2-2", title: "Support and Resistance Levels", duration: "8 min", content: ["Support is a price level where a stock tends to stop falling and bounce back up.", "Resistance is where a stock tends to stop rising and pull back.", "These levels form because of collective investor psychology.", "When broken, support can become resistance and vice versa."] },
      { id: "2-3", title: "Common Chart Patterns", duration: "12 min", content: ["Head and Shoulders patterns often signal trend reversals.", "Double tops and double bottoms indicate potential price turning points.", "Triangles (ascending, descending, symmetrical) show consolidation before breakouts.", "Learning to recognize patterns takes practice but can improve timing."] },
    ],
  },
  {
    id: "3",
    title: "Understanding Risk",
    description: "Managing risk to protect your investments",
    lessons: [
      { id: "3-1", title: "Types of Investment Risk", duration: "7 min", content: ["Market risk affects all investments when the overall market declines.", "Company risk is specific to individual businesses and their performance.", "Inflation risk occurs when returns don't keep pace with rising prices.", "Liquidity risk means you might not be able to sell when you want to."] },
      { id: "3-2", title: "Risk vs. Reward", duration: "6 min", content: ["Higher potential returns usually come with higher risk.", "Your risk tolerance depends on your goals, timeline, and personality.", "Younger investors can often take more risk due to longer time horizons.", "Never invest money you can't afford to lose."] },
      { id: "3-3", title: "Diversification Basics", duration: "8 min", content: ["Don't put all your eggs in one basket - spread investments across assets.", "Diversification reduces the impact of any single investment's poor performance.", "Consider diversifying across sectors, company sizes, and geographies.", "ETFs and index funds offer instant diversification."] },
    ],
  },
  {
    id: "4",
    title: "Analyzing Stocks",
    description: "Evaluating investments before you buy",
    lessons: [
      { id: "4-1", title: "Fundamental Analysis Basics", duration: "10 min", content: ["Fundamental analysis evaluates a company's financial health and value.", "Key metrics include earnings, revenue, profit margins, and debt levels.", "Compare metrics to industry peers to gauge relative value.", "Look at trends over time, not just single data points."] },
      { id: "4-2", title: "Key Financial Ratios", duration: "12 min", content: ["P/E ratio (Price to Earnings) shows what you pay for each dollar of earnings.", "P/B ratio (Price to Book) compares stock price to the company's net assets.", "ROE (Return on Equity) measures how efficiently a company uses shareholder money.", "Debt-to-Equity ratio indicates financial leverage and risk."] },
      { id: "4-3", title: "Reading Company Financials", duration: "15 min", content: ["The income statement shows revenue, expenses, and profit over time.", "The balance sheet displays assets, liabilities, and equity at a point in time.", "The cash flow statement tracks actual money moving in and out.", "Focus on trends and compare to competitors for context."] },
    ],
  },
  {
    id: "5",
    title: "Building Your First Portfolio",
    description: "Practical steps to start investing",
    lessons: [
      { id: "5-1", title: "Setting Investment Goals", duration: "6 min", content: ["Define what you're investing for: retirement, home, education, etc.", "Set specific, measurable targets with realistic timeframes.", "Your goals determine your strategy and risk tolerance.", "Review and adjust goals as your life circumstances change."] },
      { id: "5-2", title: "Choosing Your First Investments", duration: "10 min", content: ["Index funds are often recommended for beginners due to diversification.", "Start with companies and industries you understand.", "Consider your conviction level and how much research you've done.", "It's okay to start small while you're learning."] },
      { id: "5-3", title: "Creating a Simple Strategy", duration: "8 min", content: ["Decide on an asset allocation that matches your goals and risk tolerance.", "Consider dollar-cost averaging: investing fixed amounts at regular intervals.", "Have a plan for when to buy more and when to sell.", "Write down your strategy to avoid emotional decisions."] },
    ],
  },
];

export default function Guide() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>("1");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const stored = localStorage.getItem("equitix-completed-lessons");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleChapter = (id: string) => {
    setExpandedChapter(expandedChapter === id ? null : id);
  };

  const markComplete = (lessonId: string) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem("equitix-completed-lessons", JSON.stringify(updated));
  };

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Beginner's Guide</h1>
          <p className="text-lg text-muted-foreground mb-6">A structured introduction to stock market investing.</p>
          
          <div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Your Progress</span>
              <div className="font-semibold">{completedLessons.length} of {totalLessons} lessons completed</div>
            </div>
            <div className="text-2xl font-semibold">{progress}%</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Table of Contents */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <div className="space-y-2">
              {chapters.map((chapter, i) => (
                <div key={chapter.id} className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full p-4 flex items-center justify-between bg-card hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="font-medium text-sm">{chapter.title}</span>
                    </div>
                    {expandedChapter === chapter.id ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  
                  {expandedChapter === chapter.id && (
                    <div className="border-t border-border bg-muted/30">
                      {chapter.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={cn(
                            "w-full p-3 pl-12 flex items-center justify-between hover:bg-muted/50 transition-colors text-left text-sm",
                            selectedLesson?.id === lesson.id && "bg-muted"
                          )}
                        >
                          <span className={cn(completedLessons.includes(lesson.id) && "text-muted-foreground")}>
                            {lesson.title}
                          </span>
                          {completedLessons.includes(lesson.id) && (
                            <CheckCircle className="w-4 h-4 text-success" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lesson Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            {selectedLesson ? (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">{selectedLesson.duration} read</span>
                    <h2 className="text-2xl font-semibold">{selectedLesson.title}</h2>
                  </div>
                  <Button
                    variant={completedLessons.includes(selectedLesson.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => markComplete(selectedLesson.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedLessons.includes(selectedLesson.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>

                <div className="prose prose-sm max-w-none space-y-4">
                  {selectedLesson.content.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex justify-between">
                  <Button variant="ghost" disabled>Previous Lesson</Button>
                  <Button>Next Lesson<ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-2xl border border-dashed border-border text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Select a Lesson</h3>
                <p className="text-muted-foreground mb-6">Choose a lesson from the table of contents to begin learning.</p>
                <Button onClick={() => setSelectedLesson(chapters[0].lessons[0])}>
                  Start with Lesson 1
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-8 rounded-2xl bg-muted/50 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready for More?</h3>
          <p className="text-muted-foreground mb-6">Continue your learning journey with expert-led masterclasses.</p>
          <Link to="/masterclasses">
            <Button>Explore Masterclasses<ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
