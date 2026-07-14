import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CompanyCard } from "@/components/CompanyCard";
import { PageHeader } from "@/components/Widgets";
import { CompaniesAPI } from "@/services/api";
import type { Company } from "@/lib/mockData";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/companies/")({ component: CompaniesList });

function CompaniesList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => { CompaniesAPI.list(q).then(setCompanies); }, [q]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <PageHeader
          eyebrow="Companies"
          title="Explore top companies"
          description="Discover the world's most exciting employers and see their open roles."
        />
        <div className="glass-strong rounded-2xl p-3 mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search companies…" className="pl-9 h-11 border-0 bg-transparent shadow-none focus-visible:ring-0" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((c, i) => <CompanyCard key={c.id} company={c} index={i} />)}
        </div>
      </div>
    </PublicLayout>
  );
}
