import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, MapPin, Users, Star, ExternalLink, Linkedin, Twitter } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CompaniesAPI, JobsAPI } from "@/services/api";
import type { Company, Job } from "@/lib/mockData";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/companies/$id")({ component: CompanyDetail });

function CompanyDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    CompaniesAPI.get(id).then((c) => c ? setCompany(c) : navigate({ to: "/companies" }));
    JobsAPI.list().then((all) => setJobs(all.filter((j) => j.companyId === id)));
  }, [id, navigate]);

  if (!company) {
    return <PublicLayout><div className="min-h-[60vh] grid place-items-center"><div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div></PublicLayout>;
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <Link to="/companies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />Back to companies
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl overflow-hidden shadow-elevated">
          <div className="h-48 sm:h-56 relative bg-hero">
            <img src={company.cover} alt="" className="w-full h-full object-cover opacity-60" />
          </div>
          <div className="p-6 sm:p-8 -mt-14 relative">
            <div className="h-24 w-24 rounded-2xl bg-white ring-4 ring-card grid place-items-center shadow-soft">
              <img src={company.logo} alt={company.name} className="h-16 w-16 object-contain" />
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{company.name}</h1>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{company.industry}</span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" />{company.size} employees</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{company.location}</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" />{company.rating.toFixed(1)} ({company.reviews})</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild><a href={company.website} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Website</a></Button>
                <Button className="bg-hero border-0 text-white shadow-glow hover:opacity-90">Follow</Button>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="about" className="mt-8">
          <TabsList className="glass">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6 grid lg:grid-cols-[1fr_280px] gap-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-3">About {company.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{company.description}</p>
            </div>
            <div className="glass rounded-2xl p-6 space-y-3 h-fit">
              <Info label="Industry" value={company.industry} />
              <Info label="Company size" value={company.size} />
              <Info label="Founded" value={String(company.founded)} />
              <Info label="Headquarters" value={company.location} />
              <div className="pt-3 border-t flex gap-2">
                <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent"><Linkedin className="h-4 w-4" /></a>
                <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent"><Twitter className="h-4 w-4" /></a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <div className="grid md:grid-cols-2 gap-5">
              {jobs.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.gallery.map((src) => (
                <img key={src} src={src} alt="" className="w-full h-48 rounded-2xl object-cover" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="glass rounded-2xl p-6 text-center text-muted-foreground">Reviews coming soon.</div>
          </TabsContent>
        </Tabs>
      </div>
    </PublicLayout>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span>
    </div>
  );
}
