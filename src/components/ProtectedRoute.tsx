import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, hasAcceptedTerms, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (!hasAcceptedTerms) {
      navigate("/terms", { replace: true });
    }
  }, [isAuthenticated, hasAcceptedTerms, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !hasAcceptedTerms) {
    return null;
  }

  return <>{children}</>;
}
