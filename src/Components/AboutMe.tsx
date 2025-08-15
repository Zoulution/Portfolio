import "./AboutMe.css";
import profile from "../assets/Profile.jpeg";
import { Mail, Linkedin, FileText } from "lucide-react";

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

        <div className="aboutme-contacts stagger d2">
          <a
            className="aboutme-btn"
            href="https://www.linkedin.com/in/eren-homburg-8abba12bb/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile in a new tab"
          >
            <Linkedin className="icon" />
            <span>LinkedIn</span>
          </a>

          <a
            className="aboutme-btn"
            href="mailto:erenhomburg@gmail.com"
            aria-label="Send an email to erenhomburg@gmail.com"
          >
            <Mail className="icon" />
            <span>Email</span>
          </a>

          <a
            className="aboutme-btn"
            href="/Eren_Homburg_CV.pdf" // <-- replace with your CV path
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open CV in a new tab"
          >
            <FileText className="icon" />
            <span>CV</span>
          </a>
        </div>
      </div>

      {/* Right column */}
      <div className="aboutme-right stagger d3">
        <h2 className="aboutme-title">About Me</h2>
        <p>
          I am a passionate software developer with a keen interest in building
          innovative solutions. My journey in tech has been driven by curiosity
          and a desire to create impactful applications.
        </p>
        <p>
          In my free time, I enjoy exploring new technologies, contributing to
          open-source projects, and sharing knowledge with the community.
        </p>
      </div>
    </div>
  );
}
