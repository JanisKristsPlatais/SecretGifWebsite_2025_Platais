import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Simple router for handling both local and GitHub Pages routing
function AppRouter() {
  // For GitHub Pages, base path needs to be considered
  const isGitHubPages = window.location.hostname.includes('github.io');
  const basePath = isGitHubPages ? '/SecretGifWebsite_2025_Platais' : '';
  
  return (
    <Switch>
      <Route path={`${basePath}/`} component={Home} />
      <Route path={`${basePath}/*`} component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
 

