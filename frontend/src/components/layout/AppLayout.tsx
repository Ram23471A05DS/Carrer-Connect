import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Briefcase, Building2, Bookmark, FileText, Bell, MessageSquare,
  Settings, User, Search, LogOut, Menu, Moon, Sun, ChevronLeft, Home, FileCheck,
  ShieldCheck, Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const studentNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/applied", label: "Applied", icon: FileCheck },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

const recruiterNav = [
  { to: "/dashboard/recruiter", label: "Overview", icon: LayoutDashboard },
  { to: "/jobs", label: "All Jobs", icon: Briefcase },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

const adminNav = [
  { to: "/dashboard/admin", label: "Admin", icon: ShieldCheck },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

const bottomNav = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/messages", label: "Chat", icon: MessageSquare },
  { to: "/profile", label: "Me", icon: User },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = user?.role === "admin" ? adminNav : user?.role === "recruiter" ? recruiterNav : studentNav;

  const SidebarInner = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero shadow-glow shrink-0">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <span className="text-base font-bold">Career<span className="gradient-text">Connect</span></span>}
        </Link>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:grid h-8 w-8 place-items-center rounded-lg hover:bg-sidebar-accent transition"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.label === "Notifications" && (
                <Badge className="ml-auto h-5 min-w-5 px-1.5 text-[10px] bg-destructive text-destructive-foreground">3</Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && user && (
        <div className="border-t border-sidebar-border p-3">
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{user.name}</div>
              <div className="text-[11px] text-muted-foreground truncate capitalize">{user.role}</div>
            </div>
            <button
              onClick={() => { logout(); navigate({ to: "/" }); }}
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-sidebar-accent shrink-0"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex w-full bg-mesh">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block sticky top-0 h-screen shrink-0 border-r border-sidebar-border bg-sidebar transition-all duration-300 ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        <SidebarInner />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed z-50 h-screen w-64 border-r border-sidebar-border bg-sidebar lg:hidden"
            >
              <SidebarInner />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex min-w-0 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border/60">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search jobs, companies, skills…"
                className="pl-9 h-10 bg-background/60"
              />
            </div>
            <button
              onClick={toggle}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/notifications" className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Link>
            {user && (
              <Link to="/profile" className="hidden sm:block">
                <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </header>

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pb-24 lg:pb-8"
        >
          {children}
        </motion.main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-strong border-t border-border/60">
        <div className="grid grid-cols-4">
          {bottomNav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!user) {
    // Redirect after mount to avoid SSR side effects.
    if (typeof window !== "undefined") {
      setTimeout(() => navigate({ to: "/login" }), 0);
    }
    return null;
  }
  return <>{children}</>;
}

export { Users }; // re-export used icon in admin dashboard
