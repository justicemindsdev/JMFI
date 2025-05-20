import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareButtons } from "./ShareButtons";
import { Sidebar } from "./Sidebar";
import { useEffect, useRef } from "react";
// import {logo} from "../assets/image.svg"
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
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Gradient Background Behind Logo */}
      <div
        className="absolute top-0 left-0 h-full w-[250px] z-0"
        style={{
          background:
            'linear-gradient(to bottom, black 0%, #0A112A 20%, #1A3499 50%, #0A112A 80%, black 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-10 md:py-16 min-h-[400px] md:min-h-[500px]">
        {/* Logo Section */}
        <div className="flex-shrink-0 w-48 md:w-72 ml-8 md:ml-14">
          <img
            src={'/attached_assets/Adobe_Express_file_converted.webp'}
            alt="Justice Minds Emblem"
            className="w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            The Extraordinary Rarity of Ben's
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-green-400">Parliamentary Advocacy</span> Success:
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mt-6">
            A Statistical Analysis
          </h2>
        </div>
      </div>
    </div>
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
  <div className="space-y-2 text-[0.9rem] leading-[1.4] text-gray-400 pl-6">
    {sources.map((source, index) => (
      <div key={source.id} className="mb-2 flex items-start">
        <a href={source.url} className="text-blue-500 hover:underline hover:text-blue-600">
          {source.text}
        </a>
      </div>
    ))}
  </div>
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
