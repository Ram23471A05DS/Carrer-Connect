import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Mail, Github, Linkedin, Globe, Edit3, Award, Briefcase, GraduationCap, Star, Languages } from "lucide-react";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/")({ component: () => <ProtectedRoute><ProfilePage /></ProtectedRoute> });

function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
        <div className="glass-strong rounded-3xl overflow-hidden shadow-elevated">
          <div className="h-40 sm:h-52 bg-hero relative">
            <img src={user.cover} alt="" className="w-full h-full object-cover opacity-70 mix-blend-overlay" />
          </div>
          <div className="p-6 sm:p-8 -mt-14 relative">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] items-end">
              <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-2xl ring-4 ring-card object-cover shadow-soft" />
              <div className="min-w-0">
                <h1 className="text-2xl font-bold truncate">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.headline}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{user.location}</span>
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{user.email}</span>
                </div>
              </div>
              <Button asChild variant="outline"><Link to="/profile/edit"><Edit3 className="mr-2 h-4 w-4" />Edit</Link></Button>
            </div>
            <div className="mt-4 flex gap-2">
              <a href={user.social.github} className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent"><Github className="h-4 w-4" /></a>
              <a href={user.social.linkedin} className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent"><Linkedin className="h-4 w-4" /></a>
              <a href={user.social.portfolio} className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent"><Globe className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card title="About" icon={Star}><p className="text-sm leading-relaxed text-muted-foreground">{user.about}</p></Card>
            <Card title="Experience" icon={Briefcase}>
              <div className="space-y-4">
                {user.experience.map((e) => (
                  <div key={e.company} className="grid grid-cols-[auto_1fr] gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center shrink-0"><Briefcase className="h-4 w-4 text-primary" /></div>
                    <div>
                      <div className="text-sm font-semibold">{e.role} · {e.company}</div>
                      <div className="text-xs text-muted-foreground">{e.period}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Education" icon={GraduationCap}>
              <div className="space-y-4">
                {user.education.map((e) => (
                  <div key={e.school} className="grid grid-cols-[auto_1fr] gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center shrink-0"><GraduationCap className="h-4 w-4 text-primary" /></div>
                    <div>
                      <div className="text-sm font-semibold">{e.school}</div>
                      <div className="text-xs text-muted-foreground">{e.degree} · {e.period}</div>
                      <div className="text-xs text-muted-foreground">GPA: {e.gpa}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Projects" icon={Star}>
              <div className="grid sm:grid-cols-2 gap-3">
                {user.projects.map((p) => (
                  <a key={p.name} href={p.link} className="block p-4 rounded-xl border hover:bg-accent transition">
                    <div className="font-semibold text-sm">{p.name}</div>
                    <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card title="Skills" icon={Star}>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </Card>
            <Card title="Certifications" icon={Award}>
              <ul className="space-y-2 text-sm">
                {user.certifications.map((c) => <li key={c} className="flex items-start gap-2"><Award className="h-4 w-4 text-primary mt-0.5" />{c}</li>)}
              </ul>
            </Card>
            <Card title="Achievements" icon={Star}>
              <ul className="space-y-2 text-sm">
                {user.achievements.map((a) => <li key={a} className="flex items-start gap-2"><Star className="h-4 w-4 text-warning mt-0.5" />{a}</li>)}
              </ul>
            </Card>
            <Card title="Languages" icon={Languages}>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {user.languages.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-primary" />
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      {children}
    </div>
  );
}
