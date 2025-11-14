import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💰 Savings Group
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🏠 Home
          </Link>
          <Link
            to="/registration"
            className={`nav-link ${location.pathname === '/registration' ? 'active' : ''}`}
          >
            📝 Registration
          </Link>
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

