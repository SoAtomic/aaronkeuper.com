import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import aaronPhoto from "@/assets/aaron-keuper.jpeg";
import {
  education,
  impact,
  jobs,
  remoteSetup,
  skillGroups,
  summary,
  type SkillTaggedText,
} from "@/data/resume";
import { categorySlug, highlight, matchesSkill, slugForSkill } from "@/lib/skill-match";

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
          email: "mailto:keuper@duck.com",
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
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

const SECTION_H = "text-[2.25rem] font-extrabold leading-[1.08] text-foreground sm:text-[2.75rem]";

function taggedHit(item: SkillTaggedText, active: string | null) {
  return matchesSkill(item.text, active, item.skills);
}

function escapeSelectorValue(value: string) {
  return window.CSS?.escape ? CSS.escape(value) : value.replace(/["\\]/g, "\\$&");
}

function Home() {
  const [locked, setLocked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [suppressedHover, setSuppressedHover] = useState<string | null>(null);
  const active = hovered === suppressedHover ? locked : (hovered ?? locked);
  const catSlug = slugForSkill(active);

  const scrollToSkillList = useCallback((skill: string) => {
    requestAnimationFrame(() => {
      const selector = `[data-skill-pill="${escapeSelectorValue(skill)}"]`;
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const scrollToFirstSkillMark = useCallback((skill: string) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const selector = `[data-skill-mark="${escapeSelectorValue(skill)}"]`;
        const marks = [...document.querySelectorAll(selector)];
        const skillsBottom =
          (document.querySelector("#skills")?.getBoundingClientRect().bottom ?? 0) + window.scrollY;
        const target =
          marks.find((mark) => mark.getBoundingClientRect().top + window.scrollY > skillsBottom) ??
          marks[0];
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }, []);

  const selectSkill = useCallback(
    (skill: string) => {
      if (locked === skill) {
        setLocked(null);
        setHovered(null);
        setSuppressedHover(skill);
        return;
      }

      setSuppressedHover(null);
      setLocked(skill);
      scrollToFirstSkillMark(skill);
    },
    [locked, scrollToFirstSkillMark],
  );

  const clearSkill = useCallback(() => {
    setLocked(null);
    setHovered(null);
    setSuppressedHover(null);
  }, []);

  return (
    <div className={catSlug ? `min-h-screen cat-${catSlug}` : "min-h-screen"}>
      <a
        href="#resume"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-6 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <Nav />

      <main id="resume" className="print-single mx-auto w-full max-w-[1200px] px-5 pb-28 sm:px-8">
        <Hero />
        <div className="content-axis">
          <Profile active={active} onMarkClick={scrollToSkillList} />
          <Impact active={active} onMarkClick={scrollToSkillList} />
          <SkillBrowser
            active={active}
            locked={locked}
            onClear={clearSkill}
            onHover={setHovered}
            onSuppressHover={setSuppressedHover}
            suppressedHover={suppressedHover}
            onSelect={selectSkill}
          />
          <Experience active={active} onMarkClick={scrollToSkillList} />
          <Education />
        </div>
        <footer className="content-axis mt-24 border-t border-border pt-7 text-[0.95rem] leading-[1.6] text-muted-foreground">
          <p>
            Aaron Keuper · Santa Cruz, California · Remote U.S. ·{" "}
            <a className="prose-link" href="tel:+18312958035">
              (831) 295-8035
            </a>{" "}
            ·{" "}
            <a className="prose-link" href="mailto:keuper@duck.com">
              keuper@duck.com
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav
      aria-label="Sections"
      className="no-print sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-end px-5 py-4 sm:px-8 sm:py-[18px]">
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[0.98rem] font-medium text-foreground sm:gap-x-7">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="print-block pt-12 sm:pt-18">
      <div className="hero-layout">
        <img
          src={aaronPhoto}
          alt="Aaron Keuper"
          width="136"
          height="136"
          className="h-[136px] w-[136px] rounded-full object-cover"
        />
        <div className="max-w-[940px]">
          <h1 className="text-[3rem] font-extrabold leading-[1.02] text-foreground sm:text-[4rem]">
            Aaron Keuper
          </h1>
          <p className="mt-4 text-[1.35rem] font-bold leading-[1.3] text-foreground sm:text-[1.7rem]">
            Senior Systems Administrator
          </p>
          <p className="mt-5 max-w-[860px] text-[1.08rem] leading-[1.6] text-foreground sm:text-[1.22rem]">
            Microsoft 365 · Entra ID · Intune · Active Directory · Endpoint &amp; Infrastructure
            Operations
          </p>
          <p className="mt-3 text-[1rem] leading-[1.6] text-muted-foreground">
            Santa Cruz, California · Remote U.S.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[1rem]">
            <li>
              <a className="prose-link" href="tel:+18312958035">
                (831) 295-8035
              </a>
            </li>
            <li>
              <a className="prose-link" href="mailto:keuper@duck.com">
                keuper@duck.com
              </a>
            </li>
            <li className="no-print">
              <a className="prose-link" href="/aaron-keuper-resume.pdf" download>
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Profile({
  active,
  onMarkClick,
}: {
  active: string | null;
  onMarkClick: (skill: string) => void;
}) {
  return (
    <section id="profile" className="print-block mt-16 scroll-mt-20 sm:mt-20">
      <h2 className={`${SECTION_H}`}>Profile</h2>
      <p className="serif-prose mt-7 max-w-[760px]">
        {highlight(summary, active, undefined, onMarkClick)}
      </p>
    </section>
  );
}

function Impact({
  active,
  onMarkClick,
}: {
  active: string | null;
  onMarkClick: (skill: string) => void;
}) {
  return (
    <section id="impact" className="mt-20 scroll-mt-20 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Selected Impact</h2>
      <div className="mt-10 grid max-w-[980px] gap-x-20 gap-y-12 md:grid-cols-2">
        {impact.map((item) => (
          <article key={item.figure} className="print-block max-w-[38ch]">
            <p className="text-[3.25rem] font-extrabold leading-none text-foreground sm:text-[3.75rem]">
              {item.figure}
            </p>
            <p className="mt-5 text-[1.08rem] leading-[1.6] text-foreground">
              {highlight(item.text, active, item.skills, onMarkClick)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillBrowser({
  active,
  locked,
  onClear,
  onHover,
  onSuppressHover,
  onSelect,
  suppressedHover,
}: {
  active: string | null;
  locked: string | null;
  onClear: () => void;
  onHover: (s: string | null) => void;
  onSuppressHover: (s: string | null) => void;
  onSelect: (s: string) => void;
  suppressedHover: string | null;
}) {
  return (
    <section id="skills" className="print-block mt-20 scroll-mt-20 sm:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-5">
        <div>
          <h2 className={`${SECTION_H}`}>Technical Skills</h2>
          <p className="mt-4 max-w-[620px] text-[1rem] leading-[1.6] text-muted-foreground">
            Hover or select a skill to see where it appears in my experience.
          </p>
        </div>
        {locked ? (
          <button type="button" className="no-print prose-link text-[0.95rem]" onClick={onClear}>
            Clear selection
          </button>
        ) : null}
      </div>

      <div className="mt-10 grid max-w-[1040px] gap-x-16 gap-y-9 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className={`cat-${categorySlug(group.title)}`}>
            <h3 className="text-[1.08rem] font-extrabold leading-[1.3] text-foreground">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const isActive = active === skill;
                const isLocked = locked === skill;
                return (
                  <li key={skill}>
                    <button
                      type="button"
                      aria-pressed={isLocked}
                      onMouseEnter={() => {
                        if (suppressedHover !== skill) onHover(skill);
                      }}
                      onMouseLeave={() => {
                        onHover(null);
                        if (suppressedHover === skill) onSuppressHover(null);
                      }}
                      onFocus={() => {
                        if (suppressedHover !== skill) onHover(skill);
                      }}
                      onBlur={() => {
                        onHover(null);
                        if (suppressedHover === skill) onSuppressHover(null);
                      }}
                      onClick={() => onSelect(skill)}
                      data-state={isLocked ? "locked" : isActive ? "active" : undefined}
                      data-hover-suppressed={suppressedHover === skill ? "true" : undefined}
                      data-skill-pill={skill}
                      className="pill px-3 py-[6px] text-[0.92rem] leading-[1.35]"
                    >
                      {skill}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({
  active,
  onMarkClick,
}: {
  active: string | null;
  onMarkClick: (skill: string) => void;
}) {
  return (
    <section id="experience" className="mt-20 scroll-mt-20 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Professional Experience</h2>
      <div className="mt-12 max-w-[860px] space-y-20">
        {jobs.map((job) => {
          const environmentHit =
            job.environment && matchesSkill(job.environment, active, job.environmentSkills);
          const jobHit =
            matchesSkill(job.title, active) ||
            matchesSkill(job.org, active) ||
            Boolean(environmentHit) ||
            job.bullets.some((b) => taggedHit(b, active));

          return (
            <article
              key={job.org + job.dates}
              data-skill-hit={active && jobHit ? "true" : undefined}
              className="print-block"
            >
              <header className="print-keep">
                <h3 className="text-[1.6rem] font-extrabold leading-[1.14] text-foreground sm:text-[1.95rem]">
                  {job.title}
                </h3>
                <p className="mt-3 text-[1.08rem] font-bold text-foreground">
                  {job.org}
                  {job.location ? (
                    <span className="font-normal text-muted-foreground"> · {job.location}</span>
                  ) : null}
                </p>
                <p className="mt-1 text-[0.98rem] leading-[1.5] text-muted-foreground">
                  {job.dates}
                </p>
                {job.environment ? (
                  <p className="serif-prose mt-5">
                    {highlight(job.environment, active, job.environmentSkills, onMarkClick)}
                  </p>
                ) : null}
              </header>

              <ul className="serif-prose mt-7 list-disc space-y-4 pl-6 marker:text-muted-foreground">
                {job.bullets.map((bullet) => (
                  <li key={bullet.text}>
                    {highlight(bullet.text, active, bullet.skills, onMarkClick)}
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
    <section id="education" className="mt-20 scroll-mt-20 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Education &amp; Professional Development</h2>
      <div className="mt-10 max-w-[760px] space-y-8">
        {education.map((e) => (
          <article key={e.school} className="print-block">
            <h3 className="text-[1.25rem] font-extrabold leading-[1.2] text-foreground">
              {e.school}
            </h3>
            <p className="mt-2 text-[1.05rem] leading-[1.6] text-foreground">{e.detail}</p>
            {e.note ? <p className="serif-prose mt-2 text-muted-foreground">{e.note}</p> : null}
          </article>
        ))}
      </div>

      <h2 className="mt-16 text-[1.55rem] font-extrabold leading-[1.15] text-foreground">
        Remote Work
      </h2>
      <p className="mt-5 max-w-[760px] text-[1.05rem] leading-[1.65] text-foreground">
        {remoteSetup.join(" · ")}
      </p>
    </section>
  );
}
