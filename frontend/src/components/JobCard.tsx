import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Job } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group glass rounded-2xl p-5 shadow-soft hover:shadow-elevated transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-xl bg-white ring-1 ring-border overflow-hidden grid place-items-center shrink-0">
            <img src={job.logo} alt={job.company} className="h-8 w-8 object-contain" />
          </div>
          <div className="min-w-0">
            <Link to="/jobs/$id" params={{ id: job.id }} className="block">
              <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">{job.title}</h3>
            </Link>
            <Link to="/companies/$id" params={{ id: job.companyId }} className="text-sm text-muted-foreground hover:text-foreground truncate block">
              {job.company}
            </Link>
          </div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setSaved((s) => !s); }}
          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent shrink-0"
          aria-label="Save job"
        >
          {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 4).map((s) => (
          <Badge key={s} variant="secondary" className="rounded-md font-normal">{s}</Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.postedAt}</span>
        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{job.applicants} applied</span>
      </div>

      <div className="mt-4 flex items-center justify-between pt-4 border-t border-border/60">
        <div>
          <div className="text-sm font-semibold">{job.salary}</div>
          <div className="text-[11px] text-muted-foreground">{job.type} · {job.experience}</div>
        </div>
        <Link
          to="/jobs/$id"
          params={{ id: job.id }}
          className="inline-flex items-center rounded-lg bg-hero px-4 py-2 text-xs font-semibold text-white shadow-glow hover:opacity-90 transition"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
}
