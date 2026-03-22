import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Navbar } from "@/components/Navbar";

/**
 * Configure TanStack Query client with optimized defaults
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Navbar />
          <AnimatedRoutes>
            <Route path="/" data-genie-title="首页" data-genie-key="Home" element={<PageTransition transition="slide-up"><Index /></PageTransition>} />
            <Route path="/article/:id" data-genie-title="文章详情" data-genie-key="ArticleDetail" element={<PageTransition transition="slide-up"><ArticleDetail /></PageTransition>} />
            <Route path="/about" data-genie-title="关于" data-genie-key="About" element={<PageTransition transition="slide-up"><About /></PageTransition>} />
            <Route path="*" data-genie-key="NotFound" data-genie-title="页面未找到" element={<PageTransition transition="fade"><NotFound /></PageTransition>} />
          </AnimatedRoutes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App
