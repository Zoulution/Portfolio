import "./DetailedProject.css";
import projects from "../Helpers/ProjectList";
import type { ProjectType } from "../Types/Projects";
import type { ProjectDetails } from "../Types/ProjectDetails";
import { ExternalLink, Github } from "lucide-react";
import { Footer } from "../Components/Footer";
import renderContent from "../Helpers/Render";

function sortProjectsByEnd(projects: ProjectType[]) {
  return [...projects].sort((a, b) => {
    if (!a.yearEnd && !b.yearEnd) return b.year - a.year;
    if (!a.yearEnd) return -1;
    if (!b.yearEnd) return 1;
    return (b.yearEnd ?? 0) - (a.yearEnd ?? 0);
  });
}

function Section({ title, content }: { title: string; content?: string }) {
  if (!content || !content.trim()) return null;

  const className =
    "section " +
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <section className={className}>
      <h1>{title}</h1>
      <div className="section-body">{renderContent(content.trim())}</div>
    </section>
  );
}

export default function DetailedProjectClass() {
  const sorted = sortProjectsByEnd(projects);

  const found = sorted.find((p) => p.title === "Flight Jet Sim");

  if (!found) {
    return <p>null</p>;
  }

  const Details: ProjectDetails = {
    title: found.title,
    github: found.github,
    oneLiner: "Experience the thrill of flying a jet in virtual reality",

    authors: ["Saimaneesh Yeturu", "Eren Homburg", "Stefano d'Ascanio"],
    year: found.year,
    yearEnd: found.yearEnd,
    image: "/ProjectsHeader/JetSim.png",

    abstract:
      "{video: https://youtu.be/8kRF2pPG93k|alt=Flight Jet Sim overview|caption=Thorough overview of the app, covering the problem, solution, and features}",
    walkthrough: `The journey began by studying different blueprints to decide which jet would be easiest to reconstruct. After reviewing several modern designs we chose the F35 because it had the most publicly available references as depicted below: {img:/DetailedProjectsImg/FlightJetSim/BluePrints.jpeg|alt=F35 Blueprints|caption=Blueprints of the F35 that was followed during the reconstruction on blender.} These blueprints served as the foundation for rebuilding the aircraft in Blender. From these plans smaller components were modeled first such as: {img:/DetailedProjectsImg/FlightJetSim/Chair.jpeg|alt=A fighter jet chair reconstructured in blender|caption=A component of the F35 jet in blender.} ensuring that each detail was accurate before moving on to the cockpit.

    Step by step the cockpit was expanded into a complete interior as depicted below: {img:/DetailedProjectsImg/FlightJetSim/Interface2.jpeg|alt=A blender screenshot of the fully done cockpit|caption=shows the full product of the cockpit in blender.} and ultimately into the finished jet as shown here: {img:/DetailedProjectsImg/FlightJetSim/Jet.jpeg|alt=A blender screenshot of the fully done F35|caption=shows the full product.} Along the way experimental models such as: {img:/DetailedProjectsImg/FlightJetSim/ABomb.jpeg|alt=Atomic bomb in blender|caption=This image shows the atomic bomb in blender.} were created to practice Blender techniques and refine the workflow.

    With the aircraft complete attention turned to the environments it would fly in. A modern skyline was designed as demonstrated here: {img:/DetailedProjectsImg/FlightJetSim/CityMap.jpeg|alt=A city skyline map|caption=A map used in the VR game.} along with natural landscapes as illustrated below: {img:/DetailedProjectsImg/FlightJetSim/Map.jpeg|alt=Shows a second map of the game|caption=a second map displaying used in the game that is based in nature.} giving players variety and immersion

    All these assets were then integrated and refined in Unity including UI features like the home menu as demonstrated here: {img:/DetailedProjectsImg/FlightJetSim/Interface.jpeg|alt=Unity work interface|caption=shows a screenshot of the work interface in unity.} Inside the VR game players can finally sit in the cockpit as shown here: {img:/DetailedProjectsImg/FlightJetSim/JetView.jpeg|alt=Shows a view from the cockpit of the F35 in game|caption=shows a view from the cockpit of the F35 in game.} and pilot the jet experiencing physics modeled as closely as possible to real flight for an immersive VR simulation.`,
    tags: found.tags,
  };

  return (
    <>
      <div className="details-container">
        <div className="title-projectContainer">
          {Details.image && (
            <div
              className="title-right-projectContainer jetsimpic"
              style={{ backgroundImage: `url(${Details.image})` }}
            />
          )}
          <div className="title-left-projectContainer">
            <div className="topPart">
              <h1>{Details.title}</h1>

              {Details.oneLiner && (
                <p className="oneLiner">"{Details.oneLiner}"</p>
              )}
            </div>
            <div className="authorsAndYear">
              {Details.authors.map((author, i) => (
                <span key={i}>
                  {author === "Eren Homburg" ? <b>{author}</b> : author}
                  {i < Details.authors.length - 1 ? ", " : ""}
                </span>
              ))}
              <p style={{ margin: 0 }}>
                {Details.yearEnd
                  ? Details.year === Details.yearEnd
                    ? Details.year
                    : `${Details.year} - ${Details.yearEnd}`
                  : `${Details.year} - Present`}
              </p>
            </div>
            <div className="tagsAndLinks">
              {/* Tags */}
              <div className="tags detailed">
                {Details.tags.map((tag, i) => (
                  <span key={`${tag}-${i}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="links detailed">
                {Details.github && (
                  <a
                    href={Details.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="link-projectDetails" />
                    Github
                  </a>
                )}
                {Details.website && (
                  <a
                    href={Details.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="link-projectDetails" />
                    External Link
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main-detailedProject">
          {/* Sections from Abstract down */}
          <Section title="Abstract" content={Details.abstract} />
          <Section
            title="Problem Statement"
            content={Details.problemStatement}
          />
          <Section title="Solution" content={Details.solution} />
          <Section title="Features" content={Details.features} />
          <Section title="Walkthrough" content={Details.walkthrough} />
          <Section title="Infrastructure" content={Details.infrastructure} />
          <Section title="Challenges" content={Details.challenges} />
          <Section title="Results" content={Details.results} />
          <Section title="Future Work" content={Details.futureWork} />
        </div>
      </div>
      <Footer />
    </>
  );
}
