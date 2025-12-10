import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function Bot() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-8">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-semibold mb-4">Connect with Telegram</h1>
          <p className="text-lg text-muted-foreground mb-8">Get instant market alerts, price notifications, and daily insights delivered directly to your Telegram.</p>
          <div className="p-6 rounded-2xl border border-border bg-muted/50 mb-8">
            <h3 className="font-semibold mb-4">How it works</h3>
            <ol className="text-left text-sm text-muted-foreground space-y-3">
              <li>1. Click the button below to open our Telegram bot</li>
              <li>2. Start a conversation with /start</li>
              <li>3. Link your Equitix account</li>
              <li>4. Configure your notification preferences</li>
            </ol>
          </div>
          <Button size="lg" className="mb-4">Open Telegram Bot<ArrowRight className="w-4 h-4 ml-2" /></Button>
          <p className="text-sm text-muted-foreground">Integration will be activated soon.</p>
        </motion.div>
      </div>
    </div>
  );
}
