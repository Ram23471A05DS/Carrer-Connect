import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Users, Briefcase, Bookmark, BookmarkCheck, Share2, CheckCircle2,
  Building2, ArrowLeft, DollarSign, TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { JobsAPI } from "@/services/api";
import type { Job } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/JobCard";

export const Route = createFileRoute("/jobs/$id")({ component: JobDetail });

function JobDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [related, setRelated] = useState<Job[]>([]);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    JobsAPI.get(id).then((j) => {
      if (!j) { navigate({ to: "/jobs" }); return; }
      setJob(j);
    });
    JobsAPI.list().then((all) => setRelated(all.filter((j) => j.id !== id).slice(0, 3)));
  }, [id, navigate]);

  if (!job) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] grid place-items-center">
          <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </PublicLayout>
    );
  }

  const apply = async () => {
    await JobsAPI.apply(job.id);
    setApplied(true);
    toast.success("Application submitted!");
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />Back to jobs
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-6 sm:p-8 shadow-elevated"
        >
          <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] items-start">
            <div className="h-16 w-16 rounded-2xl bg-white ring-1 ring-border grid place-items-center shrink-0">
              <img src={job.logo} alt={job.company} className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{job.title}</h1>
              <Link to="/companies/$id" params={{ id: job.companyId }} className="mt-1 inline-flex items-center gap-1 text-primary hover:underline">
                <Building2 className="h-4 w-4" />{job.company}
              </Link>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.type}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.postedAt}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{job.applicants} applied</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button onClick={() => setSaved((s) => !s)} variant="outline" size="icon" className="h-11 w-11">
                {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11"><Share2 className="h-4 w-4" /></Button>
              <Button onClick={apply} disabled={applied} className="h-11 px-6 bg-hero border-0 text-white shadow-glow hover:opacity-90">
                {applied ? <><CheckCircle2 className="mr-2 h-4 w-4" />Applied</> : "Apply now"}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main */}
          <div className="space-y-8">
            <Section title="About the role">
              <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
            </Section>
            <Section title="Responsibilities">
              <List items={job.responsibilities} />
            </Section>
            <Section title="Requirements">
              <List items={job.requirements} />
            </Section>
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
              </div>
            </Section>
            <Section title="Benefits">
              <div className="grid sm:grid-cols-2 gap-2">
                {job.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />{b}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="glass rounded-2xl p-5 space-y-3">
              <Meta icon={DollarSign} label="Salary" value={job.salary} />
              <Meta icon={TrendingUp} label="Experience" value={job.experience} />
              <Meta icon={Briefcase} label="Type" value={job.type} />
              <Meta icon={MapPin} label="Location" value={job.location} />
              <Button onClick={apply} disabled={applied} className="w-full h-11 mt-2 bg-hero border-0 text-white shadow-glow hover:opacity-90">
                {applied ? "Applied" : "Apply for this job"}
              </Button>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold mb-3">Related jobs</div>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link key={r.id} to="/jobs/$id" params={{ id: r.id }} className="flex items-center gap-3 hover:bg-accent rounded-lg p-2 -m-2 transition">
                    <img src={r.logo} alt={r.company} className="h-8 w-8 rounded-lg" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{r.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{r.company}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}
function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{i}</span>
        </li>
      ))}
    </ul>
  );
}
function Meta({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
