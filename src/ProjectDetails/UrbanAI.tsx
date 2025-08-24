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

  const found = sorted.find((p) => p.title === "Urban AI");

  if (!found) {
    return <p>null</p>;
  }

  const Details: ProjectDetails = {
    title: found.title,
    github: found.github,
    oneLiner: "Decomposition tool helping young learners learn problem solving",

    authors: [
      "Saimaneesh Yeturu",
      "Noah Gerber",
      "Eren Homburg",
      "Patrick Eugster",
    ],
    year: found.year,
    yearEnd: found.yearEnd,
    image: "/ProjectsHeader/UrbanAI.png",

    abstract: found.abstract,
    problemStatement: `As we move toward a more sustainable world, large amounts of city data are required to fundamentally understand and improve the existing infrastructure. While this information has been painstakingly gathered through expert analysis and costly censuses in many Western countries, it is often simply unfeasible in many other regions.
    Artificial intelligence could play a key role in alleviating much of the workload; manual data collection and analysis are often laborious and repetitive, which is where current transformer based vision models can really shine. However, there is no accessible public-facing tool to bridge cutting-edge AI research with real-world stakeholders who need this data the most.`,
    solution: `
    With the newly developed and open-source model URBAN-AI, we propose a simple web-based interface for stakeholders to dynamically obtain and visualize AI-generated building insights from basic street view images.  

    The AI pipeline consists of:  
    1. Grounding DINO for object detection from text prompts.  
    2. Segment-Anything-2 for high-quality image segmentation.  
    3. UForm Gen2, a lightweight multimodal LLM for efficient reasoning.  

    This combination enables users to isolate building façades, extract architectural insights, and explore results on a global map without requiring any technical background.  

    {img:/DetailedProjectsImg/UrbanAI/hero.png|alt=Interactive Urban AI|caption=Interactive Urban-AI: make AI powered architectural data available to all}`,

    features: `
    Our platform integrates two complementary modules:  

    1. Image Portal  
    A user-friendly upload tool where anyone can submit images and select the insights they wish to obtain.  
    {img:/DetailedProjectsImg/UrbanAI/image-portal.png|alt=Image portal|caption=Image portal to upload images directly to URBAN-AI, hosted on the cloud. The interface is designed to make the interaction as simple as possible, with minimal UI elements.}  

    2. Interactive Map  
    Built on OpenStreetMaps with OpenLayers, the map displays global façade data and allows overlays of attributes like material and style.  
    {img:/DetailedProjectsImg/UrbanAI/materials.png|alt=Material dataset|caption=Material dataset from Global Facades in Zurich, Switzerland. Each color corresponds to a different primary construction material.}  

    Google Street View is also integrated, enabling a seamless link between datasets and real-world imagery.  
    {img:/DetailedProjectsImg/UrbanAI/google-street-view.png|alt=Google Street View integration|caption=Google Street View integration in the application.}  `,
    walkthrough: `Users interact with URBAN-AI in three simple steps:  

    1. Upload a street-level image of a building.  
    2. Choose the insights to retrieve (materials, façade characteristics, architectural type, etc.).  
    3. Receive AI-generated results within seconds.  

    This makes the workflow intuitive and fast for stakeholders, ranging from NGOs and researchers to government agencies and individuals interested in sustainability.`,
    infrastructure: `
    The platform is deployed using cloud-hosted inference services.  

    - Model Hosting: Variants of Grounding DINO and SAM-2 are hosted on Replicate, running on Nvidia T4 GPUs for cost efficiency.  
    - Language Model: UForm Gen2 is served on a shared Cloudflare instance, avoiding warm-up latency.  
    - Mapping: OpenLayers provides a responsive and high-quality map environment, with data converted from shapefiles to GeoJSON for smooth rendering.  
    - Payment System: Stripe powers a token-based mechanism where each image run consumes one token.  

    {img:/DetailedProjectsImg/UrbanAI/payment.png|alt=Payment portal|caption=Payment portal using Stripe}`,

    challenges: `
    Several challenges emerged during development:  

    1. Single-image limitation: Current runs only allow one image at a time to prevent overloading minimal infrastructure.  
    2. Cold boot delays: Grounding SAM requires a fresh start for each request, and warm-up time dominates inference.  
    3. Lightweight LLM: Instead of GPT-4, we rely on UForm Gen2 to balance cost and performance.  
    4. Prototype UI: Export features, responsiveness, and dataset exploration tools remain limited and need refinement.`,

    results: `
    The prototype successfully demonstrates how URBAN-AI can be transformed into a public tool.  

    - Users can upload their own images and obtain meaningful AI-powered insights.  
    - The interactive map allows exploration of the Global Facades Dataset across multiple cities.  
    - Integration with Google Street View bridges abstract datasets with tangible urban imagery.  

    Even with minimal infrastructure, the platform achieves its goal of accessibility: creating a simple, non-technical entry point for global stakeholders.`,

    futureWork: `
    As we progress in developing our platform, scalability has emerged as a key focus area to ensure sustainable growth and global relevance.  

    Future improvements will include:  
    1. Batch image processing for efficiency.  
    2. Persistent GPU hosting to eliminate cold boot delays.  
    3. Expanded datasets covering rural as well as urban regions.  
    4. Export and download features for curated datasets.  
    5. Enhanced dashboards for monitoring, comparison, and long-term studies.  

    Our vision is to transform URBAN-AI into a global resource cadastre supporting circular economy, sustainability, and equitable decision-making.`,
    tags: found.tags,
  };

  return (
    <>
      <div className="details-container">
        <div className="title-projectContainer">
          {Details.image && (
            <div
              className="title-right-projectContainer urbanaipic"
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
