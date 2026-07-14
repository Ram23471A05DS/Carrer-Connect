import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/unauthorized")({ component: Unauth });

function Unauth() {
  return (
    <div className="min-h-screen grid place-items-center bg-mesh px-4">
      <div className="glass rounded-3xl p-10 max-w-md text-center shadow-elevated">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-hero shadow-glow">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Unauthorized</h1>
        <p className="mt-2 text-sm text-muted-foreground">You don't have access to this page. Sign in to continue.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/login" className="rounded-lg bg-hero px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-90">Sign in</Link>
          <Link to="/" className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent">Go home</Link>
        </div>
      </div>
    </div>
  );
}
