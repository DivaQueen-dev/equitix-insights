import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";

const publicNavLinks = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

const protectedNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analysis", label: "Analysis" },
  { href: "/guide", label: "Learn" },
  { href: "/masterclasses", label: "Masterclasses" },
  { href: "/community", label: "Community" },
  { href: "/bot", label: "Telegram" },
];

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated, hasAcceptedTerms } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isProtected = isAuthenticated && hasAcceptedTerms;
  const navLinks = isProtected ? protectedNavLinks : [];

  // Hide navbar on auth pages
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (isAuthPage) return null;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="md" animate={!isScrolled} />

          {/* Protected Navigation Links */}
          {isProtected && navLinks.length > 0 && (
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    location.pathname === link.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            {!isProtected ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="hidden sm:block">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Link to="/profile" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
            )}
            
            {isProtected && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}

            {!isProtected && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40"
          >
            <div className="bg-background/95 backdrop-blur-xl border-b border-border mx-4 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 space-y-1">
                {isProtected ? (
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={cn(
                          "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                          location.pathname === link.href
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-border mt-4">
                      <Link to="/profile" className="block">
                        <Button variant="outline" className="w-full">
                          Profile
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
