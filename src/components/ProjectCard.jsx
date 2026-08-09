import { useState } from 'react';
import { Link } from 'react-router-dom';
import TechTags from './TechTags';
import './ProjectCard.css';

const TRUNCATE_LENGTH = 120;

export default function ProjectCard({ id, title, description, tech, image, link }) {
  // Local, per-card state — each rendered instance owns its own `expanded`
  // value, so opening one card never affects the others.
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > TRUNCATE_LENGTH;
  const shownText =
    expanded || !isLong ? description : `${description.slice(0, TRUNCATE_LENGTH).trimEnd()}…`;

  return (
    <article className="project-card">
      <div className="project-head">
        <span className="project-icon">▸</span>
        <h3>{title}</h3>
      </div>
      {image && <img src={image} alt={`Screenshot of ${title}`} />}
      <p>{shownText}</p>
      {isLong && (
        <button
          type="button"
          className="view-details-btn"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? 'view less ▲' : 'view details ▼'}
        </button>
      )}

      {/* Level 1 of prop drilling: ProjectCard passes its `tech` slice down to TechTags */}
      <TechTags tech={tech} />

      <div className="project-links">
        <Link to={`/projects/${id}`} className="project-link">
          project page →
        </Link>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
            source →
          </a>
        )}
      </div>
    </article>
  );
}
