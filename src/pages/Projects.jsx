import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects page-section">
      <div className="section-label">/projects/</div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      <div className="projects-footer">
        <a
          href="https://github.com/pkreddy07"
          target="_blank"
          rel="noopener noreferrer"
          className="view-more-btn"
        >
          View more →
        </a>
      </div>
    </section>
  );
}
