import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareButtons } from "./ShareButtons";
import { Sidebar } from "./Sidebar";

export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
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
    <section className="bg-gradient-to-r from-primary via-primary/90 to-secondary py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 rounded-full bg-white/20 -top-20 -right-20 blur-3xl"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white/15 bottom-0 left-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/80 text-white inline-block px-3 py-1 rounded mb-4 uppercase tracking-wider text-sm font-semibold">Press Release</div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">{title}</h1>
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm p-0.5 overflow-hidden shadow-lg">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-white to-secondary/50 flex items-center justify-center text-primary font-bold">
                {authorName.charAt(0)}
              </div>
            </div>
            <div>
              <div className="font-medium text-white">{authorName}</div>
              <div className="text-white/70 text-sm">Published: {publishDate}</div>
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
          <article className="article-content md:w-2/3 max-w-prose mx-auto">
            {content}
            
            {/* Social sharing */}
            <ShareButtons 
              title="The Extraordinary Rarity of Ben's Parliamentary Advocacy Success"
              url={window.location.href}
            />
            
            {/* Sources section */}
            <div className="mt-12 mb-8">
              <h3 className="text-xl font-heading font-semibold mb-4">Sources & Citations</h3>
              <ol className="list-decimal pl-8 space-y-2 text-[0.9rem] leading-[1.4] text-gray-600">
                {sources.map((source) => (
                  <li key={source.id} className="mb-2">
                    [{source.id}] <a href={source.url} className="text-secondary hover:underline">{source.text}</a>
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
    <div className="relative pl-6 my-8 italic text-lg py-2">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
      <div className="relative z-10 text-gray-700">
        {children}
      </div>
    </div>
  );
}
