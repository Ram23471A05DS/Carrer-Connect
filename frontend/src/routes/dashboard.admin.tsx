import { createFileRoute } from "@tanstack/react-router";
import { Users, Briefcase, Building2, FileCheck, ShieldCheck, Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { StatCard, PageHeader } from "@/components/Widgets";
import { chartsData } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard/admin")({ component: () => <ProtectedRoute><AdminDashboard /></ProtectedRoute> });

function AdminDashboard() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        <PageHeader eyebrow="Admin" title="Platform overview" description="Users, jobs, applications, and system health at a glance." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Total users" value={"48.2k"} trend="+1.2k" index={0} />
          <StatCard icon={Briefcase} label="Active jobs" value={"3.1k"} trend="+120" index={1} />
          <StatCard icon={Building2} label="Companies" value={412} trend="+18" index={2} />
          <StatCard icon={FileCheck} label="Applications" value={"128k"} trend="+8.4%" index={3} gradient />
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-4">Growth (last 7 days)</div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartsData.admin}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" fontSize={12} stroke="currentColor" opacity={0.6} />
              <YAxis fontSize={12} stroke="currentColor" opacity={0.6} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="users" stroke="var(--chart-1)" strokeWidth={3} fill="url(#g1)" />
              <Area type="monotone" dataKey="jobs" stroke="var(--chart-3)" strokeWidth={3} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <div className="font-semibold text-sm mb-4 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />System health</div>
            <ul className="space-y-3 text-sm">
              {[
                { label: "API uptime", value: "99.98%", color: "text-success" },
                { label: "Avg response", value: "142ms", color: "text-success" },
                { label: "Error rate", value: "0.04%", color: "text-success" },
                { label: "DB replication", value: "Healthy", color: "text-success" },
              ].map((s) => (
                <li key={s.label} className="flex justify-between"><span className="text-muted-foreground">{s.label}</span><span className={`font-semibold ${s.color}`}>{s.value}</span></li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="font-semibold text-sm mb-4 flex items-center gap-2"><Activity className="h-4 w-4 text-primary" />Recent activity</div>
            <ul className="space-y-3 text-sm">
              {[
                "New company registered: Stripe",
                "82 new users signed up in the last hour",
                "Suspicious login blocked from IP 203.0.113.42",
                "Job post flagged for review: 'Data Entry' at ABC Corp",
                "Weekly backup completed successfully",
              ].map((a) => (
                <li key={a} className="flex items-start gap-2 text-muted-foreground"><span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
