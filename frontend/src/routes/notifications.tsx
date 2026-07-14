import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MessageSquare, Briefcase, Settings as SettingsIcon, Check, Trash2 } from "lucide-react";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { PageHeader, EmptyState } from "@/components/Widgets";
import { NotificationsAPI } from "@/services/api";
import type { Notification } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/notifications")({ component: () => <ProtectedRoute><NotificationsPage /></ProtectedRoute> });

const icons: Record<Notification["type"], any> = {
  application: Briefcase, message: MessageSquare, job: Bell, system: SettingsIcon,
};

function NotificationsPage() {
  const [list, setList] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  useEffect(() => { NotificationsAPI.list().then(setList); }, []);

  const filtered = filter === "unread" ? list.filter((n) => !n.read) : list;
  const unread = list.filter((n) => !n.read).length;

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <PageHeader
          title="Notifications"
          description={unread ? `You have ${unread} unread notifications.` : "You're all caught up."}
          actions={
            <Button variant="outline" size="sm" onClick={() => setList(list.map((n) => ({ ...n, read: true })))}>
              <Check className="mr-2 h-4 w-4" />Mark all read
            </Button>
          }
        />
        <div className="flex gap-2 mb-4">
          {(["all", "unread"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === f ? "bg-primary text-primary-foreground" : "glass hover:bg-accent"}`}>
              {f === "all" ? "All" : `Unread (${unread})`}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={Bell} title="No notifications" description="When something happens, you'll see it here." />
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((n) => {
                const Icon = icons[n.type];
                return (
                  <motion.div
                    key={n.id} layout
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                    className={`glass rounded-2xl p-4 flex items-start gap-3 ${!n.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-sm truncate">{n.title}</div>
                        {!n.read && <Badge className="bg-primary text-primary-foreground text-[10px]">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{n.body}</p>
                      <div className="text-[11px] text-muted-foreground mt-1">{n.time}</div>
                    </div>
                    <button onClick={() => setList((l) => l.filter((x) => x.id !== n.id))} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
