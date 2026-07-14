// Central API service. Currently returns dummy data with a simulated delay.
// Replace `mock()` calls with real axios calls to your MERN backend when ready:
//   e.g. return api.get<Job[]>("/jobs").then((r) => r.data);
import axios from "axios";
import {
  jobs, companies, applications, notifications, messages, currentUser, savedJobIds,
  type Job, type Company, type Application, type Notification, type Message,
} from "@/lib/mockData";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";
export const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

const delay = <T,>(data: T, ms = 250): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), ms));

export const JobsAPI = {
  list: (params?: { q?: string; category?: string; type?: string; location?: string }) => {
    let out = [...jobs];
    if (params?.q) {
      const q = params.q.toLowerCase();
      out = out.filter((j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (params?.category && params.category !== "All") out = out.filter((j) => j.category === params.category);
    if (params?.type && params.type !== "All") out = out.filter((j) => j.type === params.type);
    if (params?.location && params.location !== "All") out = out.filter((j) => j.location.includes(params.location!));
    return delay(out);
  },
  get: (id: string) => delay<Job | undefined>(jobs.find((j) => j.id === id)),
  featured: () => delay(jobs.filter((j) => j.featured)),
  recommended: () => delay(jobs.slice(0, 6)),
  apply: (_id: string) => delay({ ok: true }, 400),
};

export const CompaniesAPI = {
  list: (q?: string) => {
    const out = q ? companies.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())) : companies;
    return delay(out);
  },
  get: (id: string) => delay<Company | undefined>(companies.find((c) => c.id === id)),
  trending: () => delay(companies.slice(0, 8)),
};

export const ApplicationsAPI = {
  mine: () => delay(applications),
  saved: () => delay(jobs.filter((j) => savedJobIds.includes(j.id))),
};

export const NotificationsAPI = {
  list: () => delay(notifications),
  markRead: (_id: string) => delay({ ok: true }, 150),
};

export const MessagesAPI = {
  list: () => delay(messages),
  get: (id: string) => delay<Message | undefined>(messages.find((m) => m.id === id)),
  send: (_id: string, _text: string) => delay({ ok: true }, 200),
};

export const AuthAPI = {
  login: (email: string, _password: string) => delay({ ...currentUser, email }, 500),
  register: (name: string, email: string, _password: string) =>
    delay({ ...currentUser, name, email }, 600),
  forgot: (_email: string) => delay({ ok: true }, 400),
  reset: (_token: string, _password: string) => delay({ ok: true }, 400),
  verify: (_code: string) => delay({ ok: true }, 400),
};
