import { useState, useCallback } from "react";

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  buyPrice: number;
  quantity: number;
  currentPrice: number;
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem("equitix-portfolio");
    return saved ? JSON.parse(saved) : [];
  });

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

  const getTotalValue = useCallback(() => {
    return portfolio.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  }, [portfolio]);

  const getTotalCost = useCallback(() => {
    return portfolio.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  }, [portfolio]);

  const getTotalProfitLoss = useCallback(() => {
    return getTotalValue() - getTotalCost();
  }, [getTotalValue, getTotalCost]);

  const getTotalProfitLossPercent = useCallback(() => {
    const cost = getTotalCost();
    if (cost === 0) return 0;
    return ((getTotalValue() - cost) / cost) * 100;
  }, [getTotalValue, getTotalCost]);

  return {
    portfolio,
    addStock,
    removeStock,
    updateStock,
    clearPortfolio,
    getTotalValue,
    getTotalCost,
    getTotalProfitLoss,
    getTotalProfitLossPercent,
  };
}
