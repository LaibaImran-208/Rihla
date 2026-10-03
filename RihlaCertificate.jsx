import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Printer, X } from 'lucide-react';
import { emirates } from './emirates';
import { passportStampAssets } from './passportStamps';
import heroImage from './bgbg.png';
import schoolHeader from './school_header_removed.png';
import './PassportCertificate.css';

const formatDate = value => value
  ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value))
  : '';

function CertificateArtwork({ profile, stamps, points, completedAt }) {
  const earnedStamps = emirates.filter(emirate => stamps.includes(emirate.id));
  return (
    <article className="certificate-paper print-certificate-only" aria-label={`Certificate of Completion awarded to ${profile.name}`}>
      <img className="certificate-backdrop" src={heroImage} alt="" aria-hidden="true" />
      <div className="certificate-veil" />
      <div className="certificate-frame">
        <div className="certificate-content">
          <header className="certificate-header">
            <div className="certificate-brand">
              <img src="/rihla_logo.png" alt="Rihla logo" />
              <div>
                <span className="certificate-brand-name">Rihla</span>
                <span className="certificate-brand-arabic" lang="ar" dir="rtl">رحلة</span>
              </div>
            </div>
            <img className="certificate-school" src={schoolHeader} alt="Abu Dhabi Indian School" />
            <p className="certificate-country">United Arab Emirates</p>
          </header>

          <section className="certificate-achievement">
            <p className="certificate-eyebrow">A journey of discovery</p>
            <h1>Certificate of Completion</h1>
            <p className="certificate-presented">This certificate is proudly presented to</p>
            <p className="certificate-recipient">{profile.name}</p>
            {profile.grade && (
              <p className="certificate-recipient-details">
                Grade / Class {profile.grade}
              </p>
            )}
            <p className="certificate-copy">
              for completing the Rihla UAE Explorer journey and discovering the culture, heritage,
              values, citizenship, sustainability and landmarks of the United Arab Emirates.
            </p>
          </section>

          <section className="certificate-proof" aria-label="Rihla Passport achievements">
            <div className="certificate-passport-heading">
              <div>
                <p className="certificate-eyebrow">Proof of journey</p>
                <h2>Rihla Passport</h2>
              </div>
              <div className="certificate-points"><strong>{points}</strong><span>Passport points</span></div>
            </div>
            <div className="certificate-stamps" aria-label={`${earnedStamps.length} emirate stamps earned`}>
              {earnedStamps.map(emirate => (
                <div className="certificate-stamp" key={emirate.id} title={`${emirate.name} stamp`}>
                  <img src={passportStampAssets[emirate.id]} alt={`${emirate.name} earned passport stamp`} />
                </div>
              ))}
            </div>
          </section>

          <footer className="certificate-footer">
            <span>Completed: {formatDate(completedAt)}</span>
            <span className="certificate-footer-mark">Explore <i /> Learn <i /> Belong</span>
          </footer>
        </div>
      </div>
    </article>
  );
}

export default function RihlaCertificatePreview({ open, onClose, profile, stamps, points, completedAt, onPrintInitiated }) {
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-preview-title" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="certificate-modal-panel">
        <header className="certificate-modal-header">
          <h2 id="certificate-preview-title">Rihla Certificate</h2>
          <div className="certificate-modal-actions">
            <button type="button" className="rihla-primary" onClick={() => { onPrintInitiated?.(); window.print(); }}><Printer size={17} aria-hidden="true" /> Print Certificate</button>
            <button type="button" className="certificate-close" aria-label="Close certificate preview" onClick={onClose}><X size={20} /></button>
          </div>
        </header>
        <CertificateArtwork profile={profile} stamps={stamps} points={points} completedAt={completedAt} />
      </div>
    </div>,
    document.body,
  );
}