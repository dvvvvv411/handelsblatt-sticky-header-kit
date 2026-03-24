import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import DynamicArticle from "./pages/DynamicArticle";

const Home = lazy(() => import("./pages/Home"));
const RechnerHandelsblatt2 = lazy(() => import("./pages/RechnerHandelsblatt2"));
const Article = lazy(() => import("./pages/Article"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Redirect = lazy(() => import("./pages/Redirect"));

// Admin Pages - direct imports for instant navigation
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArticlesPage from "./pages/admin/ArticlesPage";
import CreateArticlePage from "./pages/admin/CreateArticlePage";
import EditArticlePage from "./pages/admin/EditArticlePage";
import StatisticsPage from "./pages/admin/StatisticsPage";
import ArticleStatisticsPage from "./pages/admin/ArticleStatisticsPage";
import UsersPage from "./pages/admin/UsersPage";
import CardPreviewsPage from "./pages/admin/CardPreviewsPage";
import CreateCardPage from "./pages/admin/CreateCardPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/article" element={<Article />} />
                <Route path="/artikel/:slug" element={<DynamicArticle />} />
                <Route path="/rechner/handelsblatt2" element={<RechnerHandelsblatt2 />} />
                
                {/* Admin Routes with Sidebar Layout */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<ArticlesPage />} />
                  <Route path="articles/new" element={<CreateArticlePage />} />
                  <Route path="articles/edit/:id" element={<EditArticlePage />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="statistics/:articleId" element={<ArticleStatisticsPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="card-previews" element={<CardPreviewsPage />} />
                  <Route path="card-previews/create" element={<CreateCardPage />} />
                </Route>
                
                <Route path="/auth" element={<Auth />} />
                <Route path="/r/:shortCode" element={<Redirect />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
