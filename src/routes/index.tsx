import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  education,
  impact,
  jobs,
  remoteSetup,
  skillGroups,
  summary,
} from "@/data/resume";
import {
  categorySlug,
  highlight,
  matchesSkill,
  slugForSkill,
} from "@/lib/skill-match";

const TITLE = "Aaron Keuper — Senior Systems Administrator";
const DESCRIPTION =
  "Senior Systems Administrator with 20+ years supporting Microsoft 365, Entra ID, Intune, Active Directory, endpoint fleets, enterprise infrastructure, networking, security, and business-critical IT operations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aaron Keuper",
          jobTitle: "Senior Systems Administrator",
          description: DESCRIPTION,
          email: "mailto:aaron@aaronkeuper.com",
          url: "https://aaronkeuper.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Santa Cruz",
            addressRegion: "CA",
            addressCountry: "US",
          },
          knowsAbout: skillGroups.flatMap((g) => g.skills),
          alumniOf: education.map((e) => ({
            "@type": "EducationalOrganization",
            name: e.school,
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { id: "profile", label: "Profile" },
  { id: "impact", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

/* Shared type scale */
const PROSE = "max-w-[46ch] sm:max-w-[64ch] text-[1.0625rem] sm:text-[1.1875rem] leading-[1.6]";
const SECTION_H = "text-[2rem] sm:text-[2.35rem] font-extrabold leading-[1.12]";

function Home() {
  const [locked, setLocked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? locked;

  const scrollToFirstHit = useCallback((skill: string) => {
    requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const firstMark = main.querySelector(".skill-mark");
      if (firstMark) {
        firstMark.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const toggle = useCallback(
    (skill: string) => {
      setLocked((cur) => {
        const next = cur === skill ? null : skill;
        if (next) scrollToFirstHit(next);
        return next;
      });
    },
    [scrollToFirstHit],
  );

  const print = () => window.print();
  const catSlug = slugForSkill(active);

  return (
    <div className={catSlug ? `cat-${catSlug}` : undefined}>
      <a
        href="#resume"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-24 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to résumé
      </a>

      <Nav />
      <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 pt-20">
        <div className="lg:flex lg:gap-20">
          <aside className="print-single pt-14 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-[290px] lg:shrink-0 lg:overflow-y-auto lg:py-16">
            <Identity onPrint={print} />
            <div className="mt-16 lg:hidden">
              <ProfileProse active={active} />
            </div>
            <SkillBrowser
              active={active}
              locked={locked}
              onHover={setHovered}
              onToggle={toggle}
            />
          </aside>

          <main
            id="resume"
            className="print-single min-w-0 flex-1 pb-32"
          >
            <div className="hidden lg:block">
              <Profile active={active} />
            </div>
            <Impact active={active} />
            <Experience active={active} />
            <Education />
            <footer className="mt-28 border-t border-border pt-8 text-[0.95rem] text-muted-foreground">
              <p>
                Aaron Keuper · Santa Cruz, California · Remote U.S. ·{" "}
                <a className="prose-link" href="mailto:aaron@aaronkeuper.com">
                  aaron@aaronkeuper.com
                </a>
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

function Identity({ onPrint }: { onPrint: () => void }) {
  return (
    <section className="print-block">
      <div
        className="flex h-[128px] w-[128px] items-center justify-center rounded-full bg-paper text-[2.5rem] font-extrabold tracking-tight text-foreground"
        role="img"
        aria-label="Portrait placeholder for Aaron Keuper"
      >
        AK
      </div>
      <h1 className="mt-8 text-[2.15rem] font-extrabold leading-[1.05]">
        Aaron Keuper
      </h1>
      <p className="eyebrow mt-4 text-muted-foreground">
        Senior Systems Administrator
      </p>
      <p className="mt-5 text-[1rem] leading-[1.6] text-muted-foreground">
        Santa Cruz, California
        <br />
        Remote U.S.
      </p>
      <ul className="mt-5 space-y-2 text-[1rem]">
        <li>
          <a className="prose-link" href="mailto:aaron@aaronkeuper.com">
            aaron@aaronkeuper.com
          </a>
        </li>
        <li className="no-print">
          <button className="prose-link" type="button" onClick={onPrint}>
            Download Résumé
          </button>
        </li>
        <li className="no-print">
          <button className="prose-link" type="button" onClick={onPrint}>
            Print / Save as PDF
          </button>
        </li>
      </ul>
      <p className="mt-6 text-[1rem] leading-[1.6] text-muted-foreground">
        Open to remote U.S. Senior Systems Administration opportunities.
      </p>
    </section>
  );
}

function SkillBrowser({
  active,
  locked,
  onHover,
  onToggle,
}: {
  active: string | null;
  locked: string | null;
  onHover: (s: string | null) => void;
  onToggle: (s: string) => void;
}) {
  return (
    <section id="skills" className="print-block mt-16 scroll-mt-12">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="eyebrow text-muted-foreground">Technical Skills</h2>
        {locked ? (
          <button
            type="button"
            className="no-print prose-link text-[0.9rem]"
            onClick={() => onToggle(locked)}
          >
            Clear
          </button>
        ) : null}
      </div>
      <p className="no-print mt-3 text-[0.95rem] leading-[1.55] text-muted-foreground">
        Hover, focus, or tap a skill to mark where it appears in the résumé.
        Nothing is hidden.
      </p>

      {skillGroups.map((group) => (
        <div
          key={group.title}
          className={`mt-8 cat-${categorySlug(group.title)}`}
        >
          <h3 className="text-[0.95rem] font-bold">{group.title}</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {group.skills.map((skill) => {
              const isActive = active === skill;
              const isLocked = locked === skill;
              return (
                <li key={skill}>
                  <button
                    type="button"
                    aria-pressed={isLocked}
                    onMouseEnter={() => onHover(skill)}
                    onMouseLeave={() => onHover(null)}
                    onFocus={() => onHover(skill)}
                    onBlur={() => onHover(null)}
                    onClick={() => onToggle(skill)}
                    data-state={
                      isLocked ? "locked" : isActive ? "active" : undefined
                    }
                    className="pill px-2.5 py-[3px] text-[0.85rem] leading-[1.45]"
                  >
                    {skill}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Nav() {
  return (
    <nav
      aria-label="Sections"
      className="no-print fixed left-0 right-0 top-0 z-50 border-b border-border bg-background"
    >
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 sm:px-10 text-base font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function ProfileProse({ active }: { active: string | null }) {
  const hit = matchesSkill(summary, active);
  return (
    <>
      <h2 id="profile" className={`${SECTION_H} scroll-mt-12`}>
        Profile
      </h2>
      <p
        className={`mt-7 ${PROSE} ${active ? (hit ? "resume-hit" : "resume-dim") : ""}`}
      >
        {highlight(summary, active)}
      </p>
    </>
  );
}

function Profile({ active }: { active: string | null }) {
  return (
    <section className="print-block">
      <ProfileProse active={active} />
    </section>
  );
}

function Impact({ active }: { active: string | null }) {
  return (
    <section className="mt-28">
      <h2 id="impact" className={`${SECTION_H} scroll-mt-12`}>
        Selected Impact
      </h2>
      <div className="mt-10 grid gap-x-16 gap-y-12 sm:grid-cols-2">
        {impact.map((item) => {
          const hit = matchesSkill(item.text, active);
          return (
            <article
              key={item.figure}
              className={`print-block max-w-[38ch] ${
                active ? (hit ? "resume-hit" : "resume-dim") : ""
              }`}
            >
              <p className="text-[3rem] font-extrabold leading-none tracking-[-0.03em]">
                {item.figure}
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.6]">
                {highlight(item.text, active)}
              </p>
            </article>
          );
        })}
      </div>
      <p className="mt-14 max-w-[62ch] text-[1.0625rem] leading-[1.6] text-muted-foreground">
        Production environments have ranged from approximately 75 staff plus 400
        conference guests through a 2,000-user regulated healthcare campus.
      </p>
    </section>
  );
}

function Experience({ active }: { active: string | null }) {
  return (
    <section className="mt-28">
      <h2 id="experience" className={`${SECTION_H} scroll-mt-12`}>
        Professional Experience
      </h2>
      <div className="mt-12 space-y-20">
        {jobs.map((job) => {
          const jobHit =
            matchesSkill(job.title, active) ||
            matchesSkill(job.org, active) ||
            matchesSkill(job.environment ?? "", active) ||
            job.bullets.some((b) => matchesSkill(b, active));
          return (
            <article
              key={job.org + job.dates}
              className={`print-block ${
                active ? (jobHit ? "resume-hit" : "resume-dim") : ""
              }`}
            >
              <header className="print-keep max-w-[62ch]">
                <p className="eyebrow text-muted-foreground">{job.dates}</p>
                <h3 className="mt-3 text-[1.55rem] sm:text-[1.7rem] font-extrabold leading-[1.15]">
                  {job.title}
                </h3>
                <p className="mt-2 text-[1.0625rem] font-semibold">
                  {job.org}
                  {job.location ? (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {job.location}
                    </span>
                  ) : null}
                </p>
                {job.environment ? (
                  <p className="mt-5 text-[1.0625rem] leading-[1.6] text-muted-foreground">
                    {highlight(job.environment, active)}
                  </p>
                ) : null}
              </header>
              <ul className="mt-7 space-y-4">
                {job.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="relative max-w-[46ch] pl-6 text-[1.0625rem] leading-[1.6] sm:max-w-[68ch] sm:text-[1.125rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 text-muted-foreground"
                    >
                      —
                    </span>
                    {highlight(bullet, active)}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mt-28">
      <h2 id="education" className={`${SECTION_H} scroll-mt-12`}>
        Education &amp; Professional Development
      </h2>
      <div className="mt-10 space-y-10">
        {education.map((e) => (
          <article key={e.school} className="print-block max-w-[62ch]">
            <h3 className="text-[1.3rem] font-bold">{e.school}</h3>
            <p className="mt-2 text-[1.0625rem]">{e.detail}</p>
            {e.note ? (
              <p className="mt-2 text-[1.0625rem] leading-[1.6] text-muted-foreground">
                {e.note}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <h3 className="mt-16 text-[1.3rem] font-bold">Remote Work Setup</h3>
      <ul className="mt-5 max-w-[62ch] space-y-2 text-[1.0625rem] leading-[1.6] text-muted-foreground">
        {remoteSetup.map((r) => (
          <li key={r} className="relative pl-6">
            <span aria-hidden="true" className="absolute left-0 top-0">
              —
            </span>
            {r}
          </li>
        ))}
      </ul>
    </section>
  );
}
