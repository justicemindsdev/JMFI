import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function TskParser() {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // This function will parse code and create new tabs
  function parseAndCreateTab(code: string) {
    console.log("TskParser: Received code to parse", code.substring(0, 50) + "...");
    
    // Check if the code has the special prefix
    if (code.startsWith('//tskddd')) {
      console.log("TskParser: Code has the //tskddd prefix");
      
      // Extract the tab title from the first line after prefix
      const lines = code.split('\n');
      const titleLine = lines.length > 1 ? lines[1].trim() : 'New Tab';
      
      // Try to extract the component name for the title
      let title = 'TSK Component';
      if (titleLine.includes('function')) {
        const match = titleLine.match(/function\s+(\w+)/);
        if (match && match[1]) {
          title = match[1];
        }
      } else if (titleLine.includes('class')) {
        const match = titleLine.match(/class\s+(\w+)/);
        if (match && match[1]) {
          title = match[1];
        }
      } else if (titleLine.startsWith('import')) {
        title = 'Import Component';
      }
      
      console.log("TskParser: Creating tab with title:", title);
      
      // Generate a unique ID for the tab
      const id = `tab-${Date.now()}`;
      
      // Create the content from the provided code (removing the //tskddd line)
      const contentCode = lines.slice(1).join('\n');
      
      // Create a new tab with syntax highlighted code
      const newTab: TabData = {
        id,
        title,
        content: (
          <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-auto">
            <pre className="text-gray-100 whitespace-pre-wrap">
              <code>{contentCode}</code>
            </pre>
            
            <div className="mt-4 p-4 border-t border-gray-800">
              <p className="text-yellow-400 text-sm">
                Component code added to tabs successfully. This is a preview of the code.
              </p>
            </div>
          </div>
        )
      };
      
      // Add the new tab
      setTabs(prevTabs => [...prevTabs, newTab]);
      setActiveTab(id);
      
      console.log("TskParser: Tab created successfully");
      return true;
    }
    
    console.log("TskParser: Code does not have the //tskddd prefix");
    return false;
  }

  // Expose the parsing function globally for easy access
  useEffect(() => {
    // @ts-ignore
    window.createTskTab = parseAndCreateTab;
    
    return () => {
      // @ts-ignore
      delete window.createTskTab;
    };
  }, []);

  if (tabs.length === 0) {
    return (
      <div className="container mx-auto px-4 my-8">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">TSK Parser Ready</h3>
          <p className="text-gray-400 text-sm">
            This area will display any code prefixed with //tskddd in tabs. Try clicking the demo button to test it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tsk-parser-container my-8">
      <Tabs value={activeTab || tabs[0].id} onValueChange={setActiveTab}>
        <TabsList className="flex overflow-x-auto">
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}