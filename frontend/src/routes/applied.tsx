import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileCheck, CheckCircle2, Clock } from "lucide-react";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { PageHeader, EmptyState } from "@/components/Widgets";
import { ApplicationsAPI, JobsAPI } from "@/services/api";
import type { Application, Job } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/applied")({ component: () => <ProtectedRoute><Applied /></ProtectedRoute> });

const color: Record<Application["status"], string> = {
  Applied: "bg-chart-1/15 text-chart-1", Reviewed: "bg-chart-2/15 text-chart-2",
  Interview: "bg-chart-3/15 text-chart-3", Offer: "bg-success/15 text-success",
  Rejected: "bg-destructive/15 text-destructive",
};

function Applied() {
  const [apps, setApps] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<"All" | Application["status"]>("All");
  useEffect(() => { ApplicationsAPI.mine().then(setApps); JobsAPI.list().then(setJobs); }, []);
  const list = filter === "All" ? apps : apps.filter((a) => a.status === filter);
  const statuses: Array<"All" | Application["status"]> = ["All", "Applied", "Reviewed", "Interview", "Offer", "Rejected"];

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <PageHeader eyebrow="Applications" title="Your applications" description={`${apps.length} roles you've applied to.`} />
        <div className="flex flex-wrap gap-2 mb-6">
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === s ? "bg-primary text-primary-foreground" : "glass hover:bg-accent"}`}>
              {s}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <EmptyState icon={FileCheck} title="No applications yet" description="Start applying to see your progress here." />
        ) : (
          <div className="space-y-3">
            {list.map((a) => {
              const j = jobs.find((x) => x.id === a.jobId);
              return (
                <div key={a.id} className="glass rounded-2xl p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-start">
                    <div className="min-w-0 flex items-center gap-3">
                      <img src={j?.logo} alt="" className="h-10 w-10 rounded-lg bg-white ring-1 ring-border p-1 shrink-0" />
                      <div className="min-w-0">
                        <Link to="/jobs/$id" params={{ id: a.jobId }} className="font-semibold text-sm hover:text-primary truncate block">{j?.title}</Link>
                        <div className="text-xs text-muted-foreground truncate">{j?.company} · Applied {a.appliedAt}</div>
                      </div>
                    </div>
                    <Badge className={`${color[a.status]} border-0 shrink-0`}>{a.status}</Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {a.timeline.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 shrink-0">
                        <div className={`grid h-8 w-8 place-items-center rounded-full ${t.done ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                          {t.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">{t.stage}</div>
                          <div className="text-muted-foreground">{t.date}</div>
                        </div>
                        {i < a.timeline.length - 1 && <div className="w-8 h-px bg-border" />}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
