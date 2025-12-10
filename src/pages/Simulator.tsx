import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
  Save,
  RotateCcw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart as RechartsPie,
} from "recharts";
import { sampleStocks } from "@/data/stocks";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Simulator() {
  const [selectedStock, setSelectedStock] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();
  const {
    portfolio,
    addStock,
    removeStock,
    clearPortfolio,
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
  } = usePortfolio();

  const handleAddStock = () => {
    const stock = sampleStocks.find((s) => s.symbol === selectedStock);
    if (!stock || !buyPrice || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a stock.",
        variant: "destructive",
      });
      return;
    }

    addStock({
      symbol: stock.symbol,
      name: stock.name,
      buyPrice: parseFloat(buyPrice),
      quantity: parseInt(quantity),
      currentPrice: stock.price,
    });

    toast({
      title: "Stock Added",
      description: `Added ${quantity} shares of ${stock.symbol} to your portfolio.`,
    });

    setSelectedStock("");
    setBuyPrice("");
    setQuantity("");
  };

  const portfolioStats = useMemo(() => {
    return {
      totalValue: totalValue,
      totalCost: totalCost,
      profitLoss: totalGain,
      profitLossPercent: totalGainPercent,
    };
  }, [totalValue, totalCost, totalGain, totalGainPercent]);

  const pieData = useMemo(() => {
    return portfolio.map((item) => ({
      name: item.symbol,
      value: item.currentPrice * item.quantity,
    }));
  }, [portfolio]);

  const projectionData = useMemo(() => {
    const months = 12;
    const data = [];
    let value = portfolioStats.totalValue;

    for (let i = 0; i <= months; i++) {
      data.push({
        month: `M${i}`,
        conservative: value * Math.pow(1.005, i),
        moderate: value * Math.pow(1.01, i),
        aggressive: value * Math.pow(1.015, i),
      });
    }

    return data;
  }, [portfolioStats.totalValue]);

  const COLORS = ["hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--destructive))", "hsl(174, 20%, 60%)", "hsl(210, 8%, 70%)"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold mb-2">Portfolio Simulator</h1>
          <p className="text-muted-foreground">
            Test investment strategies and track simulated performance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add Stock Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Stock</Label>
                  <Select value={selectedStock} onValueChange={setSelectedStock}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a stock" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleStocks.map((stock) => (
                        <SelectItem key={stock.symbol} value={stock.symbol}>
                          {stock.symbol} - {stock.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Buy Price ($)</Label>
                  <Input
                    type="number"
                    placeholder="Enter buy price"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                  />
                </div>

                <Button onClick={handleAddStock} className="w-full">
                  Add to Portfolio
                </Button>

                {selectedStock && (
                  <div className="p-3 bg-panel rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="font-semibold">
                      ${sampleStocks.find((s) => s.symbol === selectedStock)?.price.toFixed(2)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Portfolio Actions */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Portfolio Saved",
                        description: "Your portfolio has been saved locally.",
                      });
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      clearPortfolio();
                      toast({
                        title: "Portfolio Cleared",
                        description: "All stocks have been removed.",
                      });
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats */}
            <div className="grid sm:grid-cols-4 gap-4">
              <Card padding="sm">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${portfolioStats.totalValue.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card padding="sm">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${portfolioStats.totalCost.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card padding="sm">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Profit/Loss</p>
                  <p
                    className={cn(
                      "text-2xl font-bold flex items-center gap-1",
                      portfolioStats.profitLoss >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {portfolioStats.profitLoss >= 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    ${Math.abs(portfolioStats.profitLoss).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card padding="sm">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Return</p>
                  <p
                    className={cn(
                      "text-2xl font-bold",
                      portfolioStats.profitLossPercent >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {portfolioStats.profitLossPercent >= 0 ? "+" : ""}
                    {portfolioStats.profitLossPercent.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Holdings */}
            <Card>
              <CardHeader>
                <CardTitle>Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.length === 0 ? (
                  <div className="text-center py-8">
                    <PieChart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No stocks in your portfolio yet. Add some to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {portfolio.map((item) => {
                      const profitLoss = (item.currentPrice - item.buyPrice) * item.quantity;
                      const profitLossPercent = ((item.currentPrice - item.buyPrice) / item.buyPrice) * 100;

                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-panel rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-semibold text-sm">
                              {item.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-medium">{item.symbol}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.quantity} shares @ ${item.buyPrice.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="font-medium">
                                ${(item.currentPrice * item.quantity).toFixed(2)}
                              </div>
                              <div
                                className={cn(
                                  "text-sm",
                                  profitLoss >= 0 ? "text-success" : "text-destructive"
                                )}
                              >
                                {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)} (
                                {profitLossPercent >= 0 ? "+" : ""}
                                {profitLossPercent.toFixed(2)}%)
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStock(item.id)}
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Charts */}
            {portfolio.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pieData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number) => `$${value.toFixed(2)}`}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {pieData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Projection */}
                <Card>
                  <CardHeader>
                    <CardTitle>12-Month Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={projectionData}>
                          <defs>
                            <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="month"
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
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                            formatter={(value: number) => `$${value.toFixed(2)}`}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="moderate"
                            stroke="hsl(var(--accent))"
                            strokeWidth={2}
                            fill="url(#colorModerate)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      Projection assumes 1% monthly growth. Actual returns may vary.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
