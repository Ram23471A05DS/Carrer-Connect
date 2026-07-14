import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — CareerConnect" },
      { name: "description", content: "How CareerConnect collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy" },
      { property: "og:description", content: "Our commitment to your privacy." },
      { name: "robots", content: "index, follow" },
    ],
  }),
});

function Privacy() {
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 prose prose-neutral dark:prose-invert">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: July 14, 2026</p>
        {sections.map((s) => (
          <section key={s.title} className="glass rounded-2xl p-6 mt-6">
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </section>
        ))}
      </article>
    </PublicLayout>
  );
}

const sections = [
  { title: "1. Information we collect", body: "We collect the information you provide (profile, resume, applications) and basic usage data to improve the product." },
  { title: "2. How we use your data", body: "To match you with jobs, show relevant opportunities, and communicate about your applications. We never sell your data." },
  { title: "3. Who sees your profile", body: "Recruiters only see your profile if you apply to their job or if you enable public profile in Settings > Privacy." },
  { title: "4. Data retention", body: "You can delete your account at any time from Settings > Account. All data is removed within 30 days." },
  { title: "5. Contact", body: "Questions? Reach us at privacy@careerconnect.app." },
];
