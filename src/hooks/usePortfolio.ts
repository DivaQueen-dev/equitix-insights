import { useState, useCallback, useMemo, useEffect } from "react";
import { sampleStocks } from "@/data/stocks";

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  buyPrice: number;
  quantity: number;
  currentPrice: number;
}

// Sample portfolio data for demonstration
const defaultPortfolio: PortfolioItem[] = [
  { id: "1", symbol: "RELIANCE", name: "Reliance Industries", buyPrice: 2380, quantity: 25, currentPrice: 2456 },
  { id: "2", symbol: "TCS", name: "Tata Consultancy Services", buyPrice: 3650, quantity: 15, currentPrice: 3780 },
  { id: "3", symbol: "INFY", name: "Infosys Limited", buyPrice: 1420, quantity: 40, currentPrice: 1485 },
  { id: "4", symbol: "HDFCBANK", name: "HDFC Bank", buyPrice: 1580, quantity: 30, currentPrice: 1620 },
  { id: "5", symbol: "ICICIBANK", name: "ICICI Bank", buyPrice: 980, quantity: 50, currentPrice: 1045 },
];

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem("equitix-portfolio");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : defaultPortfolio;
      } catch {
        return defaultPortfolio;
      }
    }
    return defaultPortfolio;
  });

  // Update current prices from sample stocks
  const portfolioWithUpdatedPrices = useMemo(() => {
    return portfolio.map((item) => {
      const stockData = sampleStocks.find((s) => s.symbol === item.symbol);
      return {
        ...item,
        currentPrice: stockData?.price || item.currentPrice,
        name: stockData?.name || item.name,
      };
    });
  }, [portfolio]);

  const saveToStorage = useCallback((items: PortfolioItem[]) => {
    localStorage.setItem("equitix-portfolio", JSON.stringify(items));
  }, []);

  const addStock = useCallback((item: Omit<PortfolioItem, "id">) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `${item.symbol}-${Date.now()}`,
    };
    setPortfolio((prev) => {
      const updated = [...prev, newItem];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeStock = useCallback((id: string) => {
    setPortfolio((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const updateStock = useCallback((id: string, updates: Partial<PortfolioItem>) => {
    setPortfolio((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const clearPortfolio = useCallback(() => {
    setPortfolio([]);
    localStorage.removeItem("equitix-portfolio");
  }, []);

  // Computed values
  const totalValue = useMemo(() => {
    return portfolioWithUpdatedPrices.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  }, [portfolioWithUpdatedPrices]);

  const totalCost = useMemo(() => {
    return portfolioWithUpdatedPrices.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  }, [portfolioWithUpdatedPrices]);

  const totalGain = totalValue - totalCost;
  const totalGainPercent = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

  // Enhanced portfolio items with computed fields
  const enhancedPortfolio = useMemo(() => {
    return portfolioWithUpdatedPrices.map((item) => {
      const currentValue = item.currentPrice * item.quantity;
      const costBasis = item.buyPrice * item.quantity;
      const gain = currentValue - costBasis;
      const gainPercent = item.buyPrice > 0 ? ((item.currentPrice - item.buyPrice) / item.buyPrice) * 100 : 0;
      
      return {
        ...item,
        avgPrice: item.buyPrice,
        currentValue,
        gain,
        gainPercent,
      };
    });
  }, [portfolioWithUpdatedPrices]);

  return {
    portfolio: enhancedPortfolio,
    addStock,
    removeStock,
    updateStock,
    clearPortfolio,
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
  };
}