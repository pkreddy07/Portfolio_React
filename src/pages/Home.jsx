import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/images/profile-hero.jpeg';
import './Home.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate a brief loading sequence on mount, then reveal the hero content.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-heading">
        <span>Hi</span> there! Pranav here
      </h1>
      <section id="home" className="hero page-section">
        <div className="hero-text">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">bash — pranav@nitw</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="prompt-user">pranav@nitw</span>
                <span className="prompt-sep">:~$</span> whoami
              </div>
              <p className="terminal-output">
                Pranav Kumar Reddy C — third year <span className="highlight">CSE</span> student
                and a backend developer, currently exploring AI engineering. Love to play with MCP
                and turn everything around me into an agentic workflow.
              </p>

              <div className="terminal-line">
                <span className="prompt-user">pranav@nitw</span>
                <span className="prompt-sep">:~$</span> cat degree.txt
              </div>
              <p className="terminal-output">B.Tech, Computer Science &amp; Engineering</p>

              <div className="hero-buttons">
                <Link to="/projects" className="btn btn-primary">
                  ./view-projects
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  ./contact-me
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={profileImg} alt="Profile photo of Pranav" />
        </div>
      </section>
    </>
  );
}
