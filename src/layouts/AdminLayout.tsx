import React from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
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
  const { user, isAdmin, isKunde, hasAccess, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-600">Laden...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20">
        <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 border border-red-100 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Zugriff verweigert</h1>
          <p className="text-slate-500 mb-6">Du hast keine Berechtigung auf das Admin-Panel zuzugreifen.</p>
          <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0">
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true, color: 'text-blue-400' },
    { to: '/admin/articles', icon: FileText, label: 'Artikel', end: false, color: 'text-violet-400' },
    { to: '/admin/statistics', icon: BarChart3, label: 'Statistiken', end: false, color: 'text-emerald-400' },
    ...(isAdmin ? [{ to: '/admin/users', icon: Users, label: 'Benutzer', end: false, color: 'text-rose-400' }] : []),
    { to: '/admin/card-previews', icon: CreditCard, label: 'CTA-Cards', end: false, color: 'text-cyan-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20 flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 z-50 flex items-center justify-between px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <span className="text-white font-semibold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Admin Panel</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-red-500/20 hover:text-red-300"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 lg:h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 transition-all duration-300 flex flex-col",
        sidebarCollapsed ? "w-20" : "w-64",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className={cn(
          "h-16 flex items-center border-b border-white/5",
          sidebarCollapsed ? "justify-center px-2" : "justify-between px-6"
        )}>
          {!sidebarCollapsed && (
            <span className="font-bold text-lg bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
              Admin Panel
            </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-400 hover:text-white hover:bg-white/10 hidden lg:flex"
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
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium relative",
                sidebarCollapsed && "justify-center",
                isActive 
                  ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/10 text-white border-l-2 border-indigo-400 ml-0" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0")} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className={cn(
          "border-t border-white/5 p-4",
          sidebarCollapsed && "flex justify-center"
        )}>
          {sidebarCollapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center ring-2 ring-indigo-400/20">
                  <span className="text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.email}</p>
                  <p className="text-xs text-indigo-300/60">{isAdmin ? 'Administrator' : 'Kunde'}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-400 hover:text-red-300 hover:bg-red-500/10 gap-2 rounded-xl"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Abmelden
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 lg:pt-0 pt-16 min-h-screen transition-all duration-300",
        sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;