import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, TrendingDown, Star, ChevronRight, BarChart3, Activity, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { sampleStocks, generateStockHistory } from "@/data/stocks";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/lib/utils";

const indicators = [
  { name: "RSI (14)", description: "Relative Strength Index measures momentum", interpretation: "Below 30 = Oversold, Above 70 = Overbought" },
  { name: "MACD", description: "Moving Average Convergence Divergence for trend", interpretation: "Crossovers signal potential trend changes" },
  { name: "Moving Averages", description: "50-day and 200-day averages show trends", interpretation: "Golden Cross = Bullish, Death Cross = Bearish" },
  { name: "Volume", description: "Trading activity confirms price movements", interpretation: "High volume validates breakouts" },
];

export default function Analysis() {
  const [searchQuery, setSearchQuery] = useState("");
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [selectedStock, setSelectedStock] = useState(sampleStocks[0]);

  const chartData = useMemo(() => generateStockHistory(selectedStock.price, 30), [selectedStock]);

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return sampleStocks;
    const query = searchQuery.toLowerCase();
    return sampleStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Stock Analysis</h1>
          <p className="text-lg text-muted-foreground">Explore stocks with key indicators and insights.</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
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
          {/* Stock List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-1 space-y-3">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  selectedStock.symbol === stock.symbol
                    ? "border-foreground bg-muted"
                    : "border-border bg-card hover:bg-muted/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-semibold text-sm">
                      {stock.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stock.symbol}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            isInWatchlist(stock.symbol) ? removeFromWatchlist(stock.symbol) : addToWatchlist(stock.symbol);
                          }}
                        >
                          <Star className={cn("w-4 h-4", isInWatchlist(stock.symbol) ? "fill-foreground" : "text-muted-foreground")} />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.price.toFixed(2)}</div>
                    <div className={cn("text-xs", stock.change >= 0 ? "text-success" : "text-destructive")}>
                      {stock.change >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Analysis Panel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-semibold">{selectedStock.symbol}</h2>
                  <Badge variant="secondary">{selectedStock.sector}</Badge>
                </div>
                <p className="text-muted-foreground">{selectedStock.name}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold">${selectedStock.price.toFixed(2)}</div>
                <div className={cn("flex items-center gap-1 justify-end", selectedStock.change >= 0 ? "text-success" : "text-destructive")}>
                  {selectedStock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {selectedStock.change >= 0 ? "+" : ""}{selectedStock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />Price Chart (30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tickFormatter={(v) => v.slice(5)} stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                      <Area type="monotone" dataKey="close" stroke="hsl(var(--foreground))" strokeWidth={2} fill="url(#chartGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Key Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />Key Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {indicators.map((ind) => (
                    <div key={ind.name} className="p-4 rounded-xl bg-muted/50">
                      <div className="font-medium mb-1">{ind.name}</div>
                      <p className="text-sm text-muted-foreground mb-2">{ind.description}</p>
                      <p className="text-xs text-muted-foreground">{ind.interpretation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-muted/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                This analysis is for educational purposes only and should not be considered financial advice. Always do your own research before making investment decisions.
              </p>
            </div>

            <Link to={`/stock/${selectedStock.symbol}`}>
              <Button className="w-full">View Full Details<ChevronRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
