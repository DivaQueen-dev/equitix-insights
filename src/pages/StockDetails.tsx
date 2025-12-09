import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Star,
  StarOff,
  Activity,
  BarChart3,
  AlertTriangle,
  Info,
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
  ComposedChart,
  Bar,
} from "recharts";
import { sampleStocks, generateStockHistory, sampleNews } from "@/data/stocks";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/lib/utils";

export default function StockDetails() {
  const { symbol } = useParams<{ symbol: string }>();
  const [timeframe, setTimeframe] = useState("3M");
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const stock = useMemo(() => {
    return sampleStocks.find((s) => s.symbol === symbol);
  }, [symbol]);

  const chartData = useMemo(() => {
    if (!stock) return [];
    const days = timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : 365;
    return generateStockHistory(stock.price, days);
  }, [stock, timeframe]);

  const riskScore = useMemo(() => {
    if (!stock) return 50;
    const volatility = Math.abs(stock.changePercent) * 10;
    return Math.min(Math.max(Math.round(volatility * 5 + 30), 10), 100);
  }, [stock]);

  const sentimentScore = useMemo(() => {
    if (!stock) return 50;
    return stock.change >= 0 ? Math.min(50 + stock.changePercent * 10, 90) : Math.max(50 + stock.changePercent * 10, 10);
  }, [stock]);

  const prediction = useMemo(() => {
    if (!stock) return { direction: "neutral", confidence: 50, target: 0 };
    const direction = stock.change >= 0 ? "bullish" : "bearish";
    const confidence = Math.min(60 + Math.abs(stock.changePercent) * 5, 85);
    const target = stock.price * (1 + (stock.change >= 0 ? 0.05 : -0.03));
    return { direction, confidence: Math.round(confidence), target };
  }, [stock]);

  if (!stock) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Stock Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested stock could not be found.</p>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{stock.symbol}</h1>
                <Badge variant="secondary">{stock.sector}</Badge>
                <button
                  onClick={() =>
                    isInWatchlist(stock.symbol)
                      ? removeFromWatchlist(stock.symbol)
                      : addToWatchlist(stock.symbol)
                  }
                  className="text-muted-foreground hover:text-accent"
                >
                  {isInWatchlist(stock.symbol) ? (
                    <Star className="w-5 h-5 fill-accent text-accent" />
                  ) : (
                    <StarOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-muted-foreground">{stock.name}</p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
              <div
                className={cn(
                  "flex items-center gap-1 justify-end text-lg",
                  stock.change >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {stock.change >= 0 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                {stock.change >= 0 ? "+" : ""}${Math.abs(stock.change).toFixed(2)} (
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="chart" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TabsList className="bg-muted">
              <TabsTrigger value="chart">Price Chart</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="company">Company Info</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="chart" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Price Movement</CardTitle>
                  <div className="flex gap-2">
                    {["1W", "1M", "3M", "1Y"].map((tf) => (
                      <Button
                        key={tf}
                        variant={timeframe === tf ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor={stock.change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={stock.change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                              stopOpacity={0}
                            />
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
                          tickFormatter={(value) => `$${value.toFixed(0)}`}
                          domain={["dataMin - 5", "dataMax + 5"]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="close"
                          stroke={stock.change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                          strokeWidth={2}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Volume Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Trading Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData.slice(-30)}>
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => value.slice(8)}
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
                          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M`, "Volume"]}
                        />
                        <Bar dataKey="volume" fill="hsl(var(--accent))" opacity={0.6} radius={[2, 2, 0, 0]} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Risk Meter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${riskScore}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={cn(
                            "absolute inset-y-0 left-0 rounded-full",
                            riskScore < 40
                              ? "bg-success"
                              : riskScore < 70
                              ? "bg-accent"
                              : "bg-destructive"
                          )}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Low Risk</span>
                        <span className="font-medium">{riskScore}/100</span>
                        <span className="text-muted-foreground">High Risk</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {riskScore < 40
                          ? "This stock shows relatively stable price movements with lower volatility."
                          : riskScore < 70
                          ? "Moderate volatility detected. Consider position sizing carefully."
                          : "High volatility observed. This stock may experience significant price swings."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sentiment Gauge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Market Sentiment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${sentimentScore}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={cn(
                            "absolute inset-y-0 left-0 rounded-full",
                            sentimentScore > 60
                              ? "bg-success"
                              : sentimentScore > 40
                              ? "bg-accent"
                              : "bg-destructive"
                          )}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bearish</span>
                        <span className="font-medium">{sentimentScore}/100</span>
                        <span className="text-muted-foreground">Bullish</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {sentimentScore > 60
                          ? "Positive market sentiment with favorable news and trading patterns."
                          : sentimentScore > 40
                          ? "Neutral sentiment. Market participants show mixed opinions."
                          : "Negative sentiment detected. Recent developments may be causing concern."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Prediction */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Price Outlook
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-panel rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Direction</p>
                        <p
                          className={cn(
                            "text-xl font-semibold capitalize",
                            prediction.direction === "bullish" ? "text-success" : "text-destructive"
                          )}
                        >
                          {prediction.direction}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-panel rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Confidence</p>
                        <p className="text-xl font-semibold">{prediction.confidence}%</p>
                      </div>
                      <div className="text-center p-4 bg-panel rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Target Price</p>
                        <p className="text-xl font-semibold">${prediction.target.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Price predictions are based on historical patterns and current market conditions. 
                      This is not financial advice. Always conduct your own research.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="company">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Market Cap</span>
                        <span className="font-medium">{stock.marketCap}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Volume</span>
                        <span className="font-medium">{stock.volume}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Sector</span>
                        <span className="font-medium">{stock.sector}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">52 Week High</span>
                        <span className="font-medium">${stock.high52w.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">52 Week Low</span>
                        <span className="font-medium">${stock.low52w.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Day Change</span>
                        <span
                          className={cn(
                            "font-medium",
                            stock.change >= 0 ? "text-success" : "text-destructive"
                          )}
                        >
                          {stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="news">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Related News</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleNews.map((news) => (
                      <div
                        key={news.id}
                        className="p-4 bg-panel rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={
                              news.sentiment === "positive"
                                ? "default"
                                : news.sentiment === "negative"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {news.sentiment}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{news.source}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{news.time}</span>
                        </div>
                        <h3 className="font-medium mb-1">{news.title}</h3>
                        <p className="text-sm text-muted-foreground">{news.summary}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
