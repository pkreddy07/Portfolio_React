import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TechTags from '../components/TechTags';
import './ProjectDetail.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/projects/${projectId}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Project not found');
        }
        if (!res.ok) {
          throw new Error(`Failed to load project details (HTTP ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProject(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <section className="page-section project-detail">
        <p>$ loading project details...</p>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="page-section project-detail">
        <h2>Project not found</h2>
        <p>{error || `No project matches "${projectId}".`}</p>
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
