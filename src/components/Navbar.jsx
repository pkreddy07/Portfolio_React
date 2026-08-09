import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import useWindowWidth from '../hooks/useWindowWidth';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/home', label: 'home.html' },
  { to: '/about', label: 'about.md' },
  { to: '/projects', label: 'projects/' },
  { to: '/contact', label: 'contact.sh' },
];

const MOBILE_BREAKPOINT = 480;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const width = useWindowWidth();
  const isMobile = width <= MOBILE_BREAKPOINT;
  const [menuOpen, setMenuOpen] = useState(false);

  const showLinks = !isMobile || menuOpen;

  return (
    <header>
      <nav>
        <div className="nav-top">
          <div className="logo">
            mrpkreddy<span className="logo-accent">@</span>07<span className="logo-accent">:~$</span>
          </div>
          <div className="nav-controls">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀ light' : '● dark'}
            </button>
            {isMobile && (
              <button
                type="button"
                className="menu-toggle"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            )}
          </div>
        </div>
        {showLinks && (
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
