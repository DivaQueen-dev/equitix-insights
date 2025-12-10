import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Stock Analysis", href: "/analysis" },
    { label: "Dashboard", href: "/dashboard" },
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
    { label: "Privacy Policy", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-semibold text-sm">E</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Equitix</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Invest smarter with data-driven insights and educational resources.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
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
