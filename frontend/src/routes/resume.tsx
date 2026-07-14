import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Download, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { AppLayout, ProtectedRoute } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/Widgets";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resume")({ component: () => <ProtectedRoute><ResumePage /></ProtectedRoute> });

function ResumePage() {
  const [resume, setResume] = useState<{ name: string; size: string; uploaded: string } | null>({
    name: "Arjun_Verma_Resume.pdf", size: "284 KB", uploaded: "2 days ago",
  });
  const [dragging, setDragging] = useState(false);

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <PageHeader eyebrow="Resume" title="Your resume" description="Upload once, apply to hundreds of jobs in a click." />

        {resume ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-hero shadow-glow shrink-0">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{resume.name}</div>
                <div className="text-xs text-muted-foreground">{resume.size} · Uploaded {resume.uploaded}</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline"><Eye className="mr-2 h-4 w-4" />Preview</Button>
              <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
              <Button variant="outline"><Upload className="mr-2 h-4 w-4" />Replace</Button>
              <Button variant="outline" onClick={() => { setResume(null); toast.success("Resume deleted"); }} className="text-destructive hover:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
            </div>
            <div className="mt-6 rounded-xl border-2 border-dashed p-8 bg-accent/30 text-center">
              <div className="text-sm text-muted-foreground">Resume preview would render here.</div>
            </div>
          </motion.div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); setResume({ name: "Uploaded.pdf", size: "180 KB", uploaded: "just now" }); toast.success("Resume uploaded"); }}
            className={`glass rounded-2xl p-12 text-center border-2 border-dashed transition ${dragging ? "border-primary bg-accent/50" : "border-border"}`}
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent"><Upload className="h-7 w-7 text-primary" /></div>
            <h3 className="mt-4 font-semibold">Drop your resume here</h3>
            <p className="mt-1 text-sm text-muted-foreground">PDF, DOCX up to 10MB</p>
            <label className="mt-4 inline-flex items-center rounded-lg bg-hero px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-90 cursor-pointer">
              Browse files
              <input type="file" className="sr-only" onChange={() => { setResume({ name: "Uploaded.pdf", size: "180 KB", uploaded: "just now" }); toast.success("Resume uploaded"); }} />
            </label>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
