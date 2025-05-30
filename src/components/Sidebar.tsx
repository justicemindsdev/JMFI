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
      title: "Parliamentary Questions: A Statistical Analysis",
      description: "Examining the success rates of written and oral questions in Parliament",
      url: "https://publications.parliament.uk/pa/cm5803/cmselect/cmproced/385/report.html"
    },
    {
      title: "MP Correspondence: The Hidden Numbers",
      description: "How constituent issues are filtered through the parliamentary system",
      url: "https://www.gov.uk/government/publications/data-on-responses-to-correspondence-from-mps-and-peers-2023/data-on-responses-to-correspondence-from-mps-and-peers-in-2023-html"
    },
    {
      title: "E-Petitions and Democratic Engagement",
      description: "Analysis of citizen participation in the parliamentary petition system",
      url: "https://commonslibrary.parliament.uk/house-of-commons-trends-e-petitions/"
    },
    {
      title: "Urgent Questions: Parliamentary Intervention",
      description: "How urgent questions have evolved as tools for parliamentary scrutiny",
      url: "https://commonslibrary.parliament.uk/house-of-commons-trends-urgent-questions/"
    },
    {
      title: "Individual Advocacy in Parliament",
      description: "Historical and contemporary case studies of successful citizen advocacy",
      url: "https://committees.parliament.uk/committee/326/petitions-committee/news/196636/what-happens-to-parliamentary-petitions/"
    },
    {
      title: "Backbench Business Committee",
      description: "How parliamentary time is allocated for non-governmental business",
      url: "https://en.wikipedia.org/wiki/Backbench_Business_Committee"
    },
    {
      title: "Adjournment Debates and Individual Cases",
      description: "How MPs use adjournment debates to raise constituent concerns",
      url: "https://www.parliament.uk/about/how/business/debates/adjournment/"
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
        
        {/* Key Statistics */}
        <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-lg font-heading font-semibold mb-4 text-white">Key Statistics</h4>
          <ul className="space-y-4">
            <li className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">MP Correspondence</span>
                <span className="text-primary font-bold">206,515</span>
              </div>
              <p className="text-xs text-gray-500">Pieces of correspondence from MPs and Peers in 2023</p>
            </li>
            <li className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Written Questions</span>
                <span className="text-primary font-bold">77,255</span>
              </div>
              <p className="text-xs text-gray-500">Written parliamentary questions in a typical long session</p>
            </li>
            <li className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Petition Success Rate</span>
                <span className="text-primary font-bold">1.2%</span>
              </div>
              <p className="text-xs text-gray-500">Of petitions that receive formal parliamentary debate</p>
            </li>
            <li className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Individual Case Success</span>
                <span className="text-primary font-bold">0.05-0.1%</span>
              </div>
              <p className="text-xs text-gray-500">Probability of achieving formal parliamentary intervention</p>
            </li>
          </ul>
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
        
        {/* Quick Links */}
        <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-lg font-heading font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/parliamentary-questions" className="text-gray-300 hover:text-primary text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Parliamentary Questions Guide
              </Link>
            </li>
            <li>
              <Link href="/petition-system" className="text-gray-300 hover:text-primary text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                E-Petition System Explained
              </Link>
            </li>
            <li>
              <Link href="/mp-correspondence" className="text-gray-300 hover:text-primary text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                MP Correspondence Data
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-gray-300 hover:text-primary text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Individual Advocacy Case Studies
              </Link>
            </li>
            <li>
              <Link href="/statistical-methodology" className="text-gray-300 hover:text-primary text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Statistical Methodology
              </Link>
            </li>
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
