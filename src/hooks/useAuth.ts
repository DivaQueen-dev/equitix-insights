import { useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  joinedDate?: string;
  acceptedTerms?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('equitix-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    const userWithDate = {
      ...userData,
      joinedDate: userData.joinedDate || new Date().toISOString(),
    };
    localStorage.setItem('equitix-user', JSON.stringify(userWithDate));
    setUser(userWithDate);
  };

  const logout = () => {
    localStorage.removeItem('equitix-user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      localStorage.setItem('equitix-user', JSON.stringify(updated));
      setUser(updated);
    }
  };

  const acceptTerms = () => {
    if (user) {
      const updated = { ...user, acceptedTerms: true };
      localStorage.setItem('equitix-user', JSON.stringify(updated));
      setUser(updated);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasAcceptedTerms: user?.acceptedTerms ?? false,
    login,
    logout,
    updateUser,
    acceptTerms,
  };
}
