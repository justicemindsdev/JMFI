import React, { useEffect, useRef, useState } from 'react';

const EmailAnalyticsDashboard: React.FC = () => {
  const [emailData, setEmailData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const text = await file.text();
    // Here, you would parse the CSV and process data.
    console.log(text);
  };

  useEffect(() => {
    // Initialization logic if needed
  }, []);

  return (
    <div className="bg-light dark:bg-dark text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Email Surveillance Analytics</h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Powered by Justice Minds Forensic Intelligence™
              </p>
            </div>
            <div className="hidden md:block">
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold animate-pulse">
                JUSTICE MINDS
              </span>
            </div>
          </div>
        </header>

        <section className="mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload Email Tracking Data</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Upload your CSV file to analyze surveillance patterns. Your data is processed locally and never leaves your device.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Tracking CSV
              </label>
              <input
                ref={fileInputRef}
                id="fileUpload"
                type="file"
                accept=".csv"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={handleFileUpload}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
              >
                Analyze Data
              </button>
            </div>
          </div>
          {fileName && (
            <div className="mt-4">
              <p className="text-sm text-green-600 dark:text-green-400">Loaded file: {fileName}</p>
            </div>
          )}
        </section>

        {/* Additional dashboard UI will go here */}

        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Email Surveillance Analytics | Justice Minds Forensic Intelligence</p>
          <p className="mt-1">Your data is processed locally and never leaves your device.</p>
        </footer>
      </div>
    </div>
  );
};

export default EmailAnalyticsDashboard;
