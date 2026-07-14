import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Service — CareerConnect" },
      { name: "description", content: "The terms governing your use of CareerConnect." },
      { property: "og:title", content: "Terms of Service" },
      { property: "og:description", content: "The rules of the road for using CareerConnect." },
    ],
  }),
});

function Terms() {
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
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
  { title: "1. Acceptance of terms", body: "By using CareerConnect you agree to these terms. If you don't agree, please don't use the service." },
  { title: "2. Your account", body: "You're responsible for keeping your login credentials secure and for all activity under your account." },
  { title: "3. Content", body: "You retain ownership of the content you upload, but grant us a license to display it as part of the service." },
  { title: "4. Prohibited use", body: "No spam, scraping, impersonation, or harassment. We may suspend accounts that violate these rules." },
  { title: "5. Liability", body: "The service is provided as-is. We're not liable for missed opportunities or interview outcomes." },
];
