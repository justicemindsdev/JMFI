import React from 'react';

type HTMLViewerProps = {
  fileContent: string;
};

const HTMLViewer: React.FC<HTMLViewerProps> = ({ fileContent }) => {
  const isEmpty = !fileContent || fileContent.trim() === '';

  return (
    <div className="min-h-screen bg-white dark:bg-dark p-4 text-sm sm:text-base">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary">HTML Preview</h1>
        <p className="text-gray-600 dark:text-gray-400">Rendering passed HTML content</p>
      </header>

      {isEmpty ? (
        <p className="text-center text-gray-500">No HTML content provided.</p>
      ) : (
        <div
          className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 shadow-md"
          dangerouslySetInnerHTML={{ __html: fileContent }}
        />
      )}
    </div>
  );
};

export default HTMLViewer;
