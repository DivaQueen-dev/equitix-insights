import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
  hashtags: string[];
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const hashtags = [
  { id: "all", label: "All" },
  { id: "basics", label: "#Basics" },
  { id: "dailytips", label: "#DailyTips" },
  { id: "strategy", label: "#Strategy" },
  { id: "masterclasstalks", label: "#MasterclassTalks" },
];

const initialPosts: Post[] = [
  {
    id: "1",
    author: "Rahul Sharma",
    avatar: "RS",
    content: "Just learned about the importance of P/E ratio in stock valuation. The lower the ratio compared to industry average, the more undervalued the stock might be. #Basics #DailyTips",
    timestamp: "2h ago",
    likes: 42,
    replies: [
      { id: "r1", author: "Priya M", avatar: "PM", content: "Great insight! Also consider the PEG ratio for growth stocks.", timestamp: "1h ago" },
    ],
    hashtags: ["basics", "dailytips"],
  },
  {
    id: "2",
    author: "Ananya Patel",
    avatar: "AP",
    content: "NIFTY 50 looking strong today. Remember, always do your own research before investing. The market can be unpredictable. #DailyTips",
    timestamp: "4h ago",
    likes: 28,
    replies: [],
    hashtags: ["dailytips"],
  },
  {
    id: "3",
    author: "Vikram Singh",
    avatar: "VS",
    content: "Completed the Technical Analysis masterclass yesterday. The candlestick patterns section was incredibly helpful. Highly recommend it to beginners! #MasterclassTalks",
    timestamp: "6h ago",
    likes: 67,
    replies: [
      { id: "r2", author: "Neha K", avatar: "NK", content: "Which module did you find most useful?", timestamp: "5h ago" },
      { id: "r3", author: "Vikram Singh", avatar: "VS", content: "The support and resistance levels module changed my perspective completely.", timestamp: "4h ago" },
    ],
    hashtags: ["masterclasstalks"],
  },
  {
    id: "4",
    author: "Deepak Kumar",
    avatar: "DK",
    content: "Dollar-cost averaging is my favorite strategy for long-term investments. Reduces the impact of volatility and removes emotional decision making. #Strategy",
    timestamp: "8h ago",
    likes: 91,
    replies: [],
    hashtags: ["strategy"],
  },
  {
    id: "5",
    author: "Sneha Reddy",
    avatar: "SR",
    content: "New to investing? Start with understanding what stocks actually represent - ownership in a company. This fundamental concept helps you think like an owner, not a gambler. #Basics",
    timestamp: "12h ago",
    likes: 156,
    replies: [
      { id: "r4", author: "Amit J", avatar: "AJ", content: "This is such an important mindset shift. Thanks for sharing!", timestamp: "10h ago" },
    ],
    hashtags: ["basics"],
  },
  {
    id: "6",
    author: "Karthik Iyer",
    avatar: "KI",
    content: "Sector rotation strategy explained: When one sector peaks, smart money often moves to the next promising sector. Banking to IT to Pharma - understanding these cycles is key. #Strategy #DailyTips",
    timestamp: "1d ago",
    likes: 73,
    replies: [],
    hashtags: ["strategy", "dailytips"],
  },
];

export default function Community() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(4);

  useEffect(() => {
    // Load from localStorage
    const storedPosts = localStorage.getItem("equitix-community-posts");
    const storedLikes = localStorage.getItem("equitix-community-likes");
    
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem("equitix-community-posts", JSON.stringify(initialPosts));
    }
    
    if (storedLikes) {
      setLikedPosts(JSON.parse(storedLikes));
    }
  }, []);

  const savePosts = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("equitix-community-posts", JSON.stringify(updatedPosts));
  };

  const toggleLike = (postId: string) => {
    const isLiked = likedPosts.includes(postId);
    const updatedLikes = isLiked
      ? likedPosts.filter((id) => id !== postId)
      : [...likedPosts, postId];
    
    setLikedPosts(updatedLikes);
    localStorage.setItem("equitix-community-likes", JSON.stringify(updatedLikes));

    // Update post likes count
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
        : post
    );
    savePosts(updatedPosts);
  };

  const addReply = (postId: string) => {
    if (!replyText.trim()) return;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      author: user?.name || "You",
      avatar: (user?.name || "Y").slice(0, 2).toUpperCase(),
      content: replyText,
      timestamp: "Just now",
    };

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    );
    savePosts(updatedPosts);
    setReplyText("");
  };

  const addNewPost = () => {
    if (!newPostText.trim() || newPostText.length > 280) return;

    // Extract hashtags
    const hashtagMatches = newPostText.match(/#\w+/g) || [];
    const extractedHashtags = hashtagMatches.map((tag) => tag.slice(1).toLowerCase());

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: user?.name || "You",
      avatar: (user?.name || "Y").slice(0, 2).toUpperCase(),
      content: newPostText,
      timestamp: "Just now",
      likes: 0,
      replies: [],
      hashtags: extractedHashtags,
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    setNewPostText("");
  };

  const filteredPosts = activeFilter === "all"
    ? posts
    : posts.filter((post) => post.hashtags.includes(activeFilter));

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Community</h1>
          <p className="text-lg text-muted-foreground">
            A space to learn, share, and grow together.
          </p>
        </motion.div>

        {/* New Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
                {(user?.name || "Y").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your investment insights..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  rows={3}
                  className="border-0 p-0 resize-none focus-visible:ring-0 bg-transparent"
                  maxLength={280}
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className={cn(
                    "text-xs",
                    newPostText.length > 260 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {newPostText.length}/280
                  </span>
                  <Button
                    size="sm"
                    onClick={addNewPost}
                    disabled={!newPostText.trim() || newPostText.length > 280}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {hashtags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => {
                  setActiveFilter(tag.id);
                  setVisiblePosts(4);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === tag.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feed */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {displayedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
                className="p-5 rounded-2xl border border-border bg-card hover:bg-card/80 transition-colors"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{post.author}</div>
                      <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                  {post.content.split(/(#\w+)/g).map((part, i) =>
                    part.startsWith("#") ? (
                      <span key={i} className="text-foreground font-medium">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </p>

                {/* Post Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 text-sm transition-colors",
                      likedPosts.includes(post.id)
                        ? "text-destructive"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4",
                        likedPosts.includes(post.id) && "fill-current"
                      )}
                    />
                    {post.likes}
                  </button>
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {post.replies.length}
                  </button>
                </div>

                {/* Replies Section */}
                <AnimatePresence>
                  {expandedPost === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border overflow-hidden"
                    >
                      {/* Existing Replies */}
                      {post.replies.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                                {reply.avatar}
                              </div>
                              <div className="flex-1 p-3 rounded-xl bg-muted/50">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                          {(user?.name || "Y").slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={2}
                            className="flex-1 min-h-[60px]"
                          />
                          <Button
                            size="icon"
                            onClick={() => addReply(post.id)}
                            disabled={!replyText.trim()}
                            className="h-[60px]"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Load More */}
          {visiblePosts < filteredPosts.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center pt-4"
            >
              <Button
                variant="outline"
                onClick={() => setVisiblePosts((v) => v + 4)}
                className="w-full max-w-xs"
              >
                Load More
              </Button>
            </motion.div>
          )}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-4 rounded-xl bg-muted/50 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Community discussions represent user opinions and are for educational purposes only. 
            This is not financial advice. Always consult a qualified financial advisor.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
