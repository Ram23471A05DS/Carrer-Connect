import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthAPI } from "@/services/api";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });

function ForgotPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string }>();
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a secure link to reset your password."
      footer={<>Remembered it? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit(async ({ email }) => { await AuthAPI.forgot(email); toast.success("Check your inbox for a reset link."); })} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@example.com" className="pl-9 h-11" {...register("email", { required: true })} />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-hero border-0 text-white shadow-glow hover:opacity-90">
          {isSubmitting ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthLayout>
  );
}
