import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, MapPin, Star } from "lucide-react";
import type { Company } from "@/lib/mockData";

export function CompanyCard({ company, index = 0 }: { company: Company; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group glass rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all"
    >
      <div className="h-24 bg-hero relative">
        <img src={company.cover} alt="" className="h-full w-full object-cover opacity-70 mix-blend-overlay" />
      </div>
      <div className="p-5 -mt-8">
        <div className="h-14 w-14 rounded-xl bg-white ring-4 ring-card grid place-items-center shadow-soft">
          <img src={company.logo} alt={company.name} className="h-9 w-9 object-contain" />
        </div>
        <Link to="/companies/$id" params={{ id: company.id }}>
          <h3 className="mt-3 font-semibold group-hover:text-primary transition">{company.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Building2 className="h-3 w-3" />{company.industry} · {company.size}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3" />{company.location}
        </p>
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-border/60">
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="font-semibold">{company.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({company.reviews})</span>
          </div>
          <span className="text-xs font-semibold text-primary">{company.openJobs} open</span>
        </div>
      </div>
    </motion.div>
  );
}
