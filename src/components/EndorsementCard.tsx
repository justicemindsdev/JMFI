import { ReactNode, useState } from 'react';

interface EndorsementCardProps {
  title: string;
  logo?: string;
  logoColor?: string;
  stat?: string;
  statDescription?: string;
  authorName?: string;
  authorTitle?: string;
  content: string;
  detailsTitle?: string;
  details?: string;
  children?: ReactNode;
}

export function EndorsementCard({
  title,
  logo,
  logoColor = "#8bfe86", // Default is green
  stat,
  statDescription,
  authorName,
  authorTitle,
  content,
  detailsTitle,
  details,
  children
}: EndorsementCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Toggle expanded state
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div 
      className={`bg-gray-950 rounded-xl shadow-xl overflow-hidden flex flex-col border border-gray-800 transition-all duration-300 cursor-pointer ${expanded ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
      onClick={toggleExpand}
    >
      {/* Dark glass card with subtle glow */}
      <div className="bg-gray-950/90 backdrop-blur-sm p-6 relative overflow-hidden">
        {/* Subtle glow in the background */}
        <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-20`} style={{ backgroundColor: logoColor }}></div>
        
        {/* Title and organization */}
        <div className="relative z-10">
          {logo && (
            <div className="mb-3 text-2xl font-bold" style={{ color: logoColor }}>
              {logo}
            </div>
          )}
          
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-gray-300 mb-2">
            {title}
          </h3>
          
          {/* Organization type */}
          {authorName && (
            <div className="text-xs uppercase tracking-wider opacity-70 text-gray-500 mb-4">
              {authorName}
            </div>
          )}
          
          {/* Optional stat highlight */}
          {stat && (
            <div className="mt-4">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: logoColor }}>{stat}</div>
              {statDescription && (
                <div className="text-sm text-gray-400 mt-1">{statDescription}</div>
              )}
            </div>
          )}
          
          {/* Primary content always visible */}
          <div className="mt-4">
            <p className="text-gray-400 text-sm">
              {content}
            </p>
          </div>
          
          {/* Details that expand on click */}
          {details && (
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              {detailsTitle && (
                <h4 className="text-md font-semibold text-gray-300 mb-2 mt-4">
                  {detailsTitle}
                </h4>
              )}
              <p className="text-gray-400 text-sm">
                {details}
              </p>
              
              {/* Optional additional content */}
              {children}
            </div>
          )}
          
          {/* Indicator showing expandable */}
          {details && (
            <div className="mt-4 text-xs text-gray-500 flex items-center">
              <span className={`mr-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>▼</span> 
              {expanded ? "Click to collapse" : "Click for details"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}