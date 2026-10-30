import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className="page">
      <div className="container">
        <div className="section-title">
          <span className="chip chip-soft">
            <i className="fi-rr-info" aria-hidden="true" />
            Our story
          </span>
          <h2>About us</h2>
          <p>
            We are a small, community-minded team that believes losing an
            important document should never mean losing hope.
          </p>
        </div>

        <div className="about-intro">
          <div className="about-illustration">
            <i className="fi-rr-handshake" aria-hidden="true" />
          </div>
          <div>
            <h3>Why we started</h3>
            <p>
              Every week, people walk into our offices with the same worry: a
              lost ID, a misplaced passport, or a certificate that never made
              it home. We started Lost &amp; Found to give those documents a
              safe place to wait, and to give their owners an easy way to find
              them again.
            </p>
            <p>
              What began as a simple notebook has grown into a proper registry.
              Behind it all is the same idea: be honest, be careful with
              people&apos;s information, and always try to help.
            </p>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 32 }}>
          <div className="card">
            <div className="icon">
              <i className="fi-rr-target" aria-hidden="true" />
            </div>
            <h3>Our mission</h3>
            <p>
              To make recovering a lost document as calm and straightforward as
              possible, for everyone.
            </p>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fi-rr-leaf" aria-hidden="true" />
            </div>
            <h3>Since 2025</h3>
            <p>
              We have built a trusted space where finders and owners can meet,
              with privacy and care at the centre.
            </p>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fi-rr-heart" aria-hidden="true" />
            </div>
            <h3>Our promise</h3>
            <p>
              Every document is handled with respect. We will never sell your
              details, and we will always treat you like a person, not a
              ticket number.
            </p>
          </div>
        </div>

        <div className="about-values">
          <div className="value">
            <i className="fi-rr-shield-check" aria-hidden="true" />
            <div>
              <strong>Careful with your data</strong>
              <span>Only the details we need, kept safely.</span>
            </div>
          </div>
          <div className="value">
            <i className="fi-rr-users" aria-hidden="true" />
            <div>
              <strong>Real people, real help</strong>
              <span>Talk to a human whenever you need to.</span>
            </div>
          </div>
          <div className="value">
            <i className="fi-rr-globe" aria-hidden="true" />
            <div>
              <strong>Open to everyone</strong>
              <span>Free to search, no account required.</span>
            </div>
          </div>
        </div>

        <div className="btn-row" style={{ maxWidth: 280, margin: '32px auto 0' }}>
          <Link to="/" className="btn btn-primary btn-block">
            <i className="fi-rr-search" aria-hidden="true" />
            Search for a document
          </Link>
        </div>
      </div>
    </section>
  );
}
