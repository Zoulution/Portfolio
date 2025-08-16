import { useEffect, useRef } from "react";
import "./Resume.css";

type EduStatus = "done" | "ongoing" | "planned";

type EduItem = {
  name: string;
  place?: string;
  dates?: string;
  status: EduStatus;
};

type WorkItem = {
  position: string;
  company?: string;
  logo?: string;
  startYear?: number;
  endYear?: number | "present";
  status: EduStatus;
};

const EDUCATION: EduItem[] = [
  {
    name: "MSc Computer Science",
    place: "TBD",
    dates: "planned",
    status: "planned",
  },
  {
    name: "BSc Computer Science",
    place: "ETH Zürich",
    dates: "2022 – present",
    status: "ongoing",
  },
  {
    name: "High School",
    place: "Liceo di Mendrisio",
    dates: "2017 – 2021",
    status: "done",
  },
];

const WORK: WorkItem[] = [
  {
    position: "Full Stack Developer",
    company: "ASTAZ",
    logo: "/Logos/ASTAZ.png",
    startYear: 2025,
    endYear: "present",
    status: "ongoing",
  },
];

export default function Resume() {
  const eduRef = useRef<HTMLOListElement | null>(null);
  const workRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const eduEl = eduRef.current;
    const workEl = workRef.current;
    if (!eduEl) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const revealWork = () => {
      workEl?.classList.add("is-visible");
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        eduEl.classList.add("is-visible");
        io.disconnect();

        const lastEdu = eduEl.querySelector<HTMLLIElement>(
          "li.edu-step-vertical:last-of-type"
        );

        if (prefersReduced || !lastEdu) {
          revealWork();
          return;
        }

        const onEnd = (e: TransitionEvent) => {
          if (
            e.target === lastEdu &&
            (e.propertyName === "opacity" || e.propertyName === "transform")
          ) {
            revealWork();
          }
        };

        lastEdu.addEventListener("transitionend", onEnd, { once: true });
      },
      { threshold: 0.35 }
    );

    io.observe(eduEl);

    return () => io.disconnect();
  }, []);

  return (
    <div className="resume-container">
      <div className="education">
        <h2 className="resume-title">Education</h2>
        <ol
          ref={eduRef}
          className="edu-timeline-vertical"
          aria-label="Education timeline"
        >
          {EDUCATION.map((item, i) => (
            <li
              className="edu-step-vertical"
              key={`${item.name}-${i}`}
              style={{ ["--i" as any]: EDUCATION.length - i }}
            >
              <div className="edu-marker" aria-hidden>
                <span className={`edu-circle circle--${item.status}`} />
              </div>
              <div className="edu-info">
                <div className="edu-name">{item.name}</div>
                {(item.place || item.dates) && (
                  <div className="edu-meta">
                    {item.place && <span>{item.place}</span>}
                    {item.place && item.dates && <span className="dot">•</span>}
                    {item.dates && <span>{item.dates}</span>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="work">
        <h2 className="resume-title">Work Experience</h2>
        <ol
          ref={workRef}
          className="edu-timeline-vertical timeline--right"
          aria-label="Work timeline"
        >
          {WORK.map((item, i) => (
            <li
              className="edu-step-vertical"
              key={`${item.position}-${i}`}
              style={{ ["--i" as any]: WORK.length - i }}
            >
              <div className="edu-info work-info">
                {/* Logo + Company */}
                <div className="work-header">
                  {item.logo && (
                    <img
                      className="company-logo"
                      src={item.logo}
                      alt={`${item.company ?? item.position} logo`}
                      loading="lazy"
                      width={40}
                      height={40}
                    />
                  )}
                  {item.company && (
                    <div className="company-name">{item.company}</div>
                  )}
                </div>

                {/* Position */}
                <div className="position-name">{item.position}</div>

                {/* Years */}
                {(item.startYear || item.endYear) && (
                  <div className="work-years">
                    {item.startYear ?? "—"} –{" "}
                    {item.endYear === "present"
                      ? "present"
                      : item.endYear ?? "—"}
                  </div>
                )}
              </div>

              <div className="edu-marker" aria-hidden>
                <span className={`edu-circle circle--${item.status}`} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
