import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Header } from "../components/Header";
import CSVViewer from "../components/CSVViewer";
import HTMLViewer from "../components/HTMLViewer";

const Tcctv = () => {
  const [fileList, setFileList] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [fileType, setFileType] = useState<"csv" | "html" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const BUCKET_NAME = "tcctv";
  const redirect_url = "https://www.justice-minds.com/tcctv";

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError.message);
      }

      if (!user) {
        await supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: redirect_url,
          },
        });
        return;
      }

      setUser(user);

      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list("", { limit: 100 });

      if (error) {
        console.error("Storage list error:", error.message);
      } else {
        const files = data
          .filter((file) =>
            file.name.toLowerCase().match(/\.(csv|html?)$/)
          )
          .map((file) => file.name);
        setFileList(files);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const fetchFileData = async (file: string) => {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(file);

    if (error) {
      console.error("Error downloading file:", error.message);
      return;
    }

    const text = await data.text();
    setFileContent(text);
    setSelectedFile(file);

    if (file.toLowerCase().endsWith(".csv")) {
      setFileType("csv");
    } else if (file.toLowerCase().match(/\.html?$/)) {
      setFileType("html");
    } else {
      setFileType(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 p-4 overflow-y-auto border-r border-gray-200 bg-gray-800 text-white">
          <ul>
            {fileList.map((file) => {
              const displayName = file.replace(/\.(csv|html)$/i, '');
              return(
              <li
                key={file}
                className={`cursor-pointer p-2 rounded hover:bg-gray-700 break-words whitespace-normal ${
                  selectedFile === file ? "bg-blue-600" : ""
                }`}
                onClick={() => fetchFileData(file)}
              >
                {displayName}
              </li>
            )})}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          {fileType === "csv" && <CSVViewer fileContent={fileContent} fileName={selectedFile} />}
          {fileType === "html" && <HTMLViewer fileContent={fileContent} />}
          {!fileType && selectedFile && (
            <div className="p-4 text-red-500">Unsupported file type.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tcctv;
