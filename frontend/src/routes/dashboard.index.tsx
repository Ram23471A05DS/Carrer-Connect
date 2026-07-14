import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, FileCheck, Bookmark, Bell, TrendingUp, Calendar, Sparkles, ArrowRight, Clock, CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { StatCard, PageHeader } from "@/components/Widgets";
import { JobsAPI, ApplicationsAPI, NotificationsAPI } from "@/services/api";
import type { Job, Application, Notification } from "@/lib/mockData";
import { chartsData } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/")({ component: () => <ProtectedRoute><Dashboard /></ProtectedRoute> });

function Dashboard() {
  const { user } = useAuth();
  const [recommended, setRecommended] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [notes, setNotes] = useState<Notification[]>([]);
  const [latest, setLatest] = useState<Job[]>([]);

  useEffect(() => {
    JobsAPI.recommended().then(setRecommended);
    JobsAPI.list().then((all) => setLatest(all.slice(0, 5)));
    ApplicationsAPI.mine().then(setApps);
    NotificationsAPI.list().then(setNotes);
  }, []);

  const statusColor: Record<string, string> = {
    Applied: "bg-chart-1/15 text-chart-1", Reviewed: "bg-chart-2/15 text-chart-2",
    Interview: "bg-chart-3/15 text-chart-3", Offer: "bg-success/15 text-success",
    Rejected: "bg-destructive/15 text-destructive",
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome banner */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl bg-hero p-6 sm:p-8 text-white shadow-elevated">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "var(--gradient-mesh)" }} />
          <div className="relative grid gap-4 md:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 mb-1">Welcome back</div>
              <h1 className="text-2xl sm:text-3xl font-bold">Hey {user?.name.split(" ")[0]} 👋</h1>
              <p className="mt-2 text-white/90 max-w-lg text-sm">You have <b>3 new matches</b> and <b>2 messages</b> waiting. Let's land you an offer this month.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-white text-primary hover:bg-white/90"><Link to="/jobs">Explore jobs</Link></Button>
              <Button asChild variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20"><Link to="/profile/edit">Edit profile</Link></Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FileCheck} label="Applications" value={apps.length} trend="+3 this week" index={0} />
          <StatCard icon={Bookmark} label="Saved jobs" value={4} trend="+2 this week" index={1} />
          <StatCard icon={Briefcase} label="Interviews" value={2} trend="1 upcoming" index={2} />
          <StatCard icon={TrendingUp} label="Profile views" value={128} trend="+42%" index={3} />
        </div>

        {/* Profile completion */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Complete your profile</div>
              <p className="text-xs text-muted-foreground mt-1">Profiles above 90% get 4x more recruiter views.</p>
            </div>
            <div className="text-2xl font-bold">{user?.profileCompletion}%</div>
          </div>
          <Progress value={user?.profileCompletion ?? 0} className="mt-4" />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild><Link to="/resume">Upload resume</Link></Button>
            <Button size="sm" variant="outline" asChild><Link to="/profile/edit">Add a project</Link></Button>
            <Button size="sm" variant="outline" asChild><Link to="/profile/edit">Add skills</Link></Button>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <ChartCard title="Applications over time" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartsData.monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" fontSize={12} stroke="currentColor" opacity={0.6} />
                <YAxis fontSize={12} stroke="currentColor" opacity={0.6} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="applied" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="interviews" stroke="var(--chart-3)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Status breakdown">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={chartsData.status} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {chartsData.status.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {chartsData.status.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-[11px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Recommended + notifications */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <PageHeader
              title="Recommended for you"
              description="Fresh matches based on your skills and interests."
              actions={<Button variant="ghost" size="sm" asChild><Link to="/jobs">See all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {recommended.slice(0, 4).map((j, i) => (
                <Link key={j.id} to="/jobs/$id" params={{ id: j.id }} className="glass rounded-2xl p-4 hover:shadow-glow transition group" style={{ transitionDelay: `${i * 30}ms` }}>
                  <div className="flex items-center gap-3">
                    <img src={j.logo} alt="" className="h-10 w-10 rounded-lg bg-white ring-1 ring-border p-1" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm truncate group-hover:text-primary">{j.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{j.company} · {j.location}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold">{j.salary}</span>
                    <Badge variant="secondary" className="text-[10px]">{j.type}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-sm">Recent activity</div>
                <Link to="/notifications" className="text-xs text-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {notes.slice(0, 4).map((n) => (
                  <div key={n.id} className="flex items-start gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{n.body}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="font-semibold text-sm mb-3 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />Upcoming interviews</div>
              <div className="space-y-3">
                {[
                  { company: "Airbnb", role: "Frontend Engineer", when: "Tue · 4:00 PM" },
                  { company: "Figma", role: "Product Designer", when: "Thu · 11:30 AM" },
                ].map((i) => (
                  <div key={i.company} className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
                    <div>
                      <div className="text-sm font-medium">{i.role}</div>
                      <div className="text-xs text-muted-foreground">{i.company}</div>
                    </div>
                    <div className="text-xs font-semibold text-primary">{i.when}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Application timeline */}
        <div className="glass rounded-2xl p-6">
          <PageHeader title="Application timeline" description="Track where you are in each hiring process." />
          <div className="space-y-3">
            {apps.slice(0, 5).map((a) => {
              const job = latest.find((j) => j.id === a.jobId) ?? recommended.find((j) => j.id === a.jobId);
              return (
                <div key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center p-4 rounded-xl border bg-card/50">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{job?.title ?? "Position"}</div>
                    <div className="text-xs text-muted-foreground">{job?.company ?? "Company"} · Applied {a.appliedAt}</div>
                    <div className="mt-3 flex items-center gap-1">
                      {a.timeline.map((t, i) => (
                        <div key={i} className="flex items-center gap-1 flex-1 min-w-0">
                          {t.done ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> : <Clock className="h-4 w-4 text-muted-foreground shrink-0" />}
                          <span className="text-[11px] truncate">{t.stage}</span>
                          {i < a.timeline.length - 1 && <div className="flex-1 h-px bg-border" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Badge className={`${statusColor[a.status]} border-0 shrink-0`}>{a.status}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ChartCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="text-sm font-semibold mb-4">{title}</div>
      {children}
    </div>
  );
}
