import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import justiceMindLogo from "../assets/justice_minds_logo.jpeg";

interface RelatedArticle {
  title: string;
  description: string;
  url: string;
}

export function Sidebar() {
  const [email, setEmail] = useState("");
  
  const relatedArticles: RelatedArticle[] = [
    {
      title: "Understanding Parliamentary Petition Success Rates",
      description: "A statistical breakdown of citizen petition outcomes in Parliament",
      url: "/articles/parliamentary-petition-success-rates"
    },
    {
      title: "MP Correspondence: The Hidden Numbers",
      description: "How constituent issues are filtered through the parliamentary system",
      url: "/articles/mp-correspondence-hidden-numbers"
    },
    {
      title: "Historical Case Studies in Citizen Advocacy",
      description: "From Elizey Price to modern day success stories",
      url: "/articles/historical-citizen-advocacy"
    }
  ];
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the email to a backend service
    console.log("Subscribed with email:", email);
    setEmail("");
    // Show success message or handle errors
  };
  
  return (
    <aside className="md:w-1/3 md:pl-12 mt-12 md:mt-0">
      <div className="sticky top-24">
        {/* About Justice Minds */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-6 rounded-lg mb-8 border border-accent/20 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={justiceMindLogo} 
              alt="Justice Minds Logo" 
              className="h-8 w-auto rounded"
            />
            <h4 className="text-lg font-heading font-semibold">About Justice Minds</h4>
          </div>
          <p className="text-sm mb-4 text-gray-700">
            Justice Minds is dedicated to promoting transparency and understanding of legal and parliamentary 
            processes through data-driven analysis and informed reporting.
          </p>
          <Link 
            href="/about" 
            className="text-secondary hover:text-primary transition-colors text-sm font-medium inline-flex items-center"
          >
            Learn more about our mission
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Related Articles */}
        <div className="mb-8 bg-white p-6 rounded-lg border border-accent/20 shadow-sm">
          <h4 className="text-lg font-heading font-semibold mb-4 pb-2 border-b border-accent/30">Related Articles</h4>
          <ul className="space-y-4">
            {relatedArticles.map((article, index) => (
              <li key={index} className="group">
                <Link href={article.url} className="block py-3 px-4 -mx-4 rounded-md transition-colors hover:bg-primary/5">
                  <h5 className="font-medium mb-1 text-primary group-hover:text-secondary transition-colors">{article.title}</h5>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-lg shadow-md relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-40 h-40 rounded-full bg-white -top-10 -right-10 blur-xl"></div>
            <div className="absolute w-40 h-40 rounded-full bg-white bottom-0 left-10 blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-lg font-heading font-semibold mb-3">Stay Informed</h4>
            <p className="text-sm mb-4 text-white/90">
              Receive updates on justice system analyses and parliamentary advocacy insights.
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded text-text focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm border-white/20 placeholder-white/60 text-white"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white hover:bg-white/90 transition-colors text-primary font-medium py-2 px-4 rounded"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
