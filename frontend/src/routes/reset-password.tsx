import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({ component: ResetPage });

function ResetPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ password: string; confirm: string }>();
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Make it strong — you'll only need it once in a while."
      footer={<Link to="/login" className="font-semibold text-primary hover:underline">Back to sign in</Link>}
    >
      <form onSubmit={handleSubmit(async () => { toast.success("Password updated. Sign in again."); navigate({ to: "/login" }); })} className="space-y-4">
        {["password", "confirm"].map((f) => (
          <div key={f}>
            <Label htmlFor={f}>{f === "password" ? "New password" : "Confirm password"}</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id={f} type="password" placeholder="••••••••" className="pl-9 h-11" {...register(f as "password" | "confirm", { required: true, minLength: 8 })} />
            </div>
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-hero border-0 text-white shadow-glow hover:opacity-90">Update password</Button>
      </form>
    </AuthLayout>
  );
}
