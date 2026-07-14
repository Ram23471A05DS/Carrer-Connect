// Mock dataset for CareerConnect frontend. Swap for real API responses later.
export type Job = {
  id: string;
  title: string;
  company: string;
  companyId: string;
  logo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  remote: boolean;
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
  applicants: number;
  category: string;
  featured?: boolean;
};

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  founded: number;
  description: string;
  openJobs: number;
  rating: number;
  reviews: number;
  cover: string;
  gallery: string[];
  social: { linkedin: string; twitter: string };
};

export type Application = {
  id: string;
  jobId: string;
  status: "Applied" | "Reviewed" | "Interview" | "Offer" | "Rejected";
  appliedAt: string;
  timeline: { stage: string; date: string; done: boolean }[];
};

export type Notification = {
  id: string;
  type: "application" | "message" | "job" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export type Message = {
  id: string;
  from: string;
  avatar: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  thread: { fromMe: boolean; text: string; time: string }[];
};

const logos: Record<string, string> = {
  Google: "https://logo.clearbit.com/google.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Meta: "https://logo.clearbit.com/meta.com",
  Amazon: "https://logo.clearbit.com/amazon.com",
  Apple: "https://logo.clearbit.com/apple.com",
  Netflix: "https://logo.clearbit.com/netflix.com",
  Stripe: "https://logo.clearbit.com/stripe.com",
  Airbnb: "https://logo.clearbit.com/airbnb.com",
  Uber: "https://logo.clearbit.com/uber.com",
  Spotify: "https://logo.clearbit.com/spotify.com",
  Figma: "https://logo.clearbit.com/figma.com",
  Notion: "https://logo.clearbit.com/notion.so",
  Linear: "https://logo.clearbit.com/linear.app",
  Vercel: "https://logo.clearbit.com/vercel.com",
  Shopify: "https://logo.clearbit.com/shopify.com",
};

export const companies: Company[] = Object.entries(logos).map(([name, logo], i) => ({
  id: `c-${i + 1}`,
  name,
  logo,
  industry: ["Technology", "SaaS", "Fintech", "E-commerce", "Media"][i % 5],
  size: ["50-200", "200-1k", "1k-5k", "5k-10k", "10k+"][i % 5],
  location: ["San Francisco, CA", "New York, NY", "Remote", "London, UK", "Bengaluru, IN"][i % 5],
  website: `https://${name.toLowerCase()}.com`,
  founded: 1998 + i * 2,
  description: `${name} is a leading company shaping the future of work with world-class engineering, design, and product culture. We're hiring across teams and locations.`,
  openJobs: 3 + (i % 8),
  rating: 4.1 + ((i % 9) / 10),
  reviews: 120 + i * 47,
  cover: `https://images.unsplash.com/photo-${["1497215728101-856f4ea42174", "1522071820081-009f0129c71c", "1600880292203-757bb62b4baf", "1556761175-5973dc0f32e7", "1521737711867-e3b97375f902"][i % 5]}?w=1200&auto=format&fit=crop`,
  gallery: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
  ],
  social: { linkedin: "#", twitter: "#" },
}));

const jobTitles = [
  "Senior Frontend Engineer", "Full Stack Developer", "Product Designer",
  "Backend Engineer", "DevOps Engineer", "Data Scientist", "ML Engineer",
  "Product Manager", "Mobile Developer (iOS)", "Android Engineer",
  "UI/UX Designer", "QA Automation Engineer", "Site Reliability Engineer",
  "Growth Marketer", "Technical Writer", "Cloud Architect",
  "Security Engineer", "Solutions Architect", "Engineering Manager", "Data Analyst",
];

const cities = ["San Francisco, CA", "New York, NY", "Remote", "Austin, TX", "London, UK", "Berlin, DE", "Bengaluru, IN", "Toronto, CA"];
const categories = ["Engineering", "Design", "Product", "Data", "Marketing", "Operations"];
const skillSets = [
  ["React", "TypeScript", "Next.js", "TailwindCSS"],
  ["Node.js", "PostgreSQL", "GraphQL", "AWS"],
  ["Figma", "Design Systems", "Prototyping", "User Research"],
  ["Python", "Pandas", "PyTorch", "SQL"],
  ["Kubernetes", "Docker", "Terraform", "CI/CD"],
  ["Swift", "SwiftUI", "Combine", "XCTest"],
];

