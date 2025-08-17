import "./ProjectItem.css";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  year: number;
  yearEnd?: number;
  detailLink: string;
  abstract: string;
  image: string;
  tags: string[];
  github?: string;
  website?: string;
}

export default function ProjectCard({
  title,
  year,
  yearEnd,
  detailLink,
  abstract,
  image,
  tags,
  github,
  website,
}: ProjectCardProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <motion.div
      className="project-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        layout: { duration: 0.4, ease: "easeInOut" },
        duration: 0.6,
      }}
    >
      {/* Title */}
      <div className="header-project">
        <h2 className="project-title">
          <a href={detailLink} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>

        {/* Year */}
        <p className="project-year">
          {yearEnd
            ? year === yearEnd
              ? year
              : `${year} - ${yearEnd}`
            : `${year} - Present`}
        </p>
      </div>

      <div className="contentAndFooter">
        <p className="project-abstract">{abstract}</p>
        {image && <img src={image} alt={title} className="project-image" />}

        {/* Tags */}
        <div className="tags">
          {/* first 3, always visible */}
          {tags.slice(0, 3).map((tag, i) => (
            <span key={`${tag}-${i}`} className="tag">
              {tag}
            </span>
          ))}

          {/* toggle right after the 3rd tag */}
          {tags.length > 3 && !showAllTags && (
            <button
              className="tag tag-more"
              onClick={() => setShowAllTags(true)}
              aria-expanded={showAllTags}
            >
              +{tags.length - 3} more
            </button>
          )}

          {/* extra tags, each animated with its own delay */}
          {showAllTags &&
            tags.slice(3).map((tag, i) => (
              <motion.span
                key={`${tag}-extra-${i}`}
                className="tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.12 }} // domino effect
              >
                {tag}
              </motion.span>
            ))}

          {/* show less at the very end (also delayed so it comes after the extras) */}
          {showAllTags && tags.length > 3 && (
            <motion.button
              className="tag tag-more"
              onClick={() => setShowAllTags(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: (tags.length - 3) * 0.12 }}
            >
              Show less
            </motion.button>
          )}
        </div>

        {/* Links */}
        <div className="links">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github size={18} /> GitHub
            </a>
          )}
          {detailLink && (
            <a href={detailLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} /> Details
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              🌐 Website
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
