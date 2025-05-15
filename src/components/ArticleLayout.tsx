import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareButtons } from "./ShareButtons";
import { Sidebar } from "./Sidebar";
import { useEffect, useRef } from "react";

export function ArticleLayout({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollToFooter = () => {
      footerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("scrollToFooter", handleScrollToFooter);
    return () => window.removeEventListener("scrollToFooter", handleScrollToFooter);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-200">
      <Header />
      {children}
      <div ref={footerRef}>
      <Footer  />
      </div>
    </div>
  );
}

interface ArticleHeroProps {
  title: string;
  authorName: string;
  publishDate: string;
}

export function ArticleHero({ title, authorName, publishDate }: ArticleHeroProps) {
  return (
    // <div className="relative">
      <section className="bg-blue-600 text-white px-6 py-12 min-h-[500px] flex items-center">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase text-sm font-semibold tracking-wide mb-4">
          Press Release
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
          The Extraordinary Rarity of Ben's Parliamentary Advocacy Success: A Statistical Analysis
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
            J
          </div>
          <div className="text-sm">
            <p className="font-medium">Justice Minds Editorial Team</p>
            <p className="text-white/70">Published: November 30, 2024</p>
          </div>
        </div>
      </div>
    </section>
    // </div>
  );
}

interface ArticleContentProps {
  content: React.ReactNode;
  sources: {
    id: string;
    text: string;
    url: string;
  }[];
}

export function ArticleContent({ content, sources }: ArticleContentProps) {
  return (
    <main className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
          {/* Left column - Article content */}
          <article className="article-content md:w-2/3 mx-auto">
            {content}
            
            {/* Social sharing */}
            <ShareButtons 
              title="The Extraordinary Rarity of Ben's Parliamentary Advocacy Success"
              url={window.location.href}
            />
            
            {/* Sources section */}
            <div className="mt-12 mb-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-heading font-semibold mb-4 text-white">Sources & Citations</h3>
              <ol className="list-decimal pl-8 space-y-2 text-[0.9rem] leading-[1.4] text-gray-400">
                {sources.map((source) => (
                  <li key={source.id} className="mb-2">
                    [{source.id}] <a href={source.url} className="text-blue-500 hover:underline hover:text-blue-600">{source.text}</a>
                  </li>
                ))}
              </ol>
            </div>
          </article>
          
          {/* Right column - Sidebar */}
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

interface PullQuoteProps {
  children: React.ReactNode;
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <div className="relative pl-6 my-8 italic text-lg border-l-4 border-primary py-4 bg-gray-900 bg-opacity-50 rounded-r-lg pr-6">
      {children}
    </div>
  );
}
