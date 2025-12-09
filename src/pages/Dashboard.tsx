import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  StarOff,
  Activity,
  BarChart3,
  MessageCircle,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { sampleStocks, sampleNews, sectorData, generateStockHistory } from "@/data/stocks";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/lib/utils";

const miniChartData = generateStockHistory(100, 30).slice(-14);

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const trendingStocks = sampleStocks
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Track your investments and market trends</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link to="/telegram">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram Bot
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stocks by symbol or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Overview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Market Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <defs>
                          <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => value.slice(5)}
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="close"
                          stroke="hsl(var(--accent))"
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
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
                        <Card
                          variant="interactive"
                          padding="sm"
                          className="h-full"
                        >
                          <CardContent className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{stock.symbol}</span>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    isInWatchlist(stock.symbol)
                                      ? removeFromWatchlist(stock.symbol)
                                      : addToWatchlist(stock.symbol);
                                  }}
                                  className="text-muted-foreground hover:text-accent"
                                >
                                  {isInWatchlist(stock.symbol) ? (
                                    <Star className="w-4 h-4 fill-accent text-accent" />
                                  ) : (
                                    <StarOff className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-muted-foreground truncate max-w-[140px]">
                                {stock.name}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${stock.price.toFixed(2)}</div>
                              <div
                                className={cn(
                                  "text-sm flex items-center gap-1 justify-end",
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
                          </CardContent>
                        </Card>
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
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    All Stocks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredStocks.map((stock) => (
                      <Link
                        key={stock.symbol}
                        to={`/stock/${stock.symbol}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-panel flex items-center justify-center font-semibold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{stock.symbol}</span>
                              <Badge variant="secondary" className="text-xs">
                                {stock.sector}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="font-medium">${stock.price.toFixed(2)}</div>
                            <div
                              className={cn(
                                "text-sm",
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
          <div className="space-y-6">
            {/* Watchlist */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {watchlistStocks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Add stocks to your watchlist to track them here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {watchlistStocks.map((stock) => (
                        <Link
                          key={stock.symbol}
                          to={`/stock/${stock.symbol}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">${stock.price.toFixed(2)}</div>
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
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sector Heatmap */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Sector Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {sectorData.map((sector) => (
                      <div
                        key={sector.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-panel"
                      >
                        <span className="text-sm font-medium">{sector.name}</span>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            sector.change >= 0 ? "text-success" : "text-destructive"
                          )}
                        >
                          {sector.change >= 0 ? "+" : ""}
                          {sector.change.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* News */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Latest News</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleNews.slice(0, 4).map((news) => (
                      <div key={news.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={
                              news.sentiment === "positive"
                                ? "default"
                                : news.sentiment === "negative"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {news.sentiment}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.time}</span>
                        </div>
                        <p className="text-sm font-medium leading-tight">{news.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{news.source}</p>
                      </div>
                    ))}
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
