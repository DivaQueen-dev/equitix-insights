import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, MessageSquare, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { sendContactEmail } from "@/services/emailService";
import { FloatingOrbs } from "@/components/ui/glow-effect";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendContactEmail(formData.name, formData.email, formData.message);
      setIsSuccess(true);
      toast({ 
        title: "Message sent successfully!", 
        description: "We'll get back to you within 24-48 hours." 
      });
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({ 
        title: "Failed to send message", 
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      <FloatingOrbs className="opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6"
          >
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </motion.span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-10">Have questions? We'd love to hear from you.</p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit} 
            className="space-y-6 p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xl"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required 
                className="h-12 bg-background/50" 
                placeholder="Your name"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required 
                className="h-12 bg-background/50" 
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">Message</Label>
              <Textarea 
                id="message" 
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required 
                rows={5} 
                className="bg-background/50 resize-none"
                placeholder="How can we help you?"
                disabled={isLoading}
              />
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="w-full h-14 text-base gradient-gold text-primary-foreground shadow-lg shadow-gold/20" 
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-6 rounded-2xl bg-muted/50 text-center"
          >
            <Mail className="w-8 h-8 mx-auto mb-3 text-gold" />
            <p className="text-sm text-muted-foreground">
              Or email us directly at <a href="mailto:support@equitix.com" className="text-foreground font-medium hover:text-gold transition-colors">support@equitix.com</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
