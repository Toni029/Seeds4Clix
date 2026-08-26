"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const sectors = [
  "E-commerce & Retail",
  "Logistics & Field Ops",
  "Professional Services",
  "Manufacturing",
  "Healthcare Operations",
  "Financial Services",
  "Hospitality",
  "Real Estate",
];

const paths = [
  {
    title: "Anarchy",
    body: "Critical knowledge lives in two or three people's heads, so every busy week turns into firefighting.",
  },
  {
    title: "Process",
    body: "Rules get written down and repeated the same way every time, so the operation stops depending on individual heroes.",
  },
  {
    title: "Intelligence",
    body: "Once the work is repeatable, AI takes on the volume and opens capacity, markets, and revenue you could not chase before.",
  },
];

const heroQuestions = ["If your demand doubled tomorrow, what would break first?"];

const offers = [
  {
    title: "AI Academy",
    body: "Hands-on training for your team, paired with an AI tutor and material built around your actual workflows — not generic slides.",
    href: "/ai-academy",
    link: "See the courses ↗",
  },
  {
    title: "The AI Operating System for SMEs",
    body: "The platform where the work happens: marketing, sales, operations and HR automations, with your team and ours working side by side.",
    href: "/ai-operating-system",
    link: "See the platform →",
  },
  {
    title: "AI Strategic Roadmap",
    body: "A close look at your business, conversations with your team, and a prioritized plan ranked by impact and risk.",
    href: "/ai-roadmap",
    link: "See the roadmap →",
  },
];

function HeroQuestion() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const question = heroQuestions[questionIndex] ?? "";
    const isComplete = visibleLength === question.length;
    const delay =
      isComplete && !deleting ? 2200 : deleting && visibleLength === 0 ? 450 : deleting ? 28 : 42;
    const timer = window.setTimeout(() => {
      if (!deleting && visibleLength < question.length) {
        setVisibleLength((length) => length + 1);
      } else if (!deleting) {
        setDeleting(true);
      } else if (visibleLength > 0) {
        setVisibleLength((length) => length - 1);
      } else {
        setDeleting(false);
        setQuestionIndex((index) => (index + 1) % heroQuestions.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, questionIndex, visibleLength]);

  const question = heroQuestions[questionIndex] ?? "";

  return (
    <div className="terminal-line" aria-live="polite" aria-label={question}>
      <span className="terminal-prefix">?</span>
      <span className="terminal-question">{question.slice(0, visibleLength)}</span>
      <span className="terminal-caret" aria-hidden="true" />
    </div>
  );
}

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <form onSubmit={submit} className={`lead-form ${compact ? "lead-form-compact" : ""}`}>
      <input
        aria-label={compact ? "Work email" : "your.name@yourcompany.com"}
        type="email"
        required
        placeholder={compact ? "Work email" : "your.name@yourcompany.com"}
      />
      <button type="submit">
        {submitted
          ? "Thanks — we'll be in touch"
          : compact
            ? "Show me where AI helps"
            : "Analyze my company"}
      </button>
    </form>
  );
}

export default function HomePage() {
  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="hero-title">
            <span className="hero-title-lead scale-title-gradient">Scale your company</span>
            <br />
            <span className="hero-title-subtitle">with Artificial Intelligence.</span>
          </h1>
          <p className="hero-copy">
            We find where your business stalls, automate the repetitive work, and give you back
            time, margin and decisions that stop depending on you.
          </p>
          <HeroQuestion />
          <LeadForm />
          <p className="form-note">
            Work email only. We look at public information about your company and send back where AI
            is likely to help. No commitment.
          </p>
          <a className="text-link" href="#work">
            Or see how we work
          </a>
        </div>
      </section>

      <section className="logo-strip" aria-label="Sectors we work with">
        <p className="eyebrow">Industries running on AI alongside us</p>
        <div className="sector-strip logo-track">
          {[...sectors, ...sectors].map((sector, index) => (
            <span key={`${sector}-${index}`} className="sector-chip">
              {sector}
            </span>
          ))}
        </div>
      </section>

      <section id="work" className="content-section">
        <p className="eyebrow">What we do</p>
        <h2>We solve business problems.</h2>
        <p className="section-intro">
          Software is the means. What we deliver is measured in time recovered, decisions delegated,
          and margin protected.
        </p>
        <div className="three-column-grid">
          {[
            [
              "Structure",
              "We turn the knowledge living in your team's heads into clear, delegable processes. A process only becomes useful once it can be handed to a person — or a machine.",
            ],
            [
              "Automate",
              "Our operating system puts marketing, sales, operations and HR on assisted autopilot, with human judgment kept exactly where it matters.",
            ],
            [
              "Scale",
              "With the process written down and automated, volume can grow without the team growing with it. The roadmap keeps the queue ordered by real return.",
            ],
          ].map(([title, body]) => (
            <article className="surface-card p-8" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section needle-section">
        <div>
          <p className="eyebrow">What we could do together</p>
          <h2>See where AI moves the needle in your business</h2>
          <p className="section-intro">
            Leave your contact and we&apos;ll show you, on your own case, where AI creates value.
            While we do it, this page becomes yours.
          </p>
        </div>
        <div>
          <LeadForm compact />
          <p className="form-note">
            Work email only. We analyze the domain behind your email using public information. By
            continuing, you agree that we may contact you about this analysis.
          </p>
        </div>
      </section>

      <section className="content-section">
        <p className="eyebrow">The path</p>
        <h2>From anarchy to scale</h2>
        <p className="section-intro">
          AI only pays off once the first two stages are in place. Skip a step and you just scale
          the chaos faster.
        </p>
        <ol className="path-grid">
          {paths.map((path, index) => (
            <li className="surface-card flex flex-col p-8" key={path.title}>
              <span>{index + 1}</span>
              <h3>{path.title}</h3>
              <p>{path.body}</p>
            </li>
          ))}
        </ol>
        <Link className="outline-link" href="/ai-development">
          Find out where you stand in 2 minutes
        </Link>
      </section>

      <section className="content-section offers-section">
        <p className="eyebrow">How we work with you</p>
        <h2>Three paths to an intelligent business</h2>
        <div className="three-column-grid">
          {offers.map((offer) => (
            <article className="surface-card p-8" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
              <Link className="text-link" href={offer.href}>
                {offer.link}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <h2>What happens to your team if orders doubled next month?</h2>
        <p>
          It is the question we open every diagnostic conversation with. If the honest answer makes
          you uneasy, that is exactly where we should start.
        </p>
        <div className="cta-actions">
          <Link className="outline-link" href="/ai-development">
            Analyze my company
          </Link>
          <Link className="primary-link" href="/ai-development">
            I want to automate my company
          </Link>
        </div>
      </section>
    </div>
  );
}
