import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Search, Sparkles, TrendingUp, Users, Briefcase, Building2, Star, CheckCircle2, MapPin } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { JobCard } from "@/components/JobCard";
import { CompanyCard } from "@/components/CompanyCard";
import { JobsAPI, CompaniesAPI } from "@/services/api";
import { testimonials, type Job, type Company } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Landing });

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = 0;
    const dur = 1200; const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(start + (to - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

function Landing() {
  const [featured, setFeatured] = useState<Job[]>([]);
  const [trending, setTrending] = useState<Company[]>([]);
  useEffect(() => {
    JobsAPI.featured().then(setFeatured);
    CompaniesAPI.trending().then(setTrending);
  }, []);

  const categories = [
    { name: "Engineering", count: 1240, icon: "💻" },
    { name: "Design", count: 480, icon: "🎨" },
    { name: "Product", count: 320, icon: "📦" },
    { name: "Data & AI", count: 620, icon: "🤖" },
    { name: "Marketing", count: 280, icon: "📣" },
    { name: "Operations", count: 210, icon: "⚙️" },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-40 right-10 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-powered matches · 50k+ open roles this week
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto"
          >
            Find the job you <span className="gradient-text">actually want.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            CareerConnect matches students, engineers, and designers to premium roles at the world's most exciting companies.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 max-w-3xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="glass-strong rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-elevated">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Job title or keyword" className="pl-9 h-12 border-0 bg-transparent shadow-none focus-visible:ring-0" />
              </div>
              <div className="relative flex-1 sm:border-l border-border/60">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Location or remote" className="pl-9 h-12 border-0 bg-transparent shadow-none focus-visible:ring-0" />
              </div>
              <Button asChild size="lg" className="bg-hero border-0 text-white shadow-glow hover:opacity-90 h-12 px-6">
                <Link to="/jobs">Search jobs</Link>
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span>Popular:</span>
              {["Frontend", "Product Designer", "Remote", "Internship", "ML Engineer"].map((t) => (
                <Link key={t} to="/jobs" className="hover:text-primary transition">{t}</Link>
              ))}
            </div>
          </motion.form>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Briefcase, label: "Open jobs", value: 50000, suffix: "+" },
              { icon: Building2, label: "Top companies", value: 2400, suffix: "+" },
              { icon: Users, label: "Active users", value: 180000, suffix: "+" },
              { icon: TrendingUp, label: "Hires this year", value: 12000, suffix: "+" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
                className="glass rounded-2xl p-5 text-left"
              >
                <s.icon className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending companies */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Trending</div>
              <h2 className="text-3xl sm:text-4xl font-bold">Top companies hiring now</h2>
            </div>
            <Link to="/companies" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.slice(0, 4).map((c, i) => <CompanyCard key={c.id} company={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-mesh">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">Browse by category</h2>
            <p className="mt-2 text-muted-foreground">Find your fit across engineering, design, product, and beyond.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link to="/jobs" className="block glass rounded-2xl p-5 text-center hover:shadow-glow transition">
                  <div className="text-3xl">{c.icon}</div>
                  <div className="mt-2 font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.count} jobs</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Featured</div>
              <h2 className="text-3xl sm:text-4xl font-bold">Handpicked jobs for you</h2>
            </div>
            <Link to="/jobs" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Explore all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-mesh">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Success stories</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Loved by 180k+ job seekers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 shadow-soft"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}
                </div>
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-hero p-10 sm:p-16 text-center text-white shadow-elevated overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "var(--gradient-mesh)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
                Ready to land your dream job?
              </h2>
              <p className="mt-4 text-white/90 max-w-lg mx-auto">
                Join CareerConnect free. Build your profile in 2 minutes and start getting matched today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-6">
                  <Link to="/register">Create free account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20 h-12 px-6">
                  <Link to="/jobs">Browse jobs</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-white/80">
                {["Free forever", "No credit card", "2-minute setup"].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />{f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
