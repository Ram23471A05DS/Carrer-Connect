import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function PublicNavbar() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="glass-strong border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero shadow-glow">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Career<span className="gradient-text">Connect</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user ? (
              <Button asChild size="sm" variant="default">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="bg-hero border-0 text-white shadow-glow hover:opacity-90">
                  <Link to="/register">Get started</Link>
                </Button>
              </>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/60 px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
}
