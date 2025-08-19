import "./AboutMe.css";
import profile from "../assets/Profile.jpeg";
import { Mail, Linkedin } from "lucide-react";

const ABOUT_TEXTS = [
  "I am a passionate software developer with a keen interest in building innovative solutions. My journey in tech has been driven by curiosity and a desire to create impactful applications.",
  "In my free time, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge with the community.",
  "I also love collaborating on projects with people from different backgrounds, as I believe diversity fuels creativity.",
];

export default function AboutMe() {
  return (
    <div className="aboutme">
      {/* Left column */}
      <div className="aboutme-left">
        <img
          className="aboutme-photo stagger d1"
          src={profile}
          alt="Portrait of Eren"
          loading="lazy"
          width={320}
          height={320}
        />
      </div>

      {/* Right column */}
      <div className="aboutme-right-container">
        <div className="aboutme-right stagger d2">
          {ABOUT_TEXTS.map((text, i) => (
            <p key={i} style={{ marginTop: i === 0 ? "0" : undefined }}>
              {text}
            </p>
          ))}
        </div>
        <div className="aboutme-contacts stagger d3">
          <a
            className="aboutme-btn"
            style={{ ["--i" as any]: 1 }}
            href="https://www.linkedin.com/in/eren-homburg-8abba12bb/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn in a new tab"
          >
            <Linkedin className="icon" />
          </a>

          <a
            className="aboutme-btn"
            style={{ ["--i" as any]: 2 }}
            href="mailto:erenhomburg@gmail.com"
            target="_blank"
            aria-label="Send email to erenhomburg@gmail.com"
          >
            <Mail className="icon email" />
          </a>

          <a
            className="aboutme-btn"
            style={{ ["--i" as any]: 3 }}
            href="/Eren_Homburg_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open CV in a new tab"
          >
            <span>CV</span>
          </a>
        </div>
      </div>
    </div>
  );
}
