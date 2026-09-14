import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error(`Failed to load projects (HTTP ${response.status})`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects page-section">
      <div className="section-label">/projects/</div>

      {loading && (
        <div className="projects-status-message" role="status">
          <p>$ loading projects from API...</p>
        </div>
      )}

      {error && (
        <div className="projects-error-banner" role="alert">
          <p>
            <strong>Error:</strong> {error}
          </p>
          <button type="button" className="btn btn-secondary" onClick={fetchProjects}>
            ↻ Retry Connection
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}

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
