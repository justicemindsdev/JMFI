import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from './components/ui/toaster';
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import NewlynPlc from "./pages/NewlynPlc";
import SocialWorkerEngagement from "./pages/SocialWorkerEngagement";
// import { TskParser } from "./components/TskParser";
import useTskParser from "./hooks/use-tsk-parser";
import { useEffect } from 'react';
import Press from "./pages/Press";
import Portfolio from "./pages/Portfolio";
import Tcctv from "./pages/Tcctc";
import Substantiation from "./pages/Substantiation";
import AppPage from "./pages/AppPage";
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/press" component={Press} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/tcctv" component={Tcctv} />
      <Route path="/app" component={AppPage} />
      <Route path="/substantiation-fixed" component={Substantiation} />
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
    console.log("App: processTskCode called with code", code.substring(0, 30) + "...");
    
    // @ts-ignore - This function is defined in TskParser and exposed globally
    if (window.createTskTab && typeof window.createTskTab === 'function') {
      console.log("App: Calling window.createTskTab");
      window.createTskTab(code);
    } else {
      console.error("App: window.createTskTab is not available");
    }
  };
  
  // Make the function globally available
  useEffect(() => {
    console.log("App: Setting up global processTskCode function");
    // @ts-ignore
    window.processTskCode = processTskCode;
    
    return () => {
      console.log("App: Cleaning up global processTskCode function");
      // @ts-ignore
      delete window.processTskCode;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {/* <TskParser /> */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