export const jobs: Job[] = jobTitles.map((title, i) => {
  const company = companies[i % companies.length];
  return {
    id: `j-${i + 1}`,
    title,
    company: company.name,
    companyId: company.id,
    logo: company.logo,
    location: cities[i % cities.length],
    type: (["Full-time", "Full-time", "Contract", "Internship", "Remote"] as const)[i % 5],
    remote: i % 3 === 0,
    salary: `$${80 + i * 5}k – $${140 + i * 6}k`,
    experience: ["1-2 yrs", "2-4 yrs", "4-6 yrs", "6+ yrs"][i % 4],
    skills: skillSets[i % skillSets.length],
    description: `We're looking for a ${title} to join our team at ${company.name}. You'll ship product to millions of users, collaborate across disciplines, and grow into a senior IC or lead role.`,
    responsibilities: [
      "Own end-to-end delivery of features from spec to production",
      "Collaborate with design, product, and other engineers",
      "Write clean, well-tested, maintainable code",
      "Mentor junior teammates and raise the engineering bar",
    ],
    requirements: [
      "Strong fundamentals in your stack",
      "Experience shipping production software at scale",
      "Excellent written and verbal communication",
      "Bias for action and product ownership",
    ],
    benefits: ["Health, dental, vision", "Equity", "Unlimited PTO", "Learning stipend", "Remote-friendly"],
    postedAt: `${1 + (i % 20)}d ago`,
    applicants: 12 + i * 7,
    category: categories[i % categories.length],
    featured: i < 6,
  };
});

export const applications: Application[] = jobs.slice(0, 8).map((j, i) => ({
  id: `a-${i + 1}`,
  jobId: j.id,
  status: (["Applied", "Reviewed", "Interview", "Offer", "Applied", "Rejected", "Interview", "Reviewed"] as const)[i],
  appliedAt: `${2 + i}d ago`,
  timeline: [
    { stage: "Applied", date: `${5 + i}d ago`, done: true },
    { stage: "Resume Reviewed", date: `${3 + i}d ago`, done: i > 0 },
    { stage: "Interview", date: `${1 + i}d ago`, done: i >= 2 },
    { stage: "Offer", date: "pending", done: i === 3 },
  ],
}));

export const savedJobIds = ["j-2", "j-5", "j-9", "j-13"];

export const notifications: Notification[] = [
  { id: "n1", type: "application", title: "Application viewed", body: "Stripe just reviewed your application.", time: "2m ago", read: false },
  { id: "n2", type: "message", title: "New message from Priya", body: "Loved your portfolio — got 15 min this week?", time: "1h ago", read: false },
  { id: "n3", type: "job", title: "3 new jobs match you", body: "Frontend roles in Remote / San Francisco.", time: "3h ago", read: false },
  { id: "n4", type: "system", title: "Profile 82% complete", body: "Add a project to unlock the last badges.", time: "1d ago", read: true },
  { id: "n5", type: "application", title: "Interview scheduled", body: "Airbnb — Tue at 4:00 PM.", time: "2d ago", read: true },
];

export const messages: Message[] = [
  {
    id: "m1", from: "Priya Sharma", avatar: "https://i.pravatar.cc/100?img=47", role: "Recruiter · Stripe",
    lastMessage: "Loved your portfolio — got 15 min this week?", time: "1h", unread: 2, online: true,
    thread: [
      { fromMe: false, text: "Hey! Loved your portfolio — got 15 min this week?", time: "1h" },
      { fromMe: true, text: "Thanks Priya! Yes, Thursday afternoon works.", time: "58m" },
      { fromMe: false, text: "Perfect, I'll send a calendar invite for 3pm PT.", time: "45m" },
    ],
  },
  {
    id: "m2", from: "Marcus Lee", avatar: "https://i.pravatar.cc/100?img=12", role: "Hiring Manager · Linear",
    lastMessage: "Great chat today — next steps incoming.", time: "3h", unread: 0, online: false,
    thread: [{ fromMe: false, text: "Great chat today — next steps incoming.", time: "3h" }],
  },
  {
    id: "m3", from: "Ava Chen", avatar: "https://i.pravatar.cc/100?img=32", role: "Talent · Figma",
    lastMessage: "Sharing the take-home brief now.", time: "1d", unread: 1, online: true,
    thread: [{ fromMe: false, text: "Sharing the take-home brief now.", time: "1d" }],
  },
];

