import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Header } from "../components/Header";
import EmailAnalytics from "../components/EmailAnalytics";

const Tcctv = () => {
  const [csvFiles, setCsvFiles] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const BUCKET_NAME = "user-uploads";
  const redirect_url = import.meta.env.VITE_TCCTV_REDIRECT_URL;
 useEffect(() => {
  const init = async () => {
    // Handle the URL hash if present (OAuth callback)
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
    }

    if (!session || !session.user) {
      console.warn("No active session, redirecting to GitHub login...");
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: redirect_url  , // or your actual route
        },
      });
      return;
    }

    setUser(session.user);

    // Clean up the URL hash after login
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    // Fetch file list
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list("", { limit: 100 });

    if (error) {
      console.error("Storage list error:", error.message);
    } else {
      const files = data
        .filter((file) => file.name.toLowerCase().endsWith(".csv"))
        .map((file) => file.name);
      setCsvFiles(files);
    }

    setIsLoading(false);
  };

  init();
}, []);

  const fetchCsvData = async (file: string) => {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(file);

    if (error) {
      console.error("Error downloading file:", error.message);
      return;
    }

    const text = await data.text();
    setCsvData(text);
    setSelectedFile(file);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 p-4 overflow-y-auto border-r border-gray-200 bg-gray-800 text-white">
          <ul>
            {csvFiles.map((file) => (
              <li
                key={file}
                className={`cursor-pointer p-2 rounded hover:bg-gray-700 break-words whitespace-normal ${
                  selectedFile === file ? "bg-blue-600" : ""
                }`}
                onClick={() => fetchCsvData(file)}
              >
                {file}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <EmailAnalytics fileContent={csvData} />
        </div>
      </div>
    </div>
  );
};

export default Tcctv;
