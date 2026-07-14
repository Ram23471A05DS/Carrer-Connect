import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon, label, value, trend, gradient = false, index = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  gradient?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl p-5 shadow-soft ${gradient ? "bg-hero text-white" : "glass"}`}
    >
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${gradient ? "bg-white/20" : "bg-accent"}`}>
          <Icon className={`h-5 w-5 ${gradient ? "text-white" : "text-primary"}`} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${gradient ? "text-white/90" : "text-success"}`}>{trend}</span>
        )}
      </div>
      <div className="mt-4 text-2xl font-bold">{value}</div>
      <div className={`text-xs ${gradient ? "text-white/80" : "text-muted-foreground"}`}>{label}</div>
    </motion.div>
  );
}

export function EmptyState({ title, description, icon: Icon }: {
  title: string; description: string; icon: LucideIcon;
}) {
  return (
    <div className="glass rounded-2xl p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
    </div>
  );
}

export function PageHeader({
  eyebrow, title, description, actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-6">
      <div className="min-w-0">
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{eyebrow}</div>}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
