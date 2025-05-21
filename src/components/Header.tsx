import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/image.svg";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvestigationsOpen, setIsInvestigationsOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const investigationsRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleInvestigations = () =>
    setIsInvestigationsOpen(!isInvestigationsOpen);
  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        investigationsRef.current &&
        !investigationsRef.current.contains(target)
      ) {
        setIsInvestigationsOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleContactClick = () => {
    window.dispatchEvent(new CustomEvent("scrollToFooter"));
  };
  return (
    <header className="border-b border-gray-800 sticky top-0 bg-gray-950 z-50 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center relative">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-12 w-12 relative hidden md:block">
            <img
              src={logo}
              alt="Justice Minds Logo"
              className="h-12 w-auto"
            />
          </div>
          <div className="text-white font-bold text-xl">
            <span className="text-blue-400">Justice</span>Minds Forensic
            Intelligence-test
          </div>
        </Link>

        {/* Hamburger mobile menu button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden ml-auto text-white border-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Desktop navbar */}
        <nav className="hidden md:flex md:flex-row md:space-x-6 md:ml-auto md:items-center">
          <Link
            href="/home"
            className="text-gray-300 hover:text-primary transition-colors py-2"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-primary transition-colors py-2"
          >
            About
          </Link>
          <Link
            href="/press"
            className="text-gray-300 hover:text-primary transition-colors py-2"
          >
            Press
          </Link>
          <Link
            href="/portfolio"
            className="text-gray-300 hover:text-primary transition-colors py-2"
          >
            Portfolio
          </Link>

          {/* Investigations Dropdown */}
          <div ref={investigationsRef} className="relative py-2">
            <button
              onClick={toggleInvestigations}
              className="flex items-center text-gray-300 hover:text-primary transition-colors focus:outline-none"
            >
              <span>Investigations</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            {isInvestigationsOpen && (
              <div className="absolute top-full left-0 mt-1 bg-gray-900 shadow-lg rounded-md border border-gray-800 py-2 w-48 z-30">
                <Link
                  href="/investigations/newlyn-plc"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary"
                >
                  NEWLYN PLC
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={handleContactClick}
            className="text-gray-300 hover:text-primary transition-colors py-2"
          >
            Contact
          </button>

          {/* More menu */}
          <div ref={moreMenuRef} className="relative py-2">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center text-gray-300 hover:text-primary transition-colors focus:outline-none"
              aria-label="More options"
            >
              <Menu className="h-5 w-5" />
            </button>

            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gray-900 shadow-lg rounded-md border border-gray-800 py-2 w-48 z-30">
                <Link
                  href="/tcctv"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary"
                >
                  TCCTV
                </Link>
                <Link
                  href="/substantiation-fixed"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary"
                >
                  Substantiation Fixed
                </Link>
                <Link
                  href="/app"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary"
                >
                  App
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <nav className="flex flex-col absolute top-full right-4 bg-gray-900 shadow-md p-4 rounded z-20 border border-gray-800 w-56 md:hidden">
            <Link
              href="/home"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/press"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Press
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>

            {/* Investigations mobile dropdown */}
            <div ref={investigationsRef} className="relative">
              <button
                onClick={toggleInvestigations}
                className="flex items-center w-full justify-between text-gray-300 hover:text-primary transition-colors py-2 focus:outline-none"
              >
                <span>Investigations</span>
                <ChevronDown
                  className={`h-4 w-4 ml-2 transition-transform ${
                    isInvestigationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isInvestigationsOpen && (
                <div className="pl-4 border-l border-gray-700 mt-1">
                  <Link
                    href="/investigations/newlyn-plc"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    NEWLYN PLC
                  </Link>
                </div>
              )}
            </div>
            <button
  onClick={handleContactClick}
  className="w-full text-left text-gray-300 hover:text-primary transition-colors py-2"
>
  Contact
</button>
            <Link
              href="/tcctv"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              TCCTV
            </Link>
            <Link
              href="/substantiation-fixed"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Substantiation Fixed
            </Link>
            <Link
              href="/app"
              className="text-gray-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              App
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
