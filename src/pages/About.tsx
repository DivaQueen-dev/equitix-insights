import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8">About Equitix</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>Equitix is an intelligent investment platform that combines real-time market analysis with comprehensive educational resources. We believe that informed investors make better decisions.</p>
            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Our Mission</h2>
            <p>To democratize investment knowledge and provide tools that help everyone understand markets, test strategies, and invest with confidence.</p>
            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Our Vision</h2>
            <p>A world where every investor has access to professional-grade analysis tools and quality education, regardless of their experience level.</p>
            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">What We Offer</h2>
            <ul className="space-y-2">
              <li>Real-time stock analysis and smart predictions</li>
              <li>Portfolio simulation without real risk</li>
              <li>Structured learning from basics to advanced</li>
              <li>Expert-led masterclasses</li>
              <li>Supportive investor community</li>
            </ul>
          </div>
          <div className="mt-12"><Link to="/signup"><Button size="lg">Join Equitix<ArrowRight className="w-4 h-4 ml-2" /></Button></Link></div>
        </motion.div>
      </div>
    </div>
  );
}
