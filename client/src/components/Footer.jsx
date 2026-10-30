import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <i className="fi-rr-search" aria-hidden="true" />
          </span>
          <div>
            <strong>Lost &amp; Found</strong>
            <p>Helping people get their important documents back.</p>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/about">
            <i className="fi-rr-info" aria-hidden="true" /> About
          </Link>
          <Link to="/contact">
            <i className="fi-rr-envelope" aria-hidden="true" /> Contact
          </Link>
        </div>
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} Lost &amp; Found. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
