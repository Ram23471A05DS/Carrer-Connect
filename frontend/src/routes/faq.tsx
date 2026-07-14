import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/Widgets";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — CareerConnect" },
      { name: "description", content: "Answers to the most common questions about CareerConnect — pricing, matches, applications, and more." },
      { property: "og:title", content: "CareerConnect FAQ" },
      { property: "og:description", content: "Everything you need to know about how CareerConnect works." },
    ],
  }),
});

const faqs = [
  { q: "Is CareerConnect free to use?", a: "Yes. Job seekers use CareerConnect completely free — no credit card, no hidden fees. Recruiters pay per job post or via team plans." },
  { q: "How are job matches generated?", a: "We combine your profile, skills, and past applications with signals from recruiters to surface the most relevant roles first." },
  { q: "Can I apply without a resume?", a: "You can, but a completed profile with a resume gets 4x more recruiter responses. We recommend uploading one." },
  { q: "Do recruiters see my profile automatically?", a: "Only if you enable public profile in Settings > Privacy. Otherwise you're invisible until you apply." },
  { q: "How do I message a recruiter?", a: "Recruiters can message you after you apply. Some premium plans allow open messaging both ways." },
  { q: "How is CareerConnect different from LinkedIn?", a: "We focus exclusively on job matching for early-career and mid-career talent — no feed, no ads, no noise." },
];

function FAQ() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <PageHeader eyebrow="Help" title="Frequently asked questions" description="Can't find what you need? Head to Contact." />
        <div className="glass rounded-2xl p-2">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="px-4 text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PublicLayout>
  );
}
