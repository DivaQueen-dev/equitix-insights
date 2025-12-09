import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Activity, AlertTriangle } from "lucide-react";

const lessons = {
  basics: [
    { title: "What is a Stock?", content: "A stock represents ownership in a company. When you buy a stock, you become a shareholder and own a small piece of that company. Stock prices fluctuate based on supply and demand, company performance, and market conditions." },
    { title: "Understanding Market Orders", content: "A market order buys or sells a stock immediately at the current market price. A limit order lets you specify the price you want to pay or receive. Market orders execute faster but may not get the exact price you see." },
    { title: "Reading Stock Quotes", content: "A stock quote shows the current price, daily change, volume, and other key metrics. The bid price is what buyers will pay; the ask price is what sellers want. The spread between them indicates liquidity." },
  ],
  charts: [
    { title: "Candlestick Basics", content: "Candlestick charts show four prices: open, high, low, and close. A green/white candle means the price closed higher than it opened (bullish). A red/black candle means it closed lower (bearish). The body shows the open-close range; wicks show high-low." },
    { title: "Support and Resistance", content: "Support levels are prices where stocks tend to stop falling and bounce back. Resistance levels are where stocks tend to stop rising. These form because traders remember past price points and act similarly when prices return to them." },
    { title: "Volume Analysis", content: "Volume shows how many shares traded during a period. High volume on price increases suggests strong buying interest. High volume on decreases suggests strong selling. Low volume moves are often less significant." },
  ],
  risk: [
    { title: "What is Volatility?", content: "Volatility measures how much a stock's price moves over time. High volatility means large price swings (higher risk/reward). Low volatility means steadier prices. Beta compares a stock's volatility to the overall market." },
    { title: "Diversification", content: "Diversification means spreading investments across different stocks, sectors, and asset types. This reduces risk because poor performance in one area may be offset by gains in another. Never put all your eggs in one basket." },
    { title: "Position Sizing", content: "Position sizing determines how much to invest in each stock. A common rule is never risk more than 1-2% of your portfolio on a single trade. This prevents any one loss from significantly damaging your overall portfolio." },
  ],
  news: [
    { title: "Interpreting Financial News", content: "Financial news can move markets quickly. Focus on facts, not opinions. Understand the difference between company-specific news and broader market news. Be wary of sensational headlines designed to generate clicks." },
    { title: "Earnings Reports", content: "Companies report earnings quarterly. Key metrics include revenue, earnings per share (EPS), and guidance. Stocks often move significantly after earnings, based on whether results beat, meet, or miss expectations." },
    { title: "Economic Indicators", content: "Economic indicators like GDP, unemployment, and inflation affect the entire market. Interest rate decisions by central banks are especially important. Understanding these helps predict broader market trends." },
  ],
};

export default function Learn() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Learning Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build your investment knowledge with guided lessons designed for all experience levels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="basics" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="basics" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Basics</span>
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Charts</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Risk</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">News</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(lessons).map(([key, items]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                {items.map((lesson, index) => (
                  <motion.div
                    key={lesson.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{lesson.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
