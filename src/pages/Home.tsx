import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        
        {/* Main Title - Wider */}
        <div className="text-center mb-16 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Extraordinary Rarity of Ben's
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-green-400">Parliamentary Advocacy</span> <span className="text-white">Success:</span>
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            A Statistical Analysis
          </h3>
        </div>
        
        {/* Embedded Logo Credibility Image */}
        <div className="w-full max-w-6xl">
          <img
            src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/caseworks/LOGO_CREDABLITY.png"
            alt="Justice Minds Forensic Intelligence Company Credibility"
            className="w-full h-auto shadow-2xl rounded-lg"
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
