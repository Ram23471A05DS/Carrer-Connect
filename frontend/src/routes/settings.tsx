import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/Widgets";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/settings")({ component: () => <ProtectedRoute><SettingsPage /></ProtectedRoute> });

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { logout, setRole, user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <PageHeader title="Settings" description="Manage your account, security, and preferences." />

        <Tabs defaultValue="account">
          <TabsList className="glass w-full justify-start overflow-x-auto no-scrollbar">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <Card title="Profile info">
              <Row label="Full name"><Input defaultValue={user?.name} className="h-10 max-w-sm" /></Row>
              <Row label="Email"><Input defaultValue={user?.email} className="h-10 max-w-sm" /></Row>
              <Row label="Role">
                <div className="flex gap-2">
                  {(["student", "recruiter", "admin"] as const).map((r) => (
                    <button key={r} onClick={() => { setRole(r); toast.success(`Switched to ${r}`); }}
                      className={`px-3 py-1.5 rounded-lg text-xs capitalize ${user?.role === r ? "bg-primary text-primary-foreground" : "glass hover:bg-accent"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </Row>
              <Row label="Language">
                <select className="h-10 rounded-lg glass px-3 text-sm"><option>English</option><option>Hindi</option><option>Spanish</option></select>
              </Row>
            </Card>
            <Card title="Danger zone" className="mt-6 border-destructive/40">
              <Row label="Log out"><Button variant="outline" onClick={() => { logout(); navigate({ to: "/" }); }}>Log out</Button></Row>
              <Row label="Delete account"><Button variant="destructive">Delete permanently</Button></Row>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card title="Password">
              <Row label="Current password"><Input type="password" className="h-10 max-w-sm" /></Row>
              <Row label="New password"><Input type="password" className="h-10 max-w-sm" /></Row>
              <Button className="bg-hero border-0 text-white shadow-glow hover:opacity-90">Update password</Button>
            </Card>
            <Card title="Two-factor auth" className="mt-6">
              <Row label="Enable 2FA"><Switch /></Row>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card title="Privacy">
              <Row label="Public profile"><Switch defaultChecked /></Row>
              <Row label="Show email"><Switch /></Row>
              <Row label="Let recruiters message you"><Switch defaultChecked /></Row>
            </Card>
          </TabsContent>

          <TabsContent value="theme" className="mt-6">
            <Card title="Appearance">
              <Row label="Theme">
                <div className="flex gap-2">
                  {(["light", "dark"] as const).map((t) => (
                    <button key={t} onClick={() => setTheme(t)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize ${theme === t ? "bg-primary text-primary-foreground" : "glass hover:bg-accent"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </Row>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card title="Notification preferences">
              <Row label="Email — new job matches"><Switch defaultChecked /></Row>
              <Row label="Email — application updates"><Switch defaultChecked /></Row>
              <Row label="Push — messages"><Switch defaultChecked /></Row>
              <Row label="Weekly digest"><Switch /></Row>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <h2 className="font-semibold text-sm mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center py-2 border-b last:border-0">
      <Label className="text-sm">{label}</Label>
      <div>{children}</div>
    </div>
  );
}
