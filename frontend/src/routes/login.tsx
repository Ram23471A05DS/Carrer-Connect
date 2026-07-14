import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({ component: LoginPage });

type Form = { email: string; password: string; remember: boolean };

function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>();
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your CareerConnect account to continue."
      footer={<>Don't have an account? <Link to="/register" className="font-semibold text-primary hover:underline">Create one</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@example.com" className="pl-9 h-11"
              {...register("email", { required: "Email is required" })} />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-10 h-11"
              {...register("password", { required: "Password is required" })} />
            <button type="button" onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" {...register("remember")} />
          <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me for 30 days</label>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-hero border-0 text-white shadow-glow hover:opacity-90">
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-11"><Chrome className="mr-2 h-4 w-4" />Google</Button>
          <Button type="button" variant="outline" className="h-11"><Github className="mr-2 h-4 w-4" />GitHub</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
