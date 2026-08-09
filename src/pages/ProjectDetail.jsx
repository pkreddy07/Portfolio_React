import { Link, useParams } from 'react-router-dom';
import TechTags from '../components/TechTags';
import projects from '../data/projects';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="page-section project-detail">
        <h2>Project not found</h2>
        <p>No project matches "{projectId}".</p>
        <Link to="/projects" className="btn btn-secondary">
          ← back to projects
        </Link>
      </section>
    );
  }

  return (
    <section className="page-section project-detail">
      <div className="section-label">/projects/{project.id}</div>
      <div className="project-detail-head">
        <span className="project-icon">▸</span>
        <h1>{project.title}</h1>
      </div>
      {project.image && <img src={project.image} alt={`Screenshot of ${project.title}`} />}
      <p className="project-detail-desc">{project.description}</p>
      <TechTags tech={project.tech} />
      <div className="project-detail-links">
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            open on GitHub →
          </a>
        )}
        <Link to="/projects" className="btn btn-secondary">
          ← back to projects
        </Link>
      </div>
    </section>
  );
}
