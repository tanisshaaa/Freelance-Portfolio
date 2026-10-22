export const SITE = {
  brand: "TANISHA",
  person: "Tanisha Sinha",
  role: "AI/ML Engineer & Team Leader",
  tagline: "LLMs, RAG & AI Agents | Open to freelance AI projects",
  email: "tanishaasinha02@gmail.com",
  location: "Bengaluru, India | Remote",
  availability: "Open for AI, web, and app projects",
  github: "https://github.com/tanisshaaa",
  linkedin: "https://www.linkedin.com/in/tanishasinhaa",
  portfolio: "https://tanisshaaa.github.io/Portfolio/",
  socials: [
    { label: "GitHub", href: "https://github.com/tanisshaaa" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tanishasinhaa" },
    { label: "Career site", href: "https://tanisshaaa.github.io/Portfolio/" },
  ],
} as const;

export function mailto(subject?: string) {
  const base = `mailto:${SITE.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export function unsplash(id: string, w = 1400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}
