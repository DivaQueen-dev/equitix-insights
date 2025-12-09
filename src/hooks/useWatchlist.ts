import { useState, useCallback } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("equitix-watchlist");
    return saved ? JSON.parse(saved) : ["AAPL", "GOOGL", "MSFT"];
  });

  const saveToStorage = useCallback((symbols: string[]) => {
    localStorage.setItem("equitix-watchlist", JSON.stringify(symbols));
  }, []);

  const addToWatchlist = useCallback((symbol: string) => {
    setWatchlist((prev) => {
      if (prev.includes(symbol)) return prev;
      const updated = [...prev, symbol];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeFromWatchlist = useCallback((symbol: string) => {
    setWatchlist((prev) => {
      const updated = prev.filter((s) => s !== symbol);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const isInWatchlist = useCallback((symbol: string) => {
    return watchlist.includes(symbol);
  }, [watchlist]);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
}