export const testimonials = [
  { name: "Aarav Patel", role: "Frontend Engineer @ Stripe", quote: "CareerConnect matched me with a role that fit my stack perfectly. I got an offer in 3 weeks.", avatar: "https://i.pravatar.cc/100?img=15" },
  { name: "Lena Novak", role: "Product Designer @ Figma", quote: "The application timeline and recruiter messages kept me organized. It felt like a dashboard built for me.", avatar: "https://i.pravatar.cc/100?img=44" },
  { name: "Diego Martinez", role: "ML Engineer @ Netflix", quote: "Best-in-class filters. I found niche ML roles I'd have missed on any other platform.", avatar: "https://i.pravatar.cc/100?img=68" },
];

export const chartsData = {
  monthly: [
    { month: "Jan", applied: 4, interviews: 1 },
    { month: "Feb", applied: 6, interviews: 2 },
    { month: "Mar", applied: 8, interviews: 3 },
    { month: "Apr", applied: 5, interviews: 2 },
    { month: "May", applied: 12, interviews: 5 },
    { month: "Jun", applied: 9, interviews: 4 },
    { month: "Jul", applied: 14, interviews: 6 },
  ],
  status: [
    { name: "Applied", value: 12, color: "var(--chart-1)" },
    { name: "Reviewed", value: 8, color: "var(--chart-2)" },
    { name: "Interview", value: 5, color: "var(--chart-3)" },
    { name: "Offer", value: 2, color: "var(--chart-4)" },
    { name: "Rejected", value: 3, color: "var(--chart-5)" },
  ],
  recruiter: [
    { week: "W1", views: 220, applies: 18 },
    { week: "W2", views: 340, applies: 32 },
    { week: "W3", views: 410, applies: 41 },
    { week: "W4", views: 520, applies: 58 },
  ],
  admin: [
    { day: "Mon", users: 120, jobs: 24 },
    { day: "Tue", users: 180, jobs: 30 },
    { day: "Wed", users: 220, jobs: 42 },
    { day: "Thu", users: 260, jobs: 48 },
    { day: "Fri", users: 320, jobs: 55 },
    { day: "Sat", users: 210, jobs: 22 },
    { day: "Sun", users: 190, jobs: 18 },
  ],
};

export const currentUser = {
  id: "u-1",
  name: "Arjun Verma",
  email: "arjun.verma@example.com",
  role: "student" as "student" | "recruiter" | "admin",
  headline: "Final-year CS student · Frontend & full-stack developer",
  location: "Bengaluru, IN",
  avatar: "https://i.pravatar.cc/200?img=13",
  cover: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1400",
  profileCompletion: 82,
  about: "Final-year Computer Science student passionate about building elegant web products. Comfortable across the stack with a bias toward the frontend.",
  skills: ["React", "TypeScript", "Node.js", "TailwindCSS", "PostgreSQL", "GraphQL", "AWS", "Figma"],
  education: [
    { school: "IIT Bangalore", degree: "B.Tech, Computer Science", period: "2021 – 2025", gpa: "9.1 / 10" },
    { school: "Delhi Public School", degree: "Higher Secondary (PCM)", period: "2019 – 2021", gpa: "96%" },
  ],
  experience: [
    { company: "Vercel", role: "Frontend Intern", period: "May 2024 – Aug 2024", desc: "Shipped 3 dashboard features to the analytics product used by 40k+ teams." },
    { company: "Open source", role: "Contributor", period: "2022 – Present", desc: "Contributed to React, TanStack Query, and shadcn/ui." },
  ],
  projects: [
    { name: "Pulse", desc: "Realtime team dashboard built with React, WebSockets, and Postgres.", link: "#" },
    { name: "Ledger", desc: "Personal finance tracker with 4k+ GitHub stars.", link: "#" },
    { name: "Portfolio v3", desc: "SSR portfolio built on TanStack Start.", link: "#" },
  ],
  certifications: ["AWS Certified Cloud Practitioner", "Meta Frontend Developer", "Google UX Design"],
  achievements: ["Winner — Smart India Hackathon 2024", "Top 1% GitHub India 2023"],
  languages: ["English (Native)", "Hindi (Native)", "Spanish (B1)"],
  social: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://arjun.dev" },
};
