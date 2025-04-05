import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";

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
        <div className="bg-accent bg-opacity-20 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-heading font-semibold mb-4">About Justice Minds</h4>
          <p className="text-sm mb-4">
            Justice Minds is dedicated to promoting transparency and understanding of legal and parliamentary 
            processes through data-driven analysis and informed reporting.
          </p>
          <Link href="/about" className="text-secondary hover:underline text-sm font-medium">
            Learn more about our mission
          </Link>
        </div>
        
        {/* Related Articles */}
        <div className="mb-8">
          <h4 className="text-lg font-heading font-semibold mb-4">Related Articles</h4>
          <ul className="space-y-4">
            {relatedArticles.map((article, index) => (
              <li key={index} className="border-b border-accent pb-4">
                <Link href={article.url} className="hover:text-secondary">
                  <h5 className="font-medium mb-1">{article.title}</h5>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-primary text-white p-6 rounded-lg">
          <h4 className="text-lg font-heading font-semibold mb-3">Stay Informed</h4>
          <p className="text-sm mb-4">
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
                className="w-full px-4 py-2 rounded text-text focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-opacity-90 transition-colors text-white font-medium py-2 px-4 rounded"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
