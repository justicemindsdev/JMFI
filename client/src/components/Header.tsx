import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvestigationsOpen, setIsInvestigationsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const investigationsRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleInvestigations = () => setIsInvestigationsOpen(!isInvestigationsOpen);

  // Close investigations dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (investigationsRef.current && !investigationsRef.current.contains(event.target as Node)) {
        setIsInvestigationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="border-b border-gray-800 sticky top-0 bg-gray-950 z-10 shadow-md">
        <div className="container mx-auto px-4 py-2 flex items-center relative">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-12 w-12 relative hidden md:block">
              <img
                src="/attached_assets/LOGO_TRANS_1744373361051.png"
                alt="Justice Minds Logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="text-white font-bold text-xl">
              <span className="text-blue-400">Justice</span>Minds
            </div>
          </Link>

          {/* Right-side navigation and buttons */}
          <div className="ml-auto flex items-center space-x-2">
            <nav
              className={`${
                isMenuOpen
                  ? "flex flex-col absolute top-16 right-4 bg-gray-900 shadow-md p-4 rounded z-20 border border-gray-800"
                  : "hidden"
              } md:flex md:static md:flex-row md:space-x-6 md:bg-transparent`}
            >
              <Link
                href="/about"
                className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0"
              >
                About
              </Link>
              <Link
                href="/press"
                className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0"
              >
                Press
              </Link>

              {/* Investigations Dropdown */}
              <div ref={investigationsRef} className="relative py-2 md:py-0">
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
                    <Link
                      href="/investigations/social-worker-engagement"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary"
                    >
                      Social Worker Engagement
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="text-gray-300 hover:text-primary transition-colors py-2 md:py-0"
              >
                Contact
              </Link>
            </nav>

            {/* Hamburger for mobile */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden text-white border-gray-700"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Sidebar toggle for desktop */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="hidden md:inline-flex text-white border-gray-700"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-800 z-50 shadow-lg">
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 py-6 overflow-y-auto">
            <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#sample" className="hover:text-white">Sample1</a></li>
              <li><a href="#templates" className="hover:text-white">Sample2</a></li>
              <li><a href="#metrics" className="hover:text-white">Sample3</a></li>
              <li><a href="#studies" className="hover:text-white">Sample4</a></li>
              <li><a href="#faq" className="hover:text-white">Sample5</a></li>
              <li><a href="#guidelines" className="hover:text-white">Sample6</a></li>
              <li><a href="#templates" className="hover:text-white">Sample7</a></li>
              <li><a href="#metrics" className="hover:text-white">Sample8</a></li>
              <li><a href="#studies" className="hover:text-white">Sample9</a></li>
              <li><a href="#faq" className="hover:text-white">Sample10</a></li>
              <li><a href="/home" className="hover:text-white">Sample11</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
