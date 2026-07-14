import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase as BriefcaseIcon } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { JobCard } from "@/components/JobCard";
import { PageHeader, EmptyState } from "@/components/Widgets";
import { JobsAPI } from "@/services/api";
import type { Job } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/jobs/")({ component: JobsList });

const categories = ["All", "Engineering", "Design", "Product", "Data", "Marketing", "Operations"];
const types = ["All", "Full-time", "Part-time", "Contract", "Internship", "Remote"];
const locations = ["All", "San Francisco", "New York", "Remote", "London", "Bengaluru"];

function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 9;

  useEffect(() => {
    setLoading(true);
    JobsAPI.list({ q, category, type, location }).then((r) => { setJobs(r); setPage(1); setLoading(false); });
  }, [q, category, type, location]);

  const paged = jobs.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(jobs.length / perPage));

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <PageHeader
          eyebrow="Discover"
          title="Find your next opportunity"
          description={`${jobs.length} open roles across top companies. Filter by role, type, and location.`}
        />

        {/* Search bar */}
        <div className="glass-strong rounded-2xl p-3 flex flex-col md:flex-row gap-2 shadow-soft mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, company, or skill" className="pl-9 h-11 border-0 bg-transparent shadow-none focus-visible:ring-0" />
          </div>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="h-11 rounded-lg bg-transparent border-0 px-3 text-sm focus:outline-none">
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
          <Button className="bg-hero border-0 text-white shadow-glow hover:opacity-90 h-11 px-6">Search</Button>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar filters */}
          <aside className="glass rounded-2xl p-5 h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="font-semibold text-sm">Filters</span>
            </div>
            <div className="space-y-5">
              <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
              <FilterGroup label="Type" options={types} value={type} onChange={setType} />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <p className="text-sm text-muted-foreground">Showing {paged.length} of {jobs.length} results</p>
              <select className="h-9 rounded-lg glass px-3 text-sm">
                <option>Most relevant</option><option>Newest</option><option>Salary: high to low</option>
              </select>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-5 h-52 animate-pulse" />
                ))}
              </div>
            ) : paged.length === 0 ? (
              <EmptyState icon={BriefcaseIcon} title="No jobs match your filters" description="Try broadening your search or clearing filters." />
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {paged.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                <span className="text-sm text-muted-foreground px-3">Page {page} of {totalPages}</span>
                <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              value === o ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/70"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
