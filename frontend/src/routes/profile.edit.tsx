import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/Widgets";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/edit")({ component: () => <ProtectedRoute><EditProfile /></ProtectedRoute> });

function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: user?.name, headline: user?.headline, location: user?.location,
      email: user?.email, about: user?.about, skills: user?.skills.join(", "),
    },
  });

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <PageHeader eyebrow="Profile" title="Edit profile" description="Keep your profile fresh so recruiters can find you." />
        <form onSubmit={handleSubmit(async () => { await new Promise((r) => setTimeout(r, 400)); toast.success("Profile updated"); navigate({ to: "/profile" }); })} className="glass rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name"><Input {...register("name")} className="h-11" /></Field>
            <Field label="Email"><Input type="email" {...register("email")} className="h-11" /></Field>
          </div>
          <Field label="Headline"><Input {...register("headline")} className="h-11" /></Field>
          <Field label="Location"><Input {...register("location")} className="h-11" /></Field>
          <Field label="About"><Textarea {...register("about")} rows={5} /></Field>
          <Field label="Skills (comma separated)"><Input {...register("skills")} className="h-11" /></Field>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/profile" })}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-hero border-0 text-white shadow-glow hover:opacity-90">Save changes</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}
