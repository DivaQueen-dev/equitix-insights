import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bell, Zap, Shield } from "lucide-react";

const TELEGRAM_URL = "https://t.me/Lvtehelp_bot";

export default function Telegram() {
  const handleClick = (e: React.MouseEvent) => {
    // debug: show event in console
    // eslint-disable-next-line no-console
    console.log("Telegram button clicked", e);

    // fallback navigation for environments that block window.open
    try {
      // try to open in new window/tab first
      const w = window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
      if (!w) {
        // if popup blocked, fall back to changing location
        window.location.href = TELEGRAM_URL;
      }
    } catch (err) {
      // fallback always
      window.location.href = TELEGRAM_URL;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Connect with Telegram</h1>
          <p className="text-lg text-muted-foreground">
            Get instant alerts and market insights delivered directly to your Telegram messenger.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: Bell, title: "Price Alerts", description: "Get notified when stocks hit your target prices" },
            { icon: Zap, title: "Daily Summaries", description: "Receive market overviews each morning" },
            { icon: Shield, title: "Secure", description: "Your data stays private and encrypted" },
          ].map((item) => (
            <Card key={item.title} variant="flat" padding="lg">
              <CardContent className="text-center">
                <div className="w-10 h-10 rounded-lg bg-panel flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card variant="elevated" padding="xl">
            <CardHeader>
              <CardTitle className="text-center">Connect Your Telegram</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground">
                Click the button below to open our Telegram bot and link your account. You will receive a confirmation message once connected.
              </p>

              {/* Anchor wraps the Button to ensure native link behaviour */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // run fallback after the native action so we still get normal anchor behavior
                  // small timeout gives anchor a chance to run; still logs for debugging
                  setTimeout(() => handleClick(e as unknown as React.MouseEvent), 50);
                }}
                className="inline-block"
              >
                <Button size="xl" className="w-full max-w-xs mx-auto">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Open Telegram Bot
                </Button>
              </a>

              <div className="p-4 bg-panel rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Integration will be activated soon. Check back for updates on bot availability.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
