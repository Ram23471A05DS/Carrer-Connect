import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { type ReactNode } from "react";

export function AuthLayout({
  title, subtitle, children, footer,
}: {
  title: string; subtitle: string; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left visual */}
      <div className="hidden lg:flex relative bg-hero p-12 flex-col justify-between text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "var(--gradient-mesh)" }} />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">CareerConnect</span>
        </Link>
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold leading-tight max-w-sm"
          >
            The premium platform where careers actually happen.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 text-white/85 max-w-sm"
          >
            Join 180k+ students, engineers, and designers landing roles at Google, Stripe, Figma, and Netflix.
          </motion.p>
          <div className="mt-8 flex -space-x-2">
            {[15, 32, 47, 68, 12].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/60?img=${i}`} alt=""
                className="h-10 w-10 rounded-full ring-2 ring-white/60 object-cover" />
            ))}
            <div className="ml-3 self-center text-xs">Joined this week</div>
          </div>
        </div>
        <div className="relative text-xs text-white/70">© {new Date().getFullYear()} CareerConnect</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-mesh">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero shadow-glow">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">Career<span className="gradient-text">Connect</span></span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-center text-muted-foreground">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}
