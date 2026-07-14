import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { JobCard } from "@/components/JobCard";
import { PageHeader, EmptyState } from "@/components/Widgets";
import { ApplicationsAPI } from "@/services/api";
import type { Job } from "@/lib/mockData";

export const Route = createFileRoute("/saved")({ component: () => <ProtectedRoute><SavedPage /></ProtectedRoute> });

function SavedPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => { ApplicationsAPI.saved().then(setJobs); }, []);
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <PageHeader eyebrow="Saved" title="Your saved jobs" description={`${jobs.length} roles bookmarked. Apply when you're ready.`} />
        {jobs.length === 0 ? (
          <EmptyState icon={Bookmark} title="No saved jobs yet" description="Bookmark jobs to review them here later." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
