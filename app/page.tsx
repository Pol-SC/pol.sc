import { BIRTHDAY, durationSince, formatDuration, yearsSince } from "./dates";

// Re-render daily so age and experience roll over without a deploy.
export const revalidate = 86400;

const email = "hi@pol.sc";
const linkedin = "https://www.linkedin.com/in/pol-sc/";

const jobs = [
  {
    company: "Re",
    url: "https://re.xyz",
    title: "Software Developer",
    start: new Date(2026, 3, 1),
    end: null as Date | null,
    details: [
      "Led partner integrations into the points program",
      "Built indexing and points tracking across EVM and Solana",
      "Built on-chain monitoring and alerting",
      "Contributed to the app frontend and third-party data integrations",
      "Built AI tooling, including an MCP server and an in-app assistant",
      "Contributed to the $RE token generation event",
    ],
  },
];

const monthYear = (d: Date) =>
  d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });

// ↳ marker for sub-items.
function Branch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 2v8h9" />
      <path d="m10 7 3 3-3 3" />
    </svg>
  );
}

function Details({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((text) => (
        <li key={text} className="flex gap-2 text-sm text-ink-dim">
          <Branch className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-faint" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const now = new Date();
  const age = yearsSince(BIRTHDAY, now);
  const started = (year: number) => yearsSince(new Date(year, 0, 1), now);
  const skill = (label: string, since: number) =>
    `${label} (${started(since)} years experience)`;

  const work = [
    {
      title: "Software development",
      years: started(2017),
      details: [
        skill("Python", 2017),
        skill("HTML/CSS", 2017),
        skill("JavaScript/TypeScript", 2017),
        skill("Ruby", 2019),
        skill("Solidity + Solidity Assembly", 2021),
        skill("Rust", 2024),
      ],
    },
    {
      title: "Cyber security",
      years: started(2022),
      details: ["$20K+ in awarded bounties"],
    },
    {
      title: "Cryptocurrency & blockchain",
      years: started(2020),
      details: ["Active in DeFi since 2021", "Active in mining from 2020–2021"],
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-col flex-col px-6 py-10 sm:py-16">
      <main className="flex flex-col gap-16">
        <section id="about" className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink-bright sm:text-4xl">
              Pol Selles Climent
            </h1>
            <p className="mt-2 font-mono text-sm text-ink-dim">
              software developer / economics student
            </p>
          </div>
          <div className="flex flex-col gap-4 leading-relaxed">
            <p>
              I&apos;m {age}, from Spain &amp; Australia, and currently studying Economics
              at Erasmus University Rotterdam. I work at{" "}
              <a
                href="https://re.xyz"
                className="text-ink-bright underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink-bright"
              >
                Re
              </a>{" "}
              as a software developer.
            </p>
            <p>
              I started programming at ten. Since then most of my time has gone
              into crypto and blockchain tech, and more recently into cyber
              security.
            </p>
          </div>
        </section>

        <section id="work" className="flex flex-col gap-6">
          <h2 className="font-mono text-xs uppercase tracking-label text-ink-faint">
            What I do
          </h2>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {work.map((item) => (
              <li key={item.title} className="flex flex-col gap-3 py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <span className="text-ink-bright">{item.title}</span>
                  <span className="shrink-0 font-mono text-sm text-ink-dim">
                    {item.years} {item.years === 1 ? "year" : "years"}
                  </span>
                </div>
                <Details items={item.details} />
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" className="flex flex-col gap-6">
          <h2 className="font-mono text-xs uppercase tracking-label text-ink-faint">
            Work experience
          </h2>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {jobs.map((job) => (
              <li key={job.company + job.title} className="flex flex-col gap-3 py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-ink-bright">
                      {job.title} at{" "}
                      <a
                        href={job.url}
                        className="underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink-bright"
                      >
                        {job.company}
                      </a>
                    </span>
                    <span className="text-sm text-ink-dim">
                      {formatDuration(durationSince(job.start, job.end ?? now))}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-sm text-ink-dim">
                    {monthYear(job.start)} – {job.end ? monthYear(job.end) : "present"}
                  </span>
                </div>
                <Details items={job.details} />
              </li>
            ))}
          </ul>

          <p className="text-sm text-ink-dim">
            <a
              href={`mailto:${email}`}
              className="text-ink-bright underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink-bright"
            >
              Contact me
            </a>{" "}
            for more info about my experience.
          </p>
        </section>

        <section id="contact" className="flex flex-col gap-6">
          <h2 className="font-mono text-xs uppercase tracking-label text-ink-faint">
            Contact
          </h2>
          <ul className="flex flex-col gap-2 font-mono text-sm">
            <li>
              <a
                href={`mailto:${email}`}
                className="text-ink-dim transition-colors hover:text-ink-bright"
              >
                {email}
              </a>
            </li>
            <li>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim transition-colors hover:text-ink-bright"
              >
                linkedin ↗
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
