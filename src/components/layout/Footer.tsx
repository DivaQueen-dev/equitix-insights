import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Simulator", href: "/simulator" },
    { label: "Learning", href: "/learn" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  connect: [
    { label: "Telegram Bot", href: "/telegram" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Equitix</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Invest smarter with intelligent market analysis and predictive insights.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
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

          <div>
            <h4 className="font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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

          <div>
            <h4 className="font-medium text-sm mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
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
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            2024 Equitix. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Market data for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
