import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <section className="page">
      <div className="container">
        <div className="section-title">
          <span className="chip chip-soft">
            <i className="fi-rr-comments" aria-hidden="true" />
            We are here to help
          </span>
          <h2>Contact us</h2>
          <p>
            Whether you have found a document, lost one, or simply have a
            question, reach out. A real person will get back to you.
          </p>
        </div>

        <div className="grid-3">
          <div className="card contact-card">
            <div className="icon">
              <i className="fi-rr-envelope" aria-hidden="true" />
            </div>
            <h3>Email us</h3>
            <p>Best for detailed questions and document enquiries.</p>
            <a
              href="mailto:rmmunyebvu@gmail.com"
              className="contact-link"
            >
              rmmunyebvu@gmail.com
            </a>
          </div>
          <div className="card contact-card">
            <div className="icon">
              <i className="fi-rr-phone-call" aria-hidden="true" />
            </div>
            <h3>Call or WhatsApp</h3>
            <p>Prefer to talk? We are happy to chat during office hours.</p>
            <a href="https://wa.me/263715484082" className="contact-link">
              +263 715 484 082
            </a>
          </div>
          <div className="card contact-card">
            <div className="icon">
              <i className="fi-rr-clock" aria-hidden="true" />
            </div>
            <h3>Office hours</h3>
            <p>
              Monday to Friday: 9:00 – 17:00
              <br />
              Saturday: 9:00 – 17:00
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="contact-note">
          <i className="fi-rr-info" aria-hidden="true" />
          <div>
            <strong>Before you call</strong>
            <p>
              Please have your document type and any reference details ready.
              For security, we may ask a few questions to confirm ownership
              before handing anything over.
            </p>
          </div>
        </div>

        <div className="btn-row" style={{ maxWidth: 280, margin: '32px auto 0' }}>
          <Link to="/" className="btn btn-primary btn-block">
            <i className="fi-rr-search" aria-hidden="true" />
            Back to search
          </Link>
        </div>
      </div>
    </section>
  );
}
