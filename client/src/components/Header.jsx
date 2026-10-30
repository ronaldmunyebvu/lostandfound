import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-inner">
        <button
          className="brand"
          onClick={() => navigate('/')}
          aria-label="Lost and Found home"
        >
          <span className="brand-badge">
            <i className="fi-rr-search" aria-hidden="true" />
          </span>
          <span className="brand-text">
            Lost <span className="brand-amp">&amp;</span> Found
          </span>
        </button>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end>
            <i className="fi-rr-home" aria-hidden="true" />
            <span className="nav-label">Home</span>
          </NavLink>
          <NavLink to="/about">
            <i className="fi-rr-info" aria-hidden="true" />
            <span className="nav-label">About</span>
          </NavLink>
          <NavLink to="/contact">
            <i className="fi-rr-envelope" aria-hidden="true" />
            <span className="nav-label">Contact</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
