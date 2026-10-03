import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Brain, LockKeyhole, MapPin } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import PassportBook from '@/components/rihla/PassportBook';
import useJourney from '@/hooks/useJourney';
import { emirates } from './emirates';
import PassportProfile from './PassportProfile';
import RihlaCertificatePreview from './RihlaCertificate';
import './PassportCertificate.css';

export default function DigitalPassport() {
  const {
    exploredPlaces = [], stamps = [], points = 0, topicScores = {}, profile = {},
    saveProfile, journeyCompletedAt, recordActivity,
  } = useJourney();
  const [editingProfile, setEditingProfile] = useState(() => !profile.name);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const earnedEmirates = emirates.filter(emirate => stamps.includes(emirate.id));
  const remainingEmirates = emirates.filter(emirate => !stamps.includes(emirate.id));
  const journeyComplete = emirates.every(emirate => stamps.includes(emirate.id));
  const profileComplete = Boolean(profile.name?.trim() && profile.age);
  const openedRef = useRef(false);

  useEffect(() => {
    if (!openedRef.current) {
      openedRef.current = true;
      recordActivity('PASSPORT_OPENED');
    }
  }, [recordActivity]);

  const requestProfileEdit = () => {
    setEditingProfile(true);
    window.setTimeout(() => document.getElementById('explorer-details')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };

  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />
      <section className="px-5 pb-12 pt-36 text-center">
        <span className="rihla-kicker">Your journey, your achievement</span>
        <h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">Digital <span className="text-[#C8965A]">Passport</span></h1>
        <p className="rihla-subtitle">Every emirate you explore adds a stamp to your passport. Your progress is saved automatically on this device.</p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <PassportProfile profile={profile} onSave={saveProfile} editing={editingProfile} setEditing={setEditingProfile} />
        <PassportBook />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ['⭐', points, 'Points'],
            ['📍', exploredPlaces.length, 'Places'],
            ['🧠', Object.keys(topicScores).length, 'Topics'],
            ['🛂', `${stamps.length}/7`, 'Stamps'],
          ].map(([icon, value, label]) => (
            <div key={label} className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-5 text-center">
              <div className="text-2xl">{icon}</div>
              <b className="font-display text-2xl text-[#E8B97A]">{value}</b>
              <p className="text-xs uppercase tracking-wider text-[#8FA3BF]">{label}</p>
            </div>
          ))}
        </div>

        <section className="certificate-section" aria-labelledby="certificate-section-title">
          <div className="certificate-section-heading">
            {journeyComplete ? <Award size={27} aria-hidden="true" /> : <LockKeyhole size={25} aria-hidden="true" />}
            <h2 id="certificate-section-title">Rihla Certificate</h2>
          </div>
          <div className={`certificate-status-panel${journeyComplete && profileComplete ? ' is-ready' : ''}`}>
            <div className="certificate-status-copy">
              <h3>{journeyComplete && profileComplete ? 'Your certificate is ready.' : journeyComplete ? 'Complete your explorer details.' : 'Complete your Rihla journey to unlock your certificate.'}</h3>
              {journeyComplete && profileComplete ? (
                <p>Your seven emirate passport stamps are complete. Your certificate is personalized with your saved profile and passport progress.</p>
              ) : journeyComplete ? (
                <p>Add your full name and age to prepare your certificate. Grade / Class is optional.</p>
              ) : (
                <>
                  <p>Earn all seven emirate passport stamps to complete the Rihla journey. Your current passport has {earnedEmirates.length} of 7 stamps.</p>
                  {remainingEmirates.length > 0 && <p className="certificate-remaining">Still to explore: {remainingEmirates.map(emirate => emirate.name).join(', ')}.</p>}
                </>
              )}
            </div>
            {journeyComplete && profileComplete ? (
              <button type="button" className="rihla-primary" onClick={() => { recordActivity('CERTIFICATE_OPENED'); setCertificateOpen(true); }}>View Certificate <ArrowRight size={17} aria-hidden="true" /></button>
            ) : journeyComplete ? (
              <button type="button" className="rihla-primary" onClick={requestProfileEdit}>Enter Details <ArrowRight size={17} aria-hidden="true" /></button>
            ) : (
              <Link to="/emirates-explorer" className="rihla-secondary">Continue Exploring <ArrowRight size={17} aria-hidden="true" /></Link>
            )}
          </div>
        </section>
      </section>
      <RihlaCertificatePreview
        open={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        profile={profile}
        stamps={stamps}
        points={points}
        completedAt={journeyCompletedAt}
        onPrintInitiated={() => recordActivity('CERTIFICATE_PRINTED')}
      />
      <Footer />
    </main>
  );
}