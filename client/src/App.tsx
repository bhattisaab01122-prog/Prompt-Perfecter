import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useCanonical } from "@/hooks/useCanonical";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ContactUs from "@/pages/ContactUs";
import HallucinationsArticle from "@/pages/HallucinationsArticle";
import MidjourneyArticle from "@/pages/MidjourneyArticle";
import ChatGPTProductivityArticle from "@/pages/ChatGPTProductivityArticle";
import TermsOfService from "@/pages/TermsOfService";

function Router() {
  useCanonical();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/articles/hallucinations" component={HallucinationsArticle} />
      <Route path="/articles/midjourney" component={MidjourneyArticle} />
      <Route path="/articles/chatgpt-prompts-productivity" component={ChatGPTProductivityArticle} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
