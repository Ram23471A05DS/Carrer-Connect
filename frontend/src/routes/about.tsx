import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Target, Users, Heart } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/Widgets";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — CareerConnect" },
      { name: "description", content: "The story behind CareerConnect — how we help students, engineers, and designers land the roles they actually want." },
      { property: "og:title", content: "About CareerConnect" },
      { property: "og:description", content: "Our mission: match talent to premium opportunities with zero friction." },
    ],
  }),
});

const values = [
  { icon: Sparkles, title: "Craft", body: "We obsess over the details, because you deserve a job platform that feels premium." },
  { icon: Target, title: "Focus", body: "Fewer, better matches. We'd rather send you 3 great jobs than 300 mediocre ones." },
  { icon: Users, title: "Community", body: "Recruiters, mentors, and peers — all in one place, without the noise." },
  { icon: Heart, title: "Human", body: "Real people, real careers. We're building for the humans behind every application." },
];

function About() {
  return (
    <PublicLayout>
      <section className="bg-mesh py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Our story</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Careers, <span className="gradient-text">reimagined.</span></h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
            CareerConnect started with a simple frustration: job hunting felt broken. Endless scrolling, generic listings, ghosted applications.
            We're building the platform we wished existed when we were job hunting.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PageHeader title="What we stand for" description="Four values that guide every product decision." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="glass rounded-2xl p-6" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
                  <v.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-mesh">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold">Built by a small, senior team.</h2>
          <p className="mt-3 text-muted-foreground">Former engineers and designers from Stripe, Figma, and Linear.</p>
          <div className="mt-8 flex justify-center -space-x-3">
            {[15, 32, 47, 68, 12, 44].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/80?img=${i}`} className="h-14 w-14 rounded-full ring-4 ring-background object-cover" alt="" />
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
