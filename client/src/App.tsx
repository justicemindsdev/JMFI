import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import NewlynPlc from "@/pages/NewlynPlc";
import SocialWorkerEngagement from "@/pages/SocialWorkerEngagement";
import { TskParser } from "@/components/TskParser";
import useTskParser from "@/hooks/use-tsk-parser";
import { useEffect } from 'react';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/investigations/newlyn-plc" component={NewlynPlc} />
      <Route path="/investigations/social-worker-engagement" component={SocialWorkerEngagement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize the TSK parser to detect and process //tskddd code blocks
  useTskParser();
  
  // Function to directly create tabs from code with //tskddd prefix
  const processTskCode = (code: string) => {
    // @ts-ignore - This function is defined in TskParser and exposed globally
    if (window.createTskTab && typeof window.createTskTab === 'function') {
      window.createTskTab(code);
    }
  };
  
  // Make the function globally available
  useEffect(() => {
    // @ts-ignore
    window.processTskCode = processTskCode;
    return () => {
      // @ts-ignore
      delete window.processTskCode;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <TskParser />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
