import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/verify")({ component: VerifyPage });

function VerifyPage() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const set = (i: number, v: string) => {
    const c = [...code];
    c[i] = v.slice(-1);
    setCode(c);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const verify = () => {
    toast.success("Email verified — welcome aboard!");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent to your inbox."
      footer={<Link to="/login" className="font-semibold text-primary hover:underline">Back to sign in</Link>}
    >
      <div className="space-y-6">
        <div className="flex justify-between gap-2">
          {code.map((v, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={v}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl glass border-2 border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition"
            />
          ))}
        </div>
        <Button onClick={verify} disabled={code.some((c) => !c)} className="w-full h-11 bg-hero border-0 text-white shadow-glow hover:opacity-90">Verify email</Button>
        <p className="text-center text-sm text-muted-foreground">
          Didn't get it? <button className="text-primary hover:underline font-medium">Resend code</button>
        </p>
      </div>
    </AuthLayout>
  );
}
