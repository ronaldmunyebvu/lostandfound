import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOCUMENT_TYPES, ID_REQUIRED_TYPES } from '../api.js';

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    documentname: '',
    nationalid: '',
    fname: '',
    lname: '',
  });
  const [error, setError] = useState('');

  const showNationalId = ID_REQUIRED_TYPES.includes(form.documentname);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'documentname') {
      setForm((prev) => ({ ...prev, nationalid: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.documentname) {
      setError('Please choose the type of document you are looking for.');
      return;
    }
    if (!form.nationalid && !form.fname && !form.lname) {
      setError('Please enter your ID number, first name, or surname.');
      return;
    }
    setError('');
    const qs = new URLSearchParams({
      documentname: form.documentname,
      nationalid: form.nationalid,
      fname: form.fname,
      lname: form.lname,
    });
    navigate(`/results?${qs.toString()}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="chip">
            <i className="fi-rr-hand-holding-heart" aria-hidden="true" />
            Reuniting people with their documents
          </span>
          <h1>Lost something important? Let&apos;s help you find it.</h1>
          <p>
            If your ID, passport, licence, or certificate has gone missing,
            start here. Search the documents that have been handed in and see
            whether yours is waiting to be collected.
          </p>
          <div className="hero-points">
            <span>
              <i className="fi-rr-check" aria-hidden="true" /> Free to search
            </span>
            <span>
              <i className="fi-rr-check" aria-hidden="true" /> Safe and private
            </span>
            <span>
              <i className="fi-rr-check" aria-hidden="true" /> Real people ready to help
            </span>
          </div>
        </div>
      </section>

      <div className="search-panel">
        <div className="search-heading">
          <div className="search-icon">
            <i className="fi-rr-search" aria-hidden="true" />
          </div>
          <div>
            <h2>Search for your document</h2>
            <p>Choose a document type, then add any details you remember.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-error">{error}</div>}

          <div className="field">
            <label htmlFor="documentType">
              <i className="fi-rr-document" aria-hidden="true" />
              Document type
            </label>
            <select
              id="documentType"
              name="documentname"
              value={form.documentname}
              onChange={handleChange}
              required
            >
              <option value="">Select a document type</option>
              {DOCUMENT_TYPES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="searchInput">
              <i className="fi-rr-id-badge" aria-hidden="true" />
              National ID or passport number
            </label>
            <input
              type="text"
              id="searchInput"
              name="nationalid"
              placeholder={
                showNationalId
                  ? 'Enter your ID or passport number'
                  : 'Optional for this document type'
              }
              autoComplete="off"
              value={form.nationalid}
              onChange={handleChange}
            />
          </div>

          <div className="grid-2">
            <div className="field">
              <label htmlFor="searchFname">
                <i className="fi-rr-user" aria-hidden="true" />
                First name
              </label>
              <input
                type="text"
                id="searchFname"
                name="fname"
                placeholder="e.g. Tendai"
                autoComplete="off"
                value={form.fname}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="searchLname">
                <i className="fi-rr-users" aria-hidden="true" />
                Surname
              </label>
              <input
                type="text"
                id="searchLname"
                name="lname"
                placeholder="e.g. Moyo"
                autoComplete="off"
                value={form.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          <p className="form-hint">
            <i className="fi-rr-info" aria-hidden="true" />
            No ID number? No problem. Search with your first name and surname
            instead.
          </p>

          <button type="submit" className="btn btn-primary btn-block">
            <i className="fi-rr-search" aria-hidden="true" />
            Search documents
          </button>
        </form>
      </div>

      <section className="section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat">
              <i className="fi-rr-folder-open" aria-hidden="true" />
              <div>
                <strong>Documents safely kept</strong>
                <span>Every item is logged and protected</span>
              </div>
            </div>
            <div className="stat">
              <i className="fi-rr-clock" aria-hidden="true" />
              <div>
                <strong>Quick response</strong>
                <span>We aim to reply the same working day</span>
              </div>
            </div>
            <div className="stat">
              <i className="fi-rr-shield-check" aria-hidden="true" />
              <div>
                <strong>Privacy first</strong>
                <span>Your ID details are never shown in full</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-title">
            <h2>How it works</h2>
            <p>
              Three simple steps between you and the document you thought you
              had lost for good.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="icon">
                <i className="fi-rr-search" aria-hidden="true" />
              </div>
              <span className="step-number">Step 1</span>
              <h3>Search our records</h3>
              <p>
                Tell us the document type and any details you remember. We will
                check the documents that have been handed in.
              </p>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fi-rr-clipboard-check" aria-hidden="true" />
              </div>
              <span className="step-number">Step 2</span>
              <h3>Verify it is yours</h3>
              <p>
                If we find a match, our team will ask a few simple questions to
                confirm that the document belongs to you.
              </p>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fi-rr-hand-holding-heart" aria-hidden="true" />
              </div>
              <span className="step-number">Step 3</span>
              <h3>Collect with confidence</h3>
              <p>
                Arrange a safe collection point and time, then take your
                document home. No stress, no unnecessary costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div className="cta-text">
              <span className="chip chip-light">
                <i className="fi-rr-comments" aria-hidden="true" />
                We are here for you
              </span>
              <h2>Not sure where to start?</h2>
              <p>
                Send us a message and a real person will guide you through the
                search. We are happy to help, even if you only have a few
                details.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => navigate('/contact')}
            >
              <i className="fi-rr-envelope" aria-hidden="true" />
              Talk to our team
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
