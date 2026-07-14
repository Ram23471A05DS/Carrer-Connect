import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Smile, Phone, Video, Search, Circle } from "lucide-react";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { MessagesAPI } from "@/services/api";
import type { Message } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/messages")({ component: () => <ProtectedRoute><MessagesPage /></ProtectedRoute> });

function MessagesPage() {
  const [list, setList] = useState<Message[]>([]);
  const [active, setActive] = useState<Message | null>(null);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { MessagesAPI.list().then((l) => { setList(l); setActive(l[0]); }); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active]);

  const send = () => {
    if (!text.trim() || !active) return;
    const updated = { ...active, thread: [...active.thread, { fromMe: true, text, time: "now" }] };
    setActive(updated);
    setList((l) => l.map((m) => (m.id === active.id ? updated : m)));
    setText("");
    setTyping(true);
    setTimeout(() => setTyping(false), 1400);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="glass rounded-2xl overflow-hidden grid md:grid-cols-[320px_1fr] h-[calc(100vh-140px)]">
          {/* List */}
          <aside className="border-r border-border/60 flex flex-col">
            <div className="p-4 border-b border-border/60">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search chats…" className="pl-9 h-10 bg-background/60" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {list.map((m) => (
                <button
                  key={m.id} onClick={() => setActive(m)}
                  className={`w-full text-left p-3 flex items-center gap-3 hover:bg-accent transition ${active?.id === m.id ? "bg-accent" : ""}`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-11 w-11"><AvatarImage src={m.avatar} /><AvatarFallback>{m.from[0]}</AvatarFallback></Avatar>
                    {m.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-card" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-sm truncate">{m.from}</div>
                      <div className="text-[10px] text-muted-foreground shrink-0">{m.time}</div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-muted-foreground truncate">{m.lastMessage}</div>
                      {m.unread > 0 && <Badge className="h-5 min-w-5 px-1.5 text-[10px] bg-primary text-primary-foreground">{m.unread}</Badge>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chat */}
          {active ? (
            <section className="flex flex-col min-w-0">
              <div className="p-4 border-b border-border/60 flex items-center gap-3">
                <Avatar className="h-10 w-10"><AvatarImage src={active.avatar} /><AvatarFallback>{active.from[0]}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{active.from}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Circle className={`h-2 w-2 ${active.online ? "fill-success text-success" : "fill-muted-foreground text-muted-foreground"}`} />
                    {active.online ? "Online" : "Offline"} · {active.role}
                  </div>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent"><Phone className="h-4 w-4" /></button>
                <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent"><Video className="h-4 w-4" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-mesh">
                {active.thread.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${t.fromMe ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                      t.fromMe ? "bg-hero text-white rounded-br-sm" : "glass rounded-bl-sm"
                    }`}>
                      {t.text}
                      <div className={`text-[10px] mt-1 ${t.fromMe ? "text-white/70" : "text-muted-foreground"}`}>{t.time}</div>
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="h-2 w-2 rounded-full bg-primary"
                          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="p-3 border-t border-border/60 flex items-center gap-2">
                <button className="grid h-10 w-10 place-items-center rounded-lg hover:bg-accent"><Paperclip className="h-4 w-4" /></button>
                <button className="grid h-10 w-10 place-items-center rounded-lg hover:bg-accent"><Smile className="h-4 w-4" /></button>
                <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…" className="h-10 flex-1" />
                <button onClick={send} disabled={!text.trim()}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-hero text-white shadow-glow disabled:opacity-50">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </section>
          ) : (
            <div className="grid place-items-center text-muted-foreground">Select a conversation</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
