import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import aaronPhoto from "@/assets/aaron-keuper.jpeg";
import {
  careerPath,
  education,
  impact,
  jobs,
  recruitingExperience,
  remoteSetup,
  rolesUnderstood,
  skillGroups,
  summary,
  type ExperienceItem,
  type SkillTaggedText,
} from "@/data/resume";
import { categorySlug, highlight, matchesSkill, slugForSkill } from "@/lib/skill-match";

const TITLE = "Aaron Keuper | Technical Sourcer & Recruiter";
const DESCRIPTION =
  "Technical sourcer and recruiting professional returning to talent acquisition with prior agency sourcing experience and more than a decade of hands-on enterprise IT domain expertise. Based in Santa Cruz, California and pursuing remote U.S. opportunities.";

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
          jobTitle: "Technical Sourcer / Recruiter",
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
  { id: "about", label: "About" },
  { id: "recruiting", label: "Recruiting" },
  { id: "technical-context", label: "Technical Context" },
  { id: "experience", label: "Experience" },
  { id: "resume-contact", label: "Resume" },
  { id: "resume-contact", label: "Contact" },
];

const SECTION_H = "text-[2.15rem] font-extrabold leading-[1.08] text-foreground sm:text-[2.65rem]";
const TECH_RESUME_PATH = "/aaron-keuper-resume.pdf";

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
          (document.querySelector("#technical-context")?.getBoundingClientRect().bottom ?? 0) +
          window.scrollY;
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
        href="#about"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-6 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <Nav />

      <main className="print-single mx-auto w-full max-w-[1200px] px-5 pb-28 sm:px-8">
        <Hero />
        <div className="content-axis">
          <About active={active} onMarkClick={scrollToSkillList} />
          <RecruitingExperience />
          <TechnicalDomains
            active={active}
            locked={locked}
            onClear={clearSkill}
            onHover={setHovered}
            onSuppressHover={setSuppressedHover}
            suppressedHover={suppressedHover}
            onSelect={selectSkill}
          />
          <RolesUnderstood />
          <TechnicalCareerHighlights active={active} onMarkClick={scrollToSkillList} />
          <EnterpriseExperience active={active} onMarkClick={scrollToSkillList} />
          <Education />
          <ResumeContact />
        </div>
        <footer className="content-axis mt-20 border-t border-border pt-7 text-[0.98rem] leading-[1.6] text-muted-foreground">
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
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-3 py-4 sm:justify-end sm:px-8 sm:py-[18px]">
        <div className="flex w-full max-w-[430px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.86rem] font-semibold leading-none text-foreground sm:w-auto sm:max-w-none sm:justify-end sm:gap-x-7 sm:text-[1rem]">
          {NAV.map((item) => (
            <a key={item.label} href={`#${item.id}`} className="nav-link">
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
          className="h-[136px] w-[136px] rounded-full border-2 border-[#3b4252] object-cover"
        />
        <div className="max-w-[920px]">
          <h1 className="text-[3rem] font-extrabold leading-[1.02] text-foreground sm:text-[4rem]">
            Aaron Keuper
          </h1>
          <p className="mt-4 text-[1.38rem] font-bold leading-[1.28] text-foreground sm:text-[1.78rem]">
            Technical Sourcer / Recruiter
          </p>
          <p className="mt-2 text-[1.12rem] font-semibold leading-[1.45] text-foreground sm:text-[1.24rem]">
            Enterprise IT Domain Expertise
          </p>
          <p className="mt-5 max-w-[790px] text-[1.06rem] leading-[1.62] text-foreground sm:text-[1.18rem]">
            Former agency technical sourcer returning to recruiting after more than a decade in
            hands-on enterprise technology operations.
          </p>
          <p className="mt-3 text-[1rem] leading-[1.6] text-muted-foreground">
            Santa Cruz, California · Remote U.S.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[1rem]">
            <button
              type="button"
              className="resume-link resume-link-primary"
              aria-disabled="true"
              title="Technical recruiting resume PDF can be connected when the file is added."
            >
              Technical Recruiting Resume
              <span className="resume-link-note">PDF pending</span>
            </button>
            <a className="prose-link" href={TECH_RESUME_PATH} download>
              Senior Systems Administrator Resume
            </a>
            <a className="prose-link" href="mailto:keuper@duck.com">
              Email Aaron
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({
  active,
  onMarkClick,
}: {
  active: string | null;
  onMarkClick: (skill: string) => void;
}) {
  return (
    <section id="about" className="print-block mt-16 scroll-mt-24 sm:mt-20">
      <h2 className={`${SECTION_H}`}>About</h2>
      <p className="serif-prose mt-7 max-w-[790px]">
        {highlight(summary, active, undefined, onMarkClick)}
      </p>
      <CareerPath />
    </section>
  );
}

function CareerPath() {
  return (
    <ol className="career-path mt-9 max-w-[880px]" aria-label="Career path">
      {careerPath.map((item) => (
        <li key={item.title} className="career-path-item">
          <p className="text-[1.08rem] font-extrabold leading-[1.25] text-foreground">
            {item.title}
          </p>
          <p className="mt-1 text-[0.95rem] font-semibold leading-[1.35] text-muted-foreground">
            {item.dates}
          </p>
          <p className="mt-3 text-[0.98rem] leading-[1.45] text-foreground">{item.label}</p>
        </li>
      ))}
    </ol>
  );
}

function RecruitingExperience() {
  return (
    <section id="recruiting" className="mt-20 scroll-mt-24 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Recruiting &amp; Sourcing Experience</h2>
      <div className="mt-10 max-w-[860px] space-y-12">
        {recruitingExperience.map((item) => (
          <ExperienceArticle key={item.org + item.dates} item={item} />
        ))}
      </div>
    </section>
  );
}

function ExperienceArticle({ item }: { item: ExperienceItem }) {
  return (
    <article className="print-block">
      <header className="print-keep">
        <h3 className="text-[1.42rem] font-extrabold leading-[1.18] text-foreground sm:text-[1.7rem]">
          {item.title}
        </h3>
        <p className="mt-3 text-[1.06rem] font-bold text-foreground">
          {item.org}
          {item.location ? (
            <span className="font-normal text-muted-foreground"> · {item.location}</span>
          ) : null}
        </p>
        <p className="mt-1 text-[0.98rem] leading-[1.5] text-muted-foreground">{item.dates}</p>
      </header>
      <ul className="serif-prose mt-6 list-disc space-y-3 pl-6 marker:text-muted-foreground">
        {item.bullets.map((bullet) => (
          <li key={bullet.text}>{bullet.text}</li>
        ))}
      </ul>
    </article>
  );
}

function TechnicalDomains({
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
    <section id="technical-context" className="print-block mt-20 scroll-mt-24 sm:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-5">
        <div>
          <h2 className={`${SECTION_H}`}>Technical Domains I Understand</h2>
          <p className="mt-4 max-w-[700px] text-[1rem] leading-[1.65] text-foreground">
            My IT background gives me practical context for the technologies, responsibilities, and
            adjacent skills that appear in infrastructure and support requisitions.
          </p>
          <p className="mt-3 max-w-[700px] text-[0.98rem] leading-[1.6] text-muted-foreground">
            Hover, focus, or select a term to see where it appears in the technical experience.
          </p>
        </div>
        <button
          type="button"
          className="no-print prose-link text-[0.98rem]"
          onClick={onClear}
          disabled={!locked}
          aria-hidden={!locked}
          data-placeholder={!locked ? "true" : undefined}
        >
          Clear selection
        </button>
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
                      className="pill px-3 py-[7px] text-[0.94rem] leading-[1.35]"
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

function RolesUnderstood() {
  return (
    <section className="mt-20 scroll-mt-24 sm:mt-24" aria-labelledby="roles-understood">
      <h2 id="roles-understood" className={`${SECTION_H}`}>
        Technical Roles I Understand
      </h2>
      <p className="mt-4 max-w-[700px] text-[1rem] leading-[1.65] text-foreground">
        Roles and working environments I have direct professional context for through my own
        technology career.
      </p>
      <ul className="role-list mt-8 max-w-[880px]">
        {rolesUnderstood.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </section>
  );
}

function TechnicalCareerHighlights({
  active,
  onMarkClick,
}: {
  active: string | null;
  onMarkClick: (skill: string) => void;
}) {
  return (
    <section className="mt-20 scroll-mt-24 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Technical Career Highlights</h2>
      <p className="mt-4 max-w-[700px] text-[1rem] leading-[1.65] text-foreground">
        These are technical career scope markers, not recruiting metrics.
      </p>
      <div className="mt-9 grid max-w-[980px] gap-x-16 gap-y-9 md:grid-cols-2">
        {impact.map((item) => (
          <article key={item.figure} className="print-block max-w-[36ch]">
            <p className="text-[2.6rem] font-extrabold leading-none text-foreground sm:text-[3.1rem]">
              {item.figure}
            </p>
            <p className="mt-4 text-[1.03rem] leading-[1.6] text-foreground">
              {highlight(item.text, active, item.skills, onMarkClick)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EnterpriseExperience({
  active,
  onMarkClick,
}: {
  active: string | null;
  onMarkClick: (skill: string) => void;
}) {
  return (
    <section id="experience" className="mt-20 scroll-mt-24 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Enterprise IT Experience</h2>
      <p className="mt-4 max-w-[720px] text-[1rem] leading-[1.65] text-foreground">
        More than a decade of hands-on technology operations provides the technical context I now
        bring back into sourcing and recruiting.
      </p>
      <div className="mt-12 max-w-[860px] space-y-16">
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
              className="print-block experience-entry"
            >
              <header className="print-keep">
                <h3 className="text-[1.42rem] font-extrabold leading-[1.18] text-foreground sm:text-[1.72rem]">
                  {job.title}
                </h3>
                <p className="mt-3 text-[1.06rem] font-bold text-foreground">
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

              <ul className="serif-prose mt-6 list-disc space-y-3 pl-6 marker:text-muted-foreground">
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
    <section id="education" className="mt-20 scroll-mt-24 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Education &amp; Professional Development</h2>
      <div className="mt-10 max-w-[760px] space-y-8">
        {education.map((e, index) => (
          <article key={e.school + e.detail + index} className="print-block">
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

function ResumeContact() {
  return (
    <section id="resume-contact" className="mt-20 scroll-mt-24 sm:mt-24">
      <h2 className={`${SECTION_H}`}>Let's Talk</h2>
      <p className="mt-5 max-w-[720px] text-[1.05rem] leading-[1.65] text-foreground">
        I'm currently pursuing remote U.S. opportunities in technical sourcing, recruiting support,
        and junior technical recruiting.
      </p>
      <p className="mt-3 text-[1rem] leading-[1.6] text-muted-foreground">
        Santa Cruz, California · Remote U.S.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[1rem]">
        <a className="prose-link" href="mailto:keuper@duck.com">
          Email Aaron
        </a>
        <button
          type="button"
          className="resume-link resume-link-primary"
          aria-disabled="true"
          title="Technical recruiting resume PDF can be connected when the file is added."
        >
          Technical Recruiting Resume
          <span className="resume-link-note">PDF pending</span>
        </button>
        <a className="prose-link" href={TECH_RESUME_PATH} download>
          Senior Systems Administrator Resume
        </a>
      </div>
    </section>
  );
}
