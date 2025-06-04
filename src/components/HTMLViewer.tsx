import React, { useRef, useEffect } from "react";

type HTMLViewerProps = {
  fileContent: string;
};

const HTMLViewer: React.FC<HTMLViewerProps> = ({ fileContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(fileContent);
        doc.close();
      }
    }
  }, [fileContent]);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        title="HTML Preview"
        className="w-full h-full border-none"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default HTMLViewer;
