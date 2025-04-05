import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import justiceMindLogo from "../assets/justice_minds_logo.jpeg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-accent sticky top-0 bg-white z-10 shadow-sm">
      <div className="bg-gradient-to-r from-primary to-secondary h-1"></div>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <img 
            src={justiceMindLogo} 
            alt="Justice Minds Logo" 
            className="h-10 w-auto rounded"
          />
          <div className="text-primary font-bold text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Justice</span>
            <span className="text-primary">Minds</span>
          </div>
        </Link>
        
        <nav className={`${isMenuOpen ? 'flex flex-col absolute top-16 right-4 bg-white shadow-md p-4 rounded z-20' : 'hidden'} md:flex md:static md:flex-row md:shadow-none md:p-0 md:space-x-6`}>
          <Link href="/about" className="text-text hover:text-secondary transition-colors py-2 md:py-0">
            About
          </Link>
          <Link href="/press" className="text-text hover:text-secondary transition-colors py-2 md:py-0 font-medium">
            Press
          </Link>
          <Link href="/resources" className="text-text hover:text-secondary transition-colors py-2 md:py-0">
            Resources
          </Link>
          <Link href="/contact" className="text-text hover:text-secondary transition-colors py-2 md:py-0">
            Contact
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </header>
  );
}
