import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/Widgets";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — CareerConnect" },
      { name: "description", content: "Get in touch with the CareerConnect team. We reply to every message within 24 hours." },
      { property: "og:title", content: "Contact CareerConnect" },
      { property: "og:description", content: "Questions, partnerships, press. We're here." },
    ],
  }),
});

function Contact() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<{ name: string; email: string; message: string }>();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <PageHeader eyebrow="Contact" title="Let's talk" description="Questions, partnerships, or feedback. Real humans reply within 24 hours." />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit(async () => { await new Promise((r) => setTimeout(r, 500)); toast.success("Message sent — we'll be in touch!"); reset(); })}
            className="glass rounded-2xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input {...register("name", { required: true })} className="mt-1.5 h-11" /></div>
              <div><Label>Email</Label><Input type="email" {...register("email", { required: true })} className="mt-1.5 h-11" /></div>
            </div>
            <div><Label>Message</Label><Textarea {...register("message", { required: true })} rows={6} className="mt-1.5" /></div>
            <Button type="submit" disabled={isSubmitting} className="bg-hero border-0 text-white shadow-glow hover:opacity-90 h-11 px-6">Send message</Button>
          </form>
          <aside className="glass rounded-2xl p-6 space-y-4 h-fit">
            <Row icon={Mail} label="Email" value="hello@careerconnect.app" />
            <Row icon={Phone} label="Phone" value="+1 (415) 555-0123" />
            <Row icon={MapPin} label="Office" value="San Francisco, CA" />
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
}
function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent"><Icon className="h-4 w-4 text-primary" /></div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
