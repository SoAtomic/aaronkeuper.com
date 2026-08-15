import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  education,
  impact,
  jobs,
  remoteSetup,
  skillGroups,
  summary,
} from "@/data/resume";
import { highlight, matchesSkill } from "@/lib/skill-match";

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

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}

function Reveal({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "-40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Home() {
  const progress = useReadingProgress();
  const [locked, setLocked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? locked;

  const toggle = useCallback((skill: string) => {
    setLocked((cur) => (cur === skill ? null : skill));
  }, []);

  const print = () => window.print();

  return (
    <>
      <div
        className="no-print fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <a
        href="#resume"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to résumé
      </a>

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="lg:flex lg:gap-16">
          {/* Left column */}
          <aside className="print-single pt-12 lg:sticky lg:top-0 lg:h-screen lg:w-[30%] lg:shrink-0 lg:overflow-y-auto lg:pb-12">
            <Identity onPrint={print} />
            <SkillBrowser
              active={active}
              locked={locked}
              onHover={setHovered}
              onToggle={toggle}
            />
          </aside>

          {/* Right column */}
          <main
            id="resume"
            className="print-single min-w-0 flex-1 pb-28 pt-10 lg:pt-20"
          >
            <Nav />
            <Masthead />
            <Profile active={active} />
            <Impact active={active} />
            <Experience active={active} />
            <Education />
            <footer className="mt-20 border-t pt-6 text-[0.95rem] text-muted-foreground">
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
    </>
  );
}

function Identity({ onPrint }: { onPrint: () => void }) {
  return (
    <section id="profile-card" className="print-block">
      <div
        className="flex h-[160px] w-[160px] items-center justify-center rounded-full border border-border bg-secondary text-[3.25rem] font-extrabold tracking-tight text-primary"
        role="img"
        aria-label="Portrait placeholder for Aaron Keuper"
      >
        AK
      </div>
      <h1 className="mt-7 text-[2rem] font-extrabold leading-[1.1] tracking-tight">
        Aaron Keuper
      </h1>
      <p className="mt-2 text-lg font-semibold text-primary">
        Senior Systems Administrator
      </p>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
        Santa Cruz, California
        <br />
        Remote U.S.
      </p>
      <ul className="mt-5 space-y-2 text-[1.0625rem]">
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
      <p className="mt-5 border-l-2 border-primary pl-4 text-[1rem] leading-relaxed text-muted-foreground">
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
    <section id="skills" className="mt-12 print-block">
      <div className="flex items-baseline justify-between gap-4 border-t pt-6">
        <h2 className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-primary">
          Technical Skills
        </h2>
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
      <p className="no-print mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        Hover, focus, or tap a skill to highlight where it shows up in the
        résumé. Nothing is ever hidden.
      </p>

      {skillGroups.map((group) => (
        <div key={group.title} className="mt-7">
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
                    className={[
                      "rounded-full border px-2.5 py-1 text-[0.85rem] leading-snug transition-colors duration-150",
                      isLocked
                        ? "border-primary bg-primary text-primary-foreground font-semibold"
                        : isActive
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-border bg-secondary text-muted-foreground hover:border-primary hover:text-foreground",
                    ].join(" ")}
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
      className="no-print mb-14 flex flex-wrap gap-x-6 gap-y-2 border-b pb-4 text-[0.9rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
    >
      {NAV.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="transition-colors hover:text-primary"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function Masthead() {
  return (
    <header className="print-block">
      <h2 className="hidden text-3xl font-extrabold print:block">
        Aaron Keuper
      </h2>
      <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-primary">
        Senior Systems Administrator
      </p>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
        Microsoft 365 · Entra ID · Intune · Active Directory · Endpoint &
        Infrastructure Operations
      </p>
    </header>
  );
}

function SectionHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2
      id={id}
      className="mb-8 scroll-mt-10 border-t pt-6 text-[2rem] font-extrabold leading-tight tracking-tight"
    >
      {children}
    </h2>
  );
}

function Profile({ active }: { active: string | null }) {
  const hit = matchesSkill(summary, active);
  return (
    <section className="mt-14 max-w-[68ch]">
      <SectionHeading id="profile">Profile</SectionHeading>
      <p
        className={[
          "text-[1.1875rem] leading-[1.65] transition-opacity duration-200",
          active ? (hit ? "resume-hit border-l-2 border-primary pl-5" : "resume-dim") : "",
        ].join(" ")}
      >
        {highlight(summary, active)}
      </p>
    </section>
  );
}

function Impact({ active }: { active: string | null }) {
  return (
    <section className="mt-20">
      <SectionHeading id="impact">Selected Impact</SectionHeading>
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {impact.map((item) => {
          const hit = matchesSkill(item.text, active);
          return (
            <Reveal
              key={item.figure}
              as="article"
              className={[
                "print-block max-w-[38ch] transition-opacity duration-200",
                active
                  ? hit
                    ? "resume-hit border-l-2 border-primary pl-5"
                    : "resume-dim"
                  : "",
              ].join(" ")}
            >
              <p className="text-[2.75rem] font-extrabold leading-none tracking-tight">
                {item.figure}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-[1.6] text-muted-foreground">
                {highlight(item.text, active)}
              </p>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-10 max-w-[62ch] text-[1.0625rem] leading-[1.65] text-muted-foreground">
        Production environments have ranged from approximately 75 staff plus 400
        conference guests through a 2,000-user regulated healthcare campus.
      </p>
    </section>
  );
}

function Experience({ active }: { active: string | null }) {
  return (
    <section className="mt-20">
      <SectionHeading id="experience">Professional Experience</SectionHeading>
      <div className="border-l border-border pl-6 sm:pl-8">
        {jobs.map((job) => {
          const jobHit =
            matchesSkill(job.title, active) ||
            matchesSkill(job.org, active) ||
            matchesSkill(job.environment ?? "", active) ||
            job.bullets.some((b) => matchesSkill(b, active));
          return (
            <Reveal
              key={job.org + job.dates}
              as="article"
              className={[
                "print-block relative mt-14 first:mt-0 transition-opacity duration-200",
                active ? (jobHit ? "resume-hit" : "resume-dim") : "",
              ].join(" ")}
            >
              {jobHit && active ? (
                <span
                  aria-hidden="true"
                  className="absolute -left-6 top-1 h-full w-[2px] bg-primary sm:-left-8"
                />
              ) : null}
              <header className="print-keep max-w-[62ch]">
                <h3 className="text-[1.5rem] font-extrabold leading-snug tracking-tight">
                  {job.title}
                </h3>
                <p className="mt-1.5 text-[1.05rem] font-semibold">
                  {job.org}
                  {job.location ? (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {job.location}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-[0.95rem] uppercase tracking-[0.08em] text-muted-foreground">
                  {job.dates}
                </p>
                {job.environment ? (
                  <p className="mt-4 text-[1.0625rem] leading-[1.6] text-muted-foreground">
                    {highlight(job.environment, active)}
                  </p>
                ) : null}
              </header>
              <ul className="mt-6 space-y-5">
                {job.bullets.map((bullet, i) => {
                  const hit = matchesSkill(bullet, active);
                  return (
                    <li
                      key={i}
                      className={[
                        "max-w-[68ch] text-[1.0625rem] leading-[1.65] transition-opacity duration-200",
                        active
                          ? hit
                            ? "resume-hit border-l-2 border-primary pl-4"
                            : "resume-dim pl-4"
                          : "pl-4",
                        "relative before:absolute before:-left-0 before:content-['']",
                      ].join(" ")}
                    >
                      {highlight(bullet, active)}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mt-20">
      <SectionHeading id="education">
        Education & Professional Development
      </SectionHeading>
      <div className="space-y-8">
        {education.map((e) => (
          <article key={e.school} className="print-block max-w-[62ch]">
            <h3 className="text-[1.25rem] font-bold">{e.school}</h3>
            <p className="mt-1 text-[1.0625rem]">{e.detail}</p>
            {e.note ? (
              <p className="mt-2 text-[1.0625rem] leading-[1.6] text-muted-foreground">
                {e.note}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <h3 className="mt-14 text-[1.25rem] font-bold">Remote Work Setup</h3>
      <ul className="mt-4 space-y-2 text-[1.0625rem] leading-[1.6] text-muted-foreground">
        {remoteSetup.map((r) => (
          <li key={r} className="border-l-2 border-border pl-4">
            {r}
          </li>
        ))}
      </ul>
    </section>
  );
}
