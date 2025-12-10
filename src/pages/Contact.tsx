import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast({ title: "Message sent", description: "We'll get back to you soon." });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
          <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-8">Have questions? We'd love to hear from you.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" required className="h-12" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required className="h-12" /></div>
            <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" required rows={5} /></div>
            <Button type="submit" className="w-full h-12" disabled={isLoading}>{isLoading ? "Sending..." : "Send Message"}<Send className="w-4 h-4 ml-2" /></Button>
          </form>
          <p className="mt-8 text-sm text-muted-foreground text-center">Or email us directly at support@equitix.com</p>
        </motion.div>
      </div>
    </div>
  );
}
