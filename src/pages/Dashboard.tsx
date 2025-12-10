import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  Activity,
  BarChart3,
  User,
  ChevronRight,
  Bell,
  LogOut,
  BookOpen,
  Users,
  Bot,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { sampleStocks, generateStockHistory } from "@/data/stocks";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const miniChartData = generateStockHistory(100, 30).slice(-14);

const categories = [
  { name: "NIFTY 50", icon: "N", change: 1.2, value: "24,850" },
  { name: "SENSEX", icon: "S", change: 0.9, value: "81,500" },
  { name: "Bank NIFTY", icon: "B", change: -0.4, value: "52,100" },
  { name: "IT Index", icon: "IT", change: 2.1, value: "38,200" },
  { name: "Pharma", icon: "PH", change: 1.5, value: "21,800" },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return sampleStocks;
    const query = searchQuery.toLowerCase();
    return sampleStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const watchlistStocks = useMemo(() => {
    return sampleStocks.filter((stock) => watchlist.includes(stock.symbol));
  }, [watchlist]);

  const trendingStocks = sampleStocks
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 4);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">
                {greeting()}, {user?.name || "Investor"}
              </h1>
              <p className="text-muted-foreground">Here's your market overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-xl">
              <Bell className="w-4 h-4" />
            </Button>
            <Link to="/profile">
              <Button variant="outline" className="rounded-xl">
                Profile
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Index Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="!overflow-visible"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.name} className="!w-auto">
                <div className="p-4 pr-8 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-semibold text-sm">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{cat.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{cat.value}</span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          cat.change >= 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {cat.change >= 0 ? "+" : ""}{cat.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stocks by symbol or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Smart Predictions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="w-5 h-5" />
                      Smart Predictions
                    </CardTitle>
                    <Link to="/analysis">
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <defs>
                          <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => value.slice(5)}
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="close"
                          stroke="hsl(var(--foreground))"
                          strokeWidth={2}
                          fill="url(#colorClose)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Stocks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5" />
                    Trending Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {trendingStocks.map((stock) => (
                      <Link
                        key={stock.symbol}
                        to={`/stock/${stock.symbol}`}
                        className="group"
                      >
                        <div className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all flex items-center justify-between hover-lift">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-semibold text-sm">
                              {stock.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{stock.symbol}</span>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    isInWatchlist(stock.symbol)
                                      ? removeFromWatchlist(stock.symbol)
                                      : addToWatchlist(stock.symbol);
                                  }}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <Star
                                    className={cn(
                                      "w-4 h-4",
                                      isInWatchlist(stock.symbol) && "fill-foreground"
                                    )}
                                  />
                                </button>
                              </div>
                              <p className="text-xs text-muted-foreground truncate max-w-[100px]">
                                {stock.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{stock.price.toFixed(2)}</div>
                            <div
                              className={cn(
                                "text-xs flex items-center gap-1 justify-end",
                                stock.change >= 0 ? "text-success" : "text-destructive"
                              )}
                            >
                              {stock.change >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* All Stocks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="w-5 h-5" />
                    All Stocks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredStocks.slice(0, 8).map((stock) => (
                      <Link
                        key={stock.symbol}
                        to={`/stock/${stock.symbol}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-semibold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{stock.symbol}</span>
                              <Badge variant="secondary" className="text-xs">
                                {stock.sector}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{stock.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="font-medium">₹{stock.price.toFixed(2)}</div>
                            <div
                              className={cn(
                                "text-xs",
                                stock.change >= 0 ? "text-success" : "text-destructive"
                              )}
                            >
                              {stock.change >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Nav */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Analysis", href: "/analysis", icon: BarChart3 },
                  { label: "Learn", href: "/guide", icon: BookOpen },
                  { label: "Community", href: "/community", icon: Users },
                  { label: "Telegram", href: "/bot", icon: Bot },
                ].map((item) => (
                  <Link key={item.href} to={item.href}>
                    <div className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-center hover-lift">
                      <item.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Watchlist */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5" />
                    Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {watchlistStocks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Add stocks to track them here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {watchlistStocks.slice(0, 5).map((stock) => (
                        <Link
                          key={stock.symbol}
                          to={`/stock/${stock.symbol}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-semibold">
                              {stock.symbol.slice(0, 2)}
                            </div>
                            <span className="font-medium text-sm">{stock.symbol}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">₹{stock.price.toFixed(2)}</div>
                            <div
                              className={cn(
                                "text-xs",
                                stock.change >= 0 ? "text-success" : "text-destructive"
                              )}
                            >
                              {stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Market Insight */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Insight</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    NIFTY 50 is showing bullish momentum with strong support at 24,500. 
                    Banking sector leading gains while IT shows mixed signals. 
                    Watch for RBI policy updates this week.
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Educational insight only. Not financial advice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
