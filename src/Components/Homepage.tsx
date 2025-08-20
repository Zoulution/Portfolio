import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import "./Homepage.css";
import istanbul from "../assets/Istanbul.jpg";
import novazzano from "../assets/Novazzano.jpg";
import stGeorgen from "../assets/stGeorgen.jpeg";
import vienenburg from "../assets/Vienenburg.jpg";
import zurich from "../assets/Zurich.jpg";
import AboutMe from "./AboutMe";
import Background from "./Background";
import Projects from "./Projects";
import { useRevealOnView } from "../Helpers/DataReveal";

const PHRASES = [
  { text: "The early bird catches the worm.", lang: "en" },
  { text: "Chi va piano va sano e va lontano.", lang: "it" },
  { text: "Übung macht den Meister.", lang: "de" },
  { text: "Komşu komşunun külüne muhtaçtır.", lang: "tr" },
];

const BG_IMAGES = [istanbul, novazzano, stGeorgen, vienenburg, zurich];

// This hook simulates a typing effect for an array of phrases.
function useTypedLoop(
  phrases: { text: string }[],
  typingSpeed = 100,
  pause = 1500,
  startPause = 1000
) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "pausing" | "deleting" | "start-pausing"
  >("typing");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = phrases[index].text;

    if (phase === "start-pausing") {
      timeout = setTimeout(() => {
        setPhase("typing");
      }, startPause);
    } else if (phase === "typing") {
      if (display.length < current.length) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => {
        setPhase("deleting");
      }, pause);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, display.length - 1));
        }, typingSpeed / 2);
      } else {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("start-pausing");
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, index, phrases, typingSpeed, pause, startPause]);

  return display;
}

function Homepage() {
  const typedText = useTypedLoop(PHRASES, 100 /*speed*/, 2000 /*pause*/);
  const [bgIndex, setBgIndex] = useState(0);

  //background images
  useEffect(() => {
    BG_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Rotate every 10s
  useEffect(() => {
    const id = setInterval(
      () => setBgIndex((i) => (i + 1) % BG_IMAGES.length),
      10000
    );
    return () => clearInterval(id);
  }, []);

  // Reveal sections on scroll
  // This will add the 'is-visible' class to sections when they come into view
  function useIsShortViewport(limit = 400) {
    const [isShort, setIsShort] = useState(false);
    useEffect(() => {
      const onResize = () => setIsShort(window.innerHeight <= limit);
      onResize();
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
      };
    }, [limit]);
    return isShort;
  }

  function useResponsiveThreshold(smallVpValue: number, normalValue: number) {
    const [t, setT] = useState(normalValue);
    useEffect(() => {
      const set = () =>
        setT(window.innerHeight < 400 ? smallVpValue : normalValue);
      set();
      window.addEventListener("resize", set);
      window.addEventListener("orientationchange", set);
      return () => {
        window.removeEventListener("resize", set);
        window.removeEventListener("orientationchange", set);
      };
    }, [smallVpValue, normalValue]);
    return t;
  }

  const isShort = useIsShortViewport(400);
  const thresholdSections = useResponsiveThreshold(0, 0.2);
  const thresholdProjects = useResponsiveThreshold(0, 1);

  const sectionsSelector = isShort
    ? ".section[data-reveal]"
    : ".section[data-reveal]:not(#projects)";

  useRevealOnView(sectionsSelector, {
    threshold: thresholdSections,
    delayMs: 0,
    once: true,
  });

  // disable the projects observer on short viewports by using a "no-op" selector
  useRevealOnView(isShort ? "#__skip__" : "#projects .project-title", {
    threshold: thresholdProjects,
    delayMs: 0,
    once: true,
    revealClosest: "[data-reveal]",
  });

  return (
    <div className="container-homepage">
      <section id="home" className="section hero-section">
        {/* Background stack */}
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`bg-layer ${i === bgIndex ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* Foreground content */}
        <h1 className="hero-name">Hi, I'm Eren </h1>
        <h1 className="hero-name" style={{ margin: 0, fontSize: "2.5rem" }}>
          (づ ◕‿◕ )づ
        </h1>
        <p className="hero-typed">
          {typedText}
          <span className="cursor">|</span>
        </p>
      </section>

      <section id="about" className="section" data-reveal>
        <div className="section-bar">
          <div className="section-bar-fill"></div>
        </div>
        <h1>About Me</h1>
        <AboutMe />
      </section>
      <section id="background" className="section" data-reveal>
        <div className="section-bar">
          <div className="section-bar-fill"></div>
        </div>
        <h1>Background</h1>
        <Background />
      </section>
      <section id="projects" className="section" data-reveal>
        <div className="section-bar">
          <div className="section-bar-fill"></div>
        </div>
        <h1>Projects</h1>
        <Projects />
      </section>
      <Footer />
    </div>
  );
}

export default Homepage;
