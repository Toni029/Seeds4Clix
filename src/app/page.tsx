"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const logos = [
  "149Photos",
  "Algar",
  "Continental",
  "HGreg",
  "HoneyBook",
  "IMP Diagnostics",
  "Matador",
  "Metro do Porto",
  "MobileODT",
  "P2Sample",
  "Pentadata",
  "PicUP",
  "Vonovia",
];

const paths = [
  {
    title: "Anarchy",
    body: "Critical knowledge lives in two or three people's heads and every day is firefighting.",
  },
  {
    title: "Processes",
    body: "Rules become written and repeatable, and the operation stops depending on individual heroes.",
  },
  {
    title: "AI",
    body: "Beyond running repetitive work, it opens new business models, markets you could not serve, and revenue that does not exist yet.",
  },
];

const offers = [
  {
    title: "AI Academy",
    body: "Training for your team with an AI tutor and content personalized to your context. The people using the tools every day need to understand them, not just receive them.",
    href: "/ai-academy",
    link: "See the courses ↗",
  },
  {
    title: "The AI Operating System for SMEs",
    body: "The platform where the work happens: marketing, sales, operations and HR automations, with your team and ours working in the same place.",
    href: "/ai-operating-system",
    link: "See the platform →",
  },
  {
    title: "AI Strategic Roadmap",
    body: "A deep diagnosis of your business, team interviews, and an automation roadmap prioritized by impact and risk.",
    href: "/ai-roadmap",
    link: "See the roadmap →",
  },
];

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
            ? "See what we could do together"
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
          <h1>
            <span>Scale your company</span>
            <br />
            with Artificial Intelligence.
          </h1>
          <p className="hero-copy">
            We find where your business stalls, automate the repetitive work, and give you back
            time, margin and decisions that stop depending on you.
          </p>
          <p className="terminal-line">
            ? If your demand doubled tomorrow, what would break first?
          </p>
          <LeadForm />
          <p className="form-note">
            Company email only. We research public information about your company and return the
            likely pains and where AI creates value. No commitment.
          </p>
          <a className="text-link" href="#work">
            Or see how we work
          </a>
        </div>
      </section>

      <section className="logo-strip" aria-label="Companies we work with">
        <p className="eyebrow">Companies already deciding with AI alongside us</p>
        <div className="logo-track">
          {[...logos, ...logos].map((logo, index) => (
            <span key={`${logo}-${index}`}>{logo}</span>
          ))}
        </div>
      </section>

      <section id="work" className="content-section">
        <p className="eyebrow">What we do</p>
        <h2>We solve business problems.</h2>
        <p className="section-intro">
          Software is the means. The outcome we deliver is measured in time recovered, decisions
          delegated and margin protected.
        </p>
        <div className="three-column-grid">
          {[
            [
              "Structure",
              "We turn the knowledge living in your team's heads into clear, delegable processes. Only a verbalized process can be handed to a person or a machine.",
            ],
            [
              "Automate",
              "Our operating system puts marketing, sales, operations and HR on assisted autopilot, with human decisions at the moments that require judgment.",
            ],
            [
              "Scale",
              "With the process written down and automated, volume grows without the team growing with it. The strategic plan keeps the queue ordered by real return.",
            ],
          ].map(([title, body]) => (
            <article className="surface-card p-8" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">What we could do together</p>
          <h2>How far your company can go with AI</h2>
          <p className="section-intro">
            Leave your contact and we show you, on your own case, where AI creates value in your
            business. While we do it, this site becomes yours.
          </p>
        </div>
        <div>
          <LeadForm compact />
          <p className="form-note">
            Work email only. We analyse the domain of your email, using public information. By
            continuing, you agree that we may contact you about this analysis.
          </p>
        </div>
      </section>

      <section className="content-section">
        <p className="eyebrow">The path</p>
        <h2>From anarchy to scale</h2>
        <p className="section-intro">
          AI only delivers once the first two are in place. Skipping steps means scaling chaos.
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
        <h2>If your demand doubled tomorrow, what would break first?</h2>
        <p>
          It is the question we open every diagnostic conversation with. If the answer makes you
          uncomfortable, that is where we should start.
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
