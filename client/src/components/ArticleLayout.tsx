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
    <section className="relative bg-gradient-to-br from-blue-800 to-blue-950 text-white py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/attached_assets/image_1744373336541.png')] bg-cover opacity-20 mix-blend-overlay"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent opacity-30 blur-3xl transform rotate-12"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/attached_assets/LOGO TRANS_1744373361051.png" 
              alt="Justice Minds Logo" 
              className="h-24 w-auto mb-5"
            />
          </div>
          
          <div className="text-center">
            <div className="text-blue-100 mb-4 uppercase tracking-wider text-sm font-semibold px-3 py-1 bg-blue-800/40 rounded-full inline-block border border-blue-400/20">Press Release</div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">{title}</h1>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden p-0.5">
                <div className="h-full w-full rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
                  {authorName.charAt(0)}
                </div>
              </div>
              <div className="text-left">
                <div className="font-medium text-lg">{authorName}</div>
                <div className="text-blue-100 text-sm">Published: {publishDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
