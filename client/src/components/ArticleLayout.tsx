import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareButtons } from "./ShareButtons";
import { Sidebar } from "./Sidebar";

export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-200">
      <Header />
      {children}
      <Footer />
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
    <div className="relative">
      {/* Modern navy blue header with JusticeMind branding */}
      <div className="bg-gray-950 border-b border-blue-900/30 py-2 px-4 flex items-center">
        <div className="text-blue-400 font-semibold text-lg">JusticeMind<span className="text-white">s</span></div>
      </div>
      
      {/* Modern hero bar with two-tone design - darker top and royal blue bottom */}
      <section className="relative overflow-hidden">
        {/* Top darker section */}
        <div className="bg-gray-950 pt-10 pb-12 relative overflow-hidden">
          {/* Moving light backdrop effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-1/4 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-light-move"></div>
            <div className="absolute -inset-1/4 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-blue-400/5 to-transparent animate-light-move-slow transform rotate-12"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-6xl text-white font-bold leading-tight tracking-tight">
                The Extraordinary Rarity <br className="hidden md:block" />
                of Ben's Parliamentary <br className="hidden md:block" />
                Advocacy Success
              </h1>
            </div>
          </div>
        </div>
        
        {/* Bottom royal blue section */}
        <div className="bg-blue-800 py-10 relative">
          {/* Moving light backdrop effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-1/4 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-light-move-reverse"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-blue-100 mb-4 uppercase tracking-wider text-sm font-semibold px-3 py-1 bg-blue-700/40 rounded-full inline-block border border-blue-400/20">A Statistical Analysis</div>
                
                <div className="flex items-center justify-center space-x-4 mt-8">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden p-0.5">
                    <div className="h-full w-full rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
                      {authorName.charAt(0)}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-lg text-white">{authorName}</div>
                    <div className="text-blue-100 text-sm">Published: {publishDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <ol className="list-decimal pl-8 space-y-2 text-[0.9rem] leading-[1.4] text-gray-400">
                {sources.map((source) => (
                  <li key={source.id} className="mb-2">
                    [{source.id}] <a href={source.url} className="text-primary hover:underline">{source.text}</a>
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
