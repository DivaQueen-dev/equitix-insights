import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, ChevronRight, Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  category: string;
  title: string;
  author: string;
  time: string;
  replies: number;
  content: string;
}

interface Tip {
  id: string;
  content: string;
  author: string;
  likes: number;
}

const categories = [
  { id: "basics", name: "Stock Market Basics", description: "Foundational concepts and terminology", posts: 45 },
  { id: "daily", name: "Daily Market Discussions", description: "What's happening in the markets today", posts: 128 },
  { id: "strategy", name: "Strategy Talk", description: "Educational strategy discussions", posts: 67 },
  { id: "beginner", name: "Beginner Help Desk", description: "Ask questions, get answers", posts: 89 },
  { id: "masterclass", name: "Masterclass Discussions", description: "Discuss course content", posts: 34 },
];

const samplePosts: Post[] = [
  { id: "1", category: "basics", title: "What exactly is a dividend and how does it work?", author: "NewInvestor23", time: "2h ago", replies: 12, content: "I keep hearing about dividends but I'm not sure I fully understand how they work. Can someone explain?" },
  { id: "2", category: "basics", title: "Understanding P/E ratios - a simple explanation", author: "MarketMentor", time: "5h ago", replies: 28, content: "Let me break down the Price-to-Earnings ratio in simple terms for everyone." },
  { id: "3", category: "daily", title: "Tech sector analysis for this week", author: "TechTrader", time: "1h ago", replies: 45, content: "Here's my educational breakdown of what's happening in tech this week." },
  { id: "4", category: "strategy", title: "Dollar-cost averaging: when does it make sense?", author: "LongTermLisa", time: "3h ago", replies: 19, content: "I've been researching dollar-cost averaging and wanted to share what I've learned." },
  { id: "5", category: "beginner", title: "First time buying stocks - what should I know?", author: "JustStarting", time: "30m ago", replies: 8, content: "I'm completely new to investing. What are the basics I need to understand before my first purchase?" },
];

const sampleTips: Tip[] = [
  { id: "1", content: "Always do your own research before making any investment decision. Never rely solely on others' opinions.", author: "ValueHunter", likes: 234 },
  { id: "2", content: "The best time to start investing was yesterday. The second best time is today. Start small and learn as you go.", author: "PatientInvestor", likes: 189 },
  { id: "3", content: "Diversification is your friend. Don't put all your eggs in one basket.", author: "RiskManager", likes: 156 },
  { id: "4", content: "Investing is a marathon, not a sprint. Focus on long-term growth rather than quick gains.", author: "SteadyGains", likes: 203 },
  { id: "5", content: "Keep emotions out of your investment decisions. Fear and greed are an investor's worst enemies.", author: "CalmTrader", likes: 178 },
  { id: "6", content: "Learn to read financial statements. It's a skill that will serve you for life.", author: "FundamentalFan", likes: 145 },
  { id: "7", content: "Set clear investment goals and stick to them. Know why you're investing before you start.", author: "GoalSetter", likes: 167 },
  { id: "8", content: "The market will have ups and downs. Stay the course during volatility.", author: "LongHaul", likes: 198 },
];

const sampleReplies = [
  { id: "r1", author: "HelpfulMember", content: "Great question! A dividend is a portion of a company's profits that gets distributed to shareholders.", time: "1h ago" },
  { id: "r2", author: "DividendFan", content: "Think of it as getting paid just for owning shares. Companies typically pay dividends quarterly.", time: "45m ago" },
  { id: "r3", author: "LearningToo", content: "I was confused about this too. The dividend yield percentage is what really matters for income investors.", time: "30m ago" },
];

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedTips, setLikedTips] = useState<string[]>([]);
  const [newReply, setNewReply] = useState("");
  const [localReplies, setLocalReplies] = useState<any[]>([]);
  const [visibleTips, setVisibleTips] = useState(4);

  useEffect(() => {
    const storedLikes = localStorage.getItem("equitix-liked-tips");
    if (storedLikes) setLikedTips(JSON.parse(storedLikes));
    const storedReplies = localStorage.getItem("equitix-replies");
    if (storedReplies) setLocalReplies(JSON.parse(storedReplies));
  }, []);

  const toggleLike = (tipId: string) => {
    const updated = likedTips.includes(tipId)
      ? likedTips.filter((id) => id !== tipId)
      : [...likedTips, tipId];
    setLikedTips(updated);
    localStorage.setItem("equitix-liked-tips", JSON.stringify(updated));
  };

  const submitReply = () => {
    if (!newReply.trim() || !selectedPost) return;
    const reply = {
      id: `local-${Date.now()}`,
      postId: selectedPost.id,
      author: "You",
      content: newReply,
      time: "Just now",
    };
    const updated = [...localReplies, reply];
    setLocalReplies(updated);
    localStorage.setItem("equitix-replies", JSON.stringify(updated));
    setNewReply("");
  };

  const filteredPosts = selectedCategory
    ? samplePosts.filter((p) => p.category === selectedCategory)
    : samplePosts;

  const postReplies = selectedPost
    ? [...sampleReplies, ...localReplies.filter((r) => r.postId === selectedPost.id)]
    : [];

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Community</h1>
          <p className="text-lg text-muted-foreground">A space to learn, share, and grow together.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Discussion Boards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-semibold mb-6">Discussion Boards</h2>

              {selectedPost ? (
                <div className="space-y-6">
                  <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />Back to posts
                  </button>
                  
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="text-xl font-semibold mb-2">{selectedPost.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span>{selectedPost.author}</span>
                      <span>{selectedPost.time}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{selectedPost.content}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Replies ({postReplies.length})</h4>
                    {postReplies.map((reply) => (
                      <div key={reply.id} className="p-4 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">{reply.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{reply.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Write a reply..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      rows={3}
                      className="flex-1"
                    />
                    <Button onClick={submitReply} disabled={!newReply.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : selectedCategory ? (
                <div className="space-y-4">
                  <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />All categories
                  </button>
                  
                  <div className="p-4 rounded-xl bg-muted/50 mb-6">
                    <h3 className="font-semibold">{categories.find((c) => c.id === selectedCategory)?.name}</h3>
                    <p className="text-sm text-muted-foreground">{categories.find((c) => c.id === selectedCategory)?.description}</p>
                  </div>

                  {filteredPosts.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No posts in this category yet.</p>
                  ) : (
                    filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <h4 className="font-medium mb-2">{post.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>{post.time}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.replies}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="grid gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="p-5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <h3 className="font-semibold mb-1">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground">{cat.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{cat.posts} posts</Badge>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Tips Feed Sidebar */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold mb-6">Tips Feed</h2>
              <div className="space-y-4">
                {sampleTips.slice(0, visibleTips).map((tip, i) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm mb-3 leading-relaxed">{tip.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{tip.author}</span>
                      <button
                        onClick={() => toggleLike(tip.id)}
                        className={cn(
                          "flex items-center gap-1.5 text-xs transition-colors",
                          likedTips.includes(tip.id) ? "text-destructive" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Heart className={cn("w-3.5 h-3.5", likedTips.includes(tip.id) && "fill-current")} />
                        {tip.likes + (likedTips.includes(tip.id) ? 1 : 0)}
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                {visibleTips < sampleTips.length && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setVisibleTips((v) => v + 4)}
                  >
                    Load More
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-4 rounded-xl bg-muted/50 text-xs text-muted-foreground"
            >
              <strong>Disclaimer:</strong> Community discussions represent user opinions and are for educational purposes only. This is not financial advice.
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
