import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
      url: "https://committees.parliament.uk/committee/326/petitions-committee/news/196636/what-happens-to-parliamentary-petitions/"
    },
    {
      title: "MP Correspondence: The Hidden Numbers",
      description: "How constituent issues are filtered through the parliamentary system",
      url: "https://www.gov.uk/government/publications/data-on-responses-to-correspondence-from-mps-and-peers-2023/data-on-responses-to-correspondence-from-mps-and-peers-in-2023-html"
    },
    {
      title: "Historical Case Studies in Citizen Advocacy",
      description: "From Elizey Price to modern day success stories",
      url: "https://www.liverpoolecho.co.uk/news/liverpool-news/how-being-scouser-saved-strangers-15590599"
    },
    {
      title: "Ben Mak: Fashion Designer's Journey",
      description: "Liverpool fashion designer Ben Mak's inspiring story",
      url: "https://www.liverpoolecho.co.uk/news/real-lives/liverpool-fashion-designer-ben-maks-9671672"
    },
    {
      title: "Dan Carden: Pride Advocacy",
      description: "MP Dan Carden's work supporting LGBTQ+ rights",
      url: "https://www.liverpoolecho.co.uk/news/liverpool-news/liverpool-mp-dan-carden-shares-18563599"
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
      <div className="sticky sticky-sidebar top-16 pt-4">
        {/* About Justice Minds */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
          <h4 className="text-lg font-heading font-semibold mb-4 text-white">About Justice Minds</h4>
          <p className="text-sm mb-4 text-gray-300">
            Justice Minds is dedicated to promoting transparency and understanding of legal and parliamentary 
            processes through data-driven analysis and informed reporting.
          </p>
          <Link href="/about" className="text-primary hover:underline text-sm font-medium">
            Learn more about our mission
          </Link>
        </div>
        
        {/* Related Articles */}
        <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-lg font-heading font-semibold mb-4 text-white">Related Articles</h4>
          <ul className="space-y-4">
            {relatedArticles.map((article, index) => (
              <li key={index} className="border-b border-gray-800 pb-4">
                <Link href={article.url} className="hover:text-primary">
                  <h5 className="font-medium mb-1 text-gray-300">{article.title}</h5>
                  <p className="text-sm text-gray-400">{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-blue-900 text-white p-6 rounded-lg border border-blue-800">
          <h4 className="text-lg font-heading font-semibold mb-3">Stay Informed</h4>
          <p className="text-sm mb-4 text-gray-200">
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
                className="w-full px-4 py-2 rounded text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-opacity-90 transition-colors text-white font-medium py-2 px-4 rounded"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
