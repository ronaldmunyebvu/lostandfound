import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api, maskNationalId, DOCUMENT_TYPES } from '../api.js';

const labelFor = (value) =>
  DOCUMENT_TYPES.find((d) => d.value === value)?.label || value;

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
};

export default function SearchResults() {
  const [params] = useSearchParams();
  const documentname = params.get('documentname') || '';
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setUsers(null);
    setError('');
    api
      .search({
        documentname,
        nationalid: params.get('nationalid') || '',
        fname: params.get('fname') || '',
        lname: params.get('lname') || '',
      })
      .then((res) => {
        setUsers(res.users || []);
        if (res.error) setError(res.error);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params, documentname]);

  const collectedCount =
    users?.filter((u) => u.status === 'Collected').length || 0;

  return (
    <section className="page">
      <div className="container">
        <div className="results-head">
          <div>
            <h2>Search results</h2>
            <p className="muted">
              Showing matches for <strong>{labelFor(documentname)}</strong>
            </p>
          </div>
          <Link to="/" className="btn btn-ghost">
            <i className="fi-rr-search" aria-hidden="true" />
            New search
          </Link>
        </div>

        {loading && (
          <div className="empty">
            <div className="spinner spinner-dark" />
            <p>Checking our records...</p>
          </div>
        )}

        {!loading && error && <div className="alert alert-error">{error}</div>}

        {!loading && !error && users && users.length === 0 && (
          <div className="empty">
            <div className="empty-icon">
              <i className="fi-rr-search" aria-hidden="true" />
            </div>
            <h3>No match found yet</h3>
            <p>
              We could not find a document with those details. Double-check the
              spelling, or try searching with a different name or number.
            </p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
              <i className="fi-rr-refresh" aria-hidden="true" />
              Try another search
            </Link>
          </div>
        )}

        {!loading && users && users.length > 0 && (
          <>
            <div className="alert alert-success">
              <i className="fi-rr-badge-check" aria-hidden="true" />
              Good news. We found {users.length} possible match
              {users.length === 1 ? '' : 'es'}.
              {collectedCount === users.length
                ? ' This document has already been collected.'
                : collectedCount > 0
                  ? ' Some of these documents have already been collected; check the status of each result below.'
                  : ' Please contact us to arrange collection.'}
            </div>
            {users.map((u, i) => (
              <div className="result-card" key={`${u.status}-${u.id || i}`}>
                <div className="result-avatar">
                  {(u.fname || '?').charAt(0).toUpperCase()}
                  {(u.lname || '').charAt(0).toUpperCase()}
                </div>
                <div className="result-body">
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-user" aria-hidden="true" /> First name
                    </strong>
                    <span>{u.fname}</span>
                  </div>
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-users" aria-hidden="true" /> Surname
                    </strong>
                    <span>{u.lname}</span>
                  </div>
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-id-badge" aria-hidden="true" /> National
                      ID / Passport
                    </strong>
                    <span>{maskNationalId(u.nationalid)}</span>
                  </div>
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-map-marker" aria-hidden="true" /> Location
                    </strong>
                    <span>{u.location}</span>
                  </div>
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-document" aria-hidden="true" /> Document
                    </strong>
                    <span className="result-badge">
                      {labelFor(u.documentname)}
                    </span>
                  </div>
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-badge-check" aria-hidden="true" /> Status
                    </strong>
                    <span
                      className={
                        u.status === 'Collected'
                          ? 'status-badge status-collected'
                          : 'status-badge status-available'
                      }
                    >
                      {u.status === 'Collected'
                        ? `Collected${u.collected_at ? ` on ${formatDate(u.collected_at)}` : ''}`
                        : 'Available for collection'}
                    </span>
                  </div>
                  <div className="result-meta">
                    <strong>
                      <i className="fi-rr-phone-call" aria-hidden="true" /> Contact
                    </strong>
                    <span>{u.contactnumber}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="result-help">
              <i className="fi-rr-info" aria-hidden="true" />
              <p>
                To collect your document, please bring proof of identity and
                contact our team on{' '}
                <a href="https://wa.me/263715484082">+263 715 484 082</a> or{' '}
                <a href="mailto:rmmunyebvu@gmail.com">email us</a>.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
