import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";

const publicLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
];

const protectedLinks = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Analysis", href: "/analysis" },
    { label: "Simulator", href: "/simulator" },
  ],
  Learn: [
    { label: "Beginner Guide", href: "/guide" },
    { label: "Masterclasses", href: "/masterclasses" },
    { label: "Community", href: "/community" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Telegram Bot", href: "/bot" },
  ],
  Legal: [
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  const { isAuthenticated, hasAcceptedTerms } = useAuth();
  const isProtected = isAuthenticated && hasAcceptedTerms;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-6 py-16">
        {isProtected ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <Logo size="sm" className="mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Invest smarter with data-driven insights and educational resources.
              </p>
            </div>

            {Object.entries(protectedLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-medium text-sm mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo size="sm" />
            <div className="flex gap-6">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            2024 Equitix. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            For educational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}