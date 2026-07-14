import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/register")({ component: RegisterPage });

type Form = { name: string; email: string; password: string };

function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<Form>();
  const [show, setShow] = useState(false);
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const password = watch("password", "");
  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length);
  const strengthLabels = ["Too weak", "Weak", "Okay", "Good", "Strong"];
  const strengthColors = ["bg-destructive", "bg-destructive", "bg-warning", "bg-primary", "bg-success"];

  const onSubmit = async (data: Form) => {
    try {
      await signup(data.name, data.email, data.password);
      toast.success("Account created — welcome to CareerConnect!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Registration failed.");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Land the role you actually want. Free forever."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <div className="relative mt-1.5">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="name" placeholder="Arjun Verma" className="pl-9 h-11" {...register("name", { required: "Name is required" })} />
          </div>
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@example.com" className="pl-9 h-11" {...register("email", { required: "Email is required" })} />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type={show ? "text" : "password"} placeholder="At least 8 characters" className="pl-9 pr-10 h-11"
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } })} />
            <button type="button" onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i < strength ? strengthColors[strength] : "bg-muted"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{strengthLabels[strength]}</p>
            </div>
          )}
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-hero border-0 text-white shadow-glow hover:opacity-90">
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-11"><Chrome className="mr-2 h-4 w-4" />Google</Button>
          <Button type="button" variant="outline" className="h-11"><Github className="mr-2 h-4 w-4" />GitHub</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
