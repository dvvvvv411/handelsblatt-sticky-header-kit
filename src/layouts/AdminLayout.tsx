import React from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Eye, 
  BarChart3, 
  Users, 
  LogOut,
  Settings,
  ChevronLeft,
  Menu,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-6">You don't have permission to access the admin panel.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/articles', icon: FileText, label: 'Articles', end: false },
    { to: '/admin/visits', icon: Eye, label: 'Visits', end: false },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics', end: false },
    { to: '/admin/users', icon: Users, label: 'Users', end: false },
    { to: '/admin/card-previews', icon: CreditCard, label: 'Card Previews', end: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 z-50 flex items-center justify-between px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-slate-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <span className="text-white font-semibold">Admin Panel</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-slate-800"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 bg-slate-900 transition-all duration-300 flex flex-col",
        sidebarCollapsed ? "w-20" : "w-64",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className={cn(
          "h-16 flex items-center border-b border-slate-800",
          sidebarCollapsed ? "justify-center px-2" : "justify-between px-6"
        )}>
          {!sidebarCollapsed && (
            <span className="text-white font-bold text-lg">Admin Panel</span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-400 hover:text-white hover:bg-slate-800 hidden lg:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium",
                sidebarCollapsed && "justify-center",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className={cn(
          "border-t border-slate-800 p-4",
          sidebarCollapsed && "flex justify-center"
        )}>
          {sidebarCollapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.email}</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 lg:pt-0 pt-16 min-h-screen",
        sidebarCollapsed ? "lg:ml-0" : "lg:ml-0"
      )}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
