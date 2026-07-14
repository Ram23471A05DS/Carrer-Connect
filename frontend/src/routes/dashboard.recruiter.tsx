import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Users, Eye, TrendingUp } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { StatCard, PageHeader } from "@/components/Widgets";
import { chartsData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/recruiter")({ component: () => <ProtectedRoute><RecruiterDashboard /></ProtectedRoute> });

function RecruiterDashboard() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        <PageHeader
          eyebrow="Recruiter"
          title="Hiring overview"
          description="Track roles, applicants, and pipeline health across your company."
          actions={<Button className="bg-hero border-0 text-white shadow-glow hover:opacity-90">+ Post a job</Button>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Briefcase} label="Active jobs" value={12} trend="+3" index={0} />
          <StatCard icon={Users} label="Applicants" value={480} trend="+62" index={1} />
          <StatCard icon={Eye} label="Page views" value={"5.2k"} trend="+18%" index={2} />
          <StatCard icon={TrendingUp} label="Hires this Q" value={7} trend="On target" index={3} gradient />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-4">Weekly pipeline</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartsData.recruiter}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" fontSize={12} stroke="currentColor" opacity={0.6} />
                <YAxis fontSize={12} stroke="currentColor" opacity={0.6} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="views" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="applies" fill="var(--chart-3)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-4">Pending applications</div>
            <div className="space-y-3">
              {[
                { name: "Priya Kumar", role: "Senior Frontend", stage: "Screening" },
                { name: "Marcus Lee", role: "Product Designer", stage: "Interview" },
                { name: "Ava Chen", role: "Backend Engineer", stage: "Offer" },
                { name: "Jonas Weber", role: "PM", stage: "Screening" },
              ].map((a) => (
                <div key={a.name} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.role}</div>
                  </div>
                  <span className="text-xs font-semibold text-primary">{a.stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="font-semibold text-sm mb-4">Recent activity</div>
            <ul className="space-y-3 text-sm">
              {["Priya Kumar applied to Senior Frontend Engineer","Marcus Lee accepted your interview invite","Ava Chen viewed the offer letter","3 new applicants for Backend Engineer"].map((a) => (
                <li key={a} className="flex items-start gap-2 text-muted-foreground"><span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />{a}</li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="font-semibold text-sm mb-4">Quick actions</div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="outline">Post new job</Button>
              <Button variant="outline">Invite teammate</Button>
              <Button variant="outline">Export applicants</Button>
              <Button variant="outline">Update company</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
