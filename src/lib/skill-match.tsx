import type { ReactNode } from "react";
import { skillAliases, skillGroups } from "@/data/resume";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function termsForSkill(skill: string): string[] {
  const terms = new Set<string>([skill, ...(skillAliases[skill] ?? [])]);
  return [...terms].filter(Boolean).sort((a, b) => b.length - a.length);
}

function buildRegex(skill: string): RegExp {
  const terms = termsForSkill(skill).map(escapeRe);
  return new RegExp(`(${terms.join("|")})`, "gi");
}

const cache = new Map<string, RegExp>();
function regexFor(skill: string): RegExp {
  let re = cache.get(skill);
  if (!re) {
    re = buildRegex(skill);
    cache.set(skill, re);
  }
  re.lastIndex = 0;
  return re;
}

export function matchesSkill(text: string, skill: string | null): boolean {
  if (!skill) return false;
  const re = regexFor(skill);
  return re.test(text);
}

/** Renders text with the active skill's matching phrases marked. */
export function highlight(text: string, skill: string | null): ReactNode {
  if (!skill) return text;
  const re = regexFor(skill);
  const parts = text.split(re);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="skill-mark">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const CATEGORY_SLUGS: Record<string, string> = {
  "Microsoft 365 & Identity": "identity",
  "Endpoint & Device Management": "endpoint",
  "Infrastructure & Monitoring": "infrastructure",
  "Security & IT Operations": "security",
  "Business Systems & Delivery": "business",
};

export function categorySlug(groupTitle: string): string {
  return CATEGORY_SLUGS[groupTitle] ?? "identity";
}

const skillToSlug = new Map<string, string>();
for (const group of skillGroups) {
  for (const s of group.skills) {
    if (!skillToSlug.has(s)) skillToSlug.set(s, categorySlug(group.title));
  }
}

export function slugForSkill(skill: string | null): string | null {
  return skill ? (skillToSlug.get(skill) ?? null) : null;
}
