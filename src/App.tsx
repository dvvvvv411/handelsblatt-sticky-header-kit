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

// Admin Pages
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ArticlesPage = lazy(() => import("./pages/admin/ArticlesPage"));
const CreateArticlePage = lazy(() => import("./pages/admin/CreateArticlePage"));
const EditArticlePage = lazy(() => import("./pages/admin/EditArticlePage"));
const VisitsPage = lazy(() => import("./pages/admin/VisitsPage"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage"));
const UsersPage = lazy(() => import("./pages/admin/UsersPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
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
                  <Route path="visits" element={<VisitsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="users" element={<UsersPage />} />
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
