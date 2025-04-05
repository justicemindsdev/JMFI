import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// Use House of Commons logo (using relative path since SVG is custom created)
// Import custom SVG directly from assets folder in client
const commonsLogo = "/house_of_commons_logo.svg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-gray-800 sticky top-0 bg-gray-950 z-10 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <img 
            src={commonsLogo} 
            alt="House of Commons Logo" 
            className="h-8 w-auto hidden md:block" 
          />
          <div className="text-white font-bold text-xl">
            <span className="text-primary">Justice</span>Minds
          </div>
        </Link>
        
        <nav className={`${
          isMenuOpen 
            ? 'flex flex-col absolute top-16 right-4 bg-gray-900 shadow-md p-4 rounded z-20 border border-gray-800' 
            : 'hidden'
          } md:flex md:static md:flex-row md:shadow-none md:p-0 md:space-x-6 md:bg-transparent`}>
          <Link href="/about" className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0">
            About
          </Link>
          <Link href="/press" className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0">
            Press
          </Link>
          <Link href="/resources" className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0">
            Resources
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0">
            Contact
          </Link>
        </nav>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden text-white border-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </header>
  );
}
