// Sample stock data for the application
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  high52w: number;
  low52w: number;
  sector: string;
}

export interface StockHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  summary: string;
}

export const sampleStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.52,
    change: 2.34,
    changePercent: 1.33,
    volume: "52.3M",
    marketCap: "2.78T",
    high52w: 199.62,
    low52w: 164.08,
    sector: "Technology",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 141.80,
    change: -0.95,
    changePercent: -0.67,
    volume: "18.7M",
    marketCap: "1.76T",
    high52w: 153.78,
    low52w: 115.83,
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.91,
    change: 4.12,
    changePercent: 1.10,
    volume: "21.2M",
    marketCap: "2.81T",
    high52w: 384.30,
    low52w: 309.45,
    sector: "Technology",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 185.07,
    change: 1.89,
    changePercent: 1.03,
    volume: "38.5M",
    marketCap: "1.92T",
    high52w: 191.70,
    low52w: 118.35,
    sector: "Consumer Cyclical",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 495.22,
    change: 12.45,
    changePercent: 2.58,
    volume: "45.8M",
    marketCap: "1.22T",
    high52w: 505.48,
    low52w: 138.84,
    sector: "Technology",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.48,
    change: -3.21,
    changePercent: -1.28,
    volume: "112.4M",
    marketCap: "789.5B",
    high52w: 299.29,
    low52w: 152.37,
    sector: "Consumer Cyclical",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 505.95,
    change: 8.23,
    changePercent: 1.65,
    volume: "14.2M",
    marketCap: "1.30T",
    high52w: 531.49,
    low52w: 274.38,
    sector: "Technology",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 195.42,
    change: 1.15,
    changePercent: 0.59,
    volume: "8.7M",
    marketCap: "561.2B",
    high52w: 200.94,
    low52w: 135.19,
    sector: "Financial",
  },
];

export const generateStockHistory = (basePrice: number, days: number = 90): StockHistory[] => {
  const history: StockHistory[] = [];
  let currentPrice = basePrice * 0.85;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const volatility = 0.02 + Math.random() * 0.03;
    const change = (Math.random() - 0.48) * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, currentPrice * 0.9);
    
    const open = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
    const close = currentPrice;
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);
    const volume = Math.floor(Math.random() * 50000000 + 10000000);
    
    history.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });
  }
  
  return history;
};

export const sampleNews: NewsItem[] = [
  {
    id: "1",
    title: "Tech stocks rally as AI investments surge across the sector",
    source: "Market Watch",
    time: "2 hours ago",
    sentiment: "positive",
    summary: "Major technology companies reported increased capital allocation toward artificial intelligence infrastructure.",
  },
  {
    id: "2",
    title: "Federal Reserve signals potential rate adjustments in Q2",
    source: "Reuters",
    time: "4 hours ago",
    sentiment: "neutral",
    summary: "Fed officials discussed the economic outlook and monetary policy considerations for the upcoming quarter.",
  },
  {
    id: "3",
    title: "Energy sector faces headwinds amid global supply concerns",
    source: "Bloomberg",
    time: "5 hours ago",
    sentiment: "negative",
    summary: "Oil and gas companies navigate challenging market conditions as supply chain disruptions persist.",
  },
  {
    id: "4",
    title: "Healthcare innovation drives sector growth expectations",
    source: "Financial Times",
    time: "6 hours ago",
    sentiment: "positive",
    summary: "Pharmaceutical and biotech firms announce breakthrough developments in treatment methodologies.",
  },
  {
    id: "5",
    title: "Consumer spending remains resilient despite inflation pressures",
    source: "CNBC",
    time: "8 hours ago",
    sentiment: "positive",
    summary: "Retail sales data indicates continued consumer confidence across discretionary categories.",
  },
];

export const sectorData = [
  { name: "Technology", value: 28.5, change: 2.1, sentiment: "positive" },
  { name: "Healthcare", value: 14.2, change: 0.8, sentiment: "positive" },
  { name: "Financial", value: 12.8, change: -0.3, sentiment: "neutral" },
  { name: "Consumer", value: 11.5, change: 1.2, sentiment: "positive" },
  { name: "Energy", value: 8.9, change: -1.5, sentiment: "negative" },
  { name: "Industrial", value: 8.4, change: 0.4, sentiment: "neutral" },
  { name: "Materials", value: 5.2, change: -0.2, sentiment: "neutral" },
  { name: "Utilities", value: 4.8, change: 0.1, sentiment: "neutral" },
];
