import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="page-section not-found">
      <p className="section-label">404</p>
      <h1>Page not found</h1>
      <p>The path you're looking for doesn't exist on this filesystem.</p>
      <Link to="/home" className="btn btn-primary">
        cd ~/home
      </Link>
    </section>
  );
}
