import { Link } from "@tanstack/react-router";
import { Briefcase, Github, Linkedin, Twitter } from "lucide-react";

const cols = [
  {
    title: "Product", links: [
      { label: "Jobs", to: "/jobs" }, { label: "Companies", to: "/companies" },
      { label: "Dashboard", to: "/dashboard" }, { label: "Messages", to: "/messages" },
    ],
  },
  {
    title: "Company", links: [
      { label: "About", to: "/about" }, { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Legal", links: [
      { label: "Privacy", to: "/privacy" }, { label: "Terms", to: "/terms" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2 space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero shadow-glow">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">Career<span className="gradient-text">Connect</span></span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            The premium job platform for students, engineers, and designers to land the roles they actually want.
          </p>
          <div className="flex gap-2 pt-2">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold mb-3">{c.title}</div>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CareerConnect. All rights reserved.
      </div>
    </footer>
  );
}
