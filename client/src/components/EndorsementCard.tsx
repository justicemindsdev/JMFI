import { ReactNode } from 'react';

interface EndorsementCardProps {
  title: string;
  stat?: string;
  statDescription?: string;
  authorName?: string;
  authorTitle?: string;
  content: string;
  children?: ReactNode;
}

export function EndorsementCard({
  title,
  stat,
  statDescription,
  authorName,
  authorTitle,
  content,
  children
}: EndorsementCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
      {/* Title section with gradient background */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6">
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">
          {title}
        </h3>
        
        {/* Optional stat highlight */}
        {stat && (
          <div className="mt-4">
            <div className="text-3xl md:text-4xl font-bold text-white">{stat}</div>
            {statDescription && (
              <div className="text-sm text-blue-200 mt-1">{statDescription}</div>
            )}
          </div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-6 flex-grow">
        <p className="text-gray-800 dark:text-gray-300 mb-4">
          {content}
        </p>
        
        {/* Optional author attribution */}
        {authorName && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="font-semibold text-gray-900 dark:text-white">
              {authorName}
            </div>
            {authorTitle && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {authorTitle}
              </div>
            )}
          </div>
        )}
        
        {/* Any additional content */}
        {children}
      </div>
    </div>
  );
}