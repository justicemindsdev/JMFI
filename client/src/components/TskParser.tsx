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
    // Check if the code has the special prefix
    if (code.startsWith('//tskddd')) {
      // Extract the tab title from the first line after prefix
      const lines = code.split('\n');
      const titleLine = lines.length > 1 ? lines[1].trim() : 'New Tab';
      const title = titleLine.startsWith('//') ? titleLine.substring(2).trim() : titleLine;
      
      // Generate a unique ID for the tab
      const id = `tab-${Date.now()}`;
      
      // Create the content from the provided code (removing the //tskddd line)
      const contentCode = lines.slice(1).join('\n');
      
      // Create a new tab
      const newTab: TabData = {
        id,
        title,
        content: (
          <div className="code-container">
            <pre>{contentCode}</pre>
          </div>
        )
      };
      
      // Add the new tab
      setTabs(prevTabs => [...prevTabs, newTab]);
      setActiveTab(id);
      
      return true;
    }
    
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
    return null;
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