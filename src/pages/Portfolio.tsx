import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Star,
  Download,
  FileText,
  PieChart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { sampleStocks, generateStockHistory } from "@/data/stocks";
import { useWatchlist } from "@/hooks/useWatchlist";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const COLORS = [
  "hsl(42, 92%, 56%)",
  "hsl(152, 60%, 50%)",
  "hsl(152, 60%, 35%)",
  "hsl(42, 70%, 45%)",
  "hsl(220, 15%, 45%)",
];

export default function Portfolio() {
  const { watchlist } = useWatchlist();
  const { portfolio, totalValue, totalGain, totalGainPercent } = usePortfolio();
  const { toast } = useToast();

  const portfolioChartData = generateStockHistory(100000, 30).slice(-14);

  const watchlistStocks = useMemo(() => {
    return sampleStocks.filter((stock) => watchlist.includes(stock.symbol));
  }, [watchlist]);

  const holdingsData = useMemo(() => {
    return portfolio.map((holding, index) => ({
      name: holding.symbol,
      value: holding.currentValue,
      color: COLORS[index % COLORS.length],
    }));
  }, [portfolio]);

  const exportToCSV = () => {
    const headers = ["Symbol", "Name", "Quantity", "Avg Price", "Current Price", "Value", "P&L", "P&L %"];
    const rows = portfolio.map((h) => [
      h.symbol,
      h.name,
      h.quantity,
      h.avgPrice.toFixed(2),
      h.currentPrice.toFixed(2),
      h.currentValue.toFixed(2),
      h.gain.toFixed(2),
      h.gainPercent.toFixed(2),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `equitix-portfolio-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "Export Complete", description: "Portfolio exported to CSV successfully." });
  };

  const exportToPDF = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Equitix Portfolio Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background: #0f1419; color: #f5f5f4; }
          h1 { color: #d4a542; border-bottom: 2px solid #d4a542; padding-bottom: 10px; }
          h2 { color: #f5f5f4; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #2a2f36; }
          th { background: #1a1f26; font-weight: 600; }
          .positive { color: #22c55e; }
          .negative { color: #ef4444; }
          .summary { background: #1a1f26; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4a542; }
          .summary h3 { margin: 0 0 10px 0; color: #d4a542; }
        </style>
      </head>
      <body>
        <h1>Equitix Portfolio Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString("en-IN", { dateStyle: "full" })}</p>
        
        <div class="summary">
          <h3>Portfolio Summary</h3>
          <p><strong>Total Value:</strong> Rs.${totalValue.toLocaleString("en-IN")}</p>
          <p><strong>Total Gain/Loss:</strong> <span class="${totalGain >= 0 ? "positive" : "negative"}">Rs.${totalGain.toLocaleString("en-IN")} (${totalGainPercent.toFixed(2)}%)</span></p>
        </div>

        <h2>Holdings</h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>Current</th>
              <th>Value</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            ${portfolio
              .map(
                (h) => `
              <tr>
                <td><strong>${h.symbol}</strong></td>
                <td>${h.name}</td>
                <td>${h.quantity}</td>
                <td>Rs.${h.avgPrice.toFixed(2)}</td>
                <td>Rs.${h.currentPrice.toFixed(2)}</td>
                <td>Rs.${h.currentValue.toLocaleString("en-IN")}</td>
                <td class="${h.gain >= 0 ? "positive" : "negative"}">Rs.${h.gain.toFixed(2)} (${h.gainPercent.toFixed(2)}%)</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <p style="margin-top: 40px; color: #888; font-size: 12px;">
          Disclaimer: This report is for informational purposes only. Equitix provides educational content, not financial advice.
        </p>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }

    toast({ title: "PDF Ready", description: "Print dialog opened for PDF export." });
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold mb-2">Portfolio</h1>
              <p className="text-muted-foreground">Track your investments and watchlist</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={exportToCSV} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button onClick={exportToPDF} className="gap-2 gradient-gold text-primary-foreground">
                <FileText className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          <Card className="border-gold/20 gold-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm text-muted-foreground">Total Value</span>
              </div>
              <div className="text-3xl font-semibold">Rs.{totalValue.toLocaleString("en-IN")}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    totalGain >= 0 ? "bg-success/10" : "bg-destructive/10"
                  )}
                >
                  {totalGain >= 0 ? (
                    <ArrowUpRight className="w-5 h-5 text-success" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">Total Gain/Loss</span>
              </div>
              <div
                className={cn(
                  "text-3xl font-semibold",
                  totalGain >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {totalGain >= 0 ? "+" : ""}Rs.{Math.abs(totalGain).toLocaleString("en-IN")}
              </div>
              <div
                className={cn(
                  "text-sm mt-1",
                  totalGain >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {totalGainPercent >= 0 ? "+" : ""}{totalGainPercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Holdings</span>
              </div>
              <div className="text-3xl font-semibold">{portfolio.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Active positions</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Holdings & Chart */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioChartData}>
                        <defs>
                          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(42, 92%, 56%)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="hsl(42, 92%, 56%)" stopOpacity={0} />
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
                          tickFormatter={(value) => `Rs.${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          formatter={(value: number) => [`Rs.${value.toLocaleString("en-IN")}`, "Value"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="close"
                          stroke="hsl(42, 92%, 56%)"
                          strokeWidth={2}
                          fill="url(#portfolioGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Holdings List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolio.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No holdings yet</p>
                      <p className="text-sm mt-1">Start building your portfolio</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {portfolio.map((holding, index) => (
                        <motion.div
                          key={holding.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 rounded-xl border border-border hover:border-gold/30 hover:bg-muted/50 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm"
                                style={{ backgroundColor: COLORS[index % COLORS.length] + "20", color: COLORS[index % COLORS.length] }}
                              >
                                {holding.symbol.slice(0, 2)}
                              </div>
                              <div>
                                <div className="font-medium">{holding.symbol}</div>
                                <div className="text-xs text-muted-foreground">{holding.quantity} shares @ Rs.{holding.avgPrice.toFixed(2)}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">Rs.{holding.currentValue.toLocaleString("en-IN")}</div>
                              <div
                                className={cn(
                                  "text-xs flex items-center gap-1 justify-end",
                                  holding.gain >= 0 ? "text-success" : "text-destructive"
                                )}
                              >
                                {holding.gain >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {holding.gainPercent >= 0 ? "+" : ""}{holding.gainPercent.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Allocation Chart */}
            {portfolio.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={holdingsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {holdingsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number) => `Rs.${value.toLocaleString("en-IN")}`}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                      {holdingsData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {((item.value / totalValue) * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Watchlist */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-gold" />
                    Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {watchlistStocks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Add stocks to track them here
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {watchlistStocks.slice(0, 6).map((stock) => (
                        <div
                          key={stock.symbol}
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center font-medium text-xs">
                              {stock.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{stock.symbol}</div>
                              <div className="text-xs text-muted-foreground">Rs.{stock.price.toFixed(2)}</div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "text-xs font-medium",
                              stock.change >= 0 ? "text-success" : "text-destructive"
                            )}
                          >
                            {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}