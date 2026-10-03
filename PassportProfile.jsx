import { useEffect, useState } from 'react';
import { Pencil, Save, UserRound, X } from 'lucide-react';

const emptyProfile = { name: '', age: '', grade: '' };

export default function PassportProfile({ profile = emptyProfile, onSave, editing, setEditing }) {
  const [values, setValues] = useState({ ...emptyProfile, ...profile });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({ ...emptyProfile, ...profile });
    setErrors({});
  }, [profile, editing]);

  const updateField = event => {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: '' }));
  };

  const submit = event => {
    event.preventDefault();
    const nextErrors = {};
    const name = values.name.trim();
    const age = Number(values.age);
    if (!name) nextErrors.name = 'Enter the explorer’s full name.';
    else if (name.length > 80) nextErrors.name = 'Name must be 80 characters or fewer.';
    if (!values.age.trim()) nextErrors.age = 'Enter the explorer’s age.';
    else if (!/^\d+$/.test(values.age.trim()) || age < 5 || age > 25) nextErrors.age = 'Enter an age from 5 to 25.';
    if (values.grade.trim().length > 30) nextErrors.grade = 'Grade / Class must be 30 characters or fewer.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({
      name,
      age: String(age),
      grade: values.grade.trim(),
    });
    setEditing(false);
  };

  const cancel = () => {
    setValues({ ...emptyProfile, ...profile });
    setErrors({});
    setEditing(false);
  };

  return (
    <section className="passport-profile" id="explorer-details" aria-labelledby="passport-profile-title">
      <div className="passport-section-heading">
        <div>
          <span className="rihla-kicker">Explorer details</span>
          <h2 id="passport-profile-title">Your Explorer Details</h2>
        </div>
        {profile.name && !editing && (
          <button type="button" className="passport-edit-button" onClick={() => setEditing(true)}>
            <Pencil size={16} aria-hidden="true" /> Edit Details
          </button>
        )}
      </div>

      {profile.name && !editing ? (
        <div className="profile-saved-card">
          <span className="profile-avatar" aria-hidden="true"><UserRound size={24} /></span>
          <div className="profile-saved-details">
            <h3>{profile.name}</h3>
            <div className="profile-detail-list">
              <span>Age {profile.age}</span>
              {profile.grade && <span>Grade / Class {profile.grade}</span>}
            </div>
          </div>
        </div>
      ) : (
        <form className="profile-form" onSubmit={submit} noValidate>
          <p className="profile-form-note"><span aria-hidden="true">*</span> Required fields</p>
          <div className="profile-form-grid">
            <label className="profile-field" htmlFor="profile-name">
              <span>Full Name <b aria-hidden="true">*</b></span>
              <input id="profile-name" name="name" autoComplete="name" value={values.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'profile-name-error' : undefined} required />
              {errors.name && <small className="profile-field-error" id="profile-name-error">{errors.name}</small>}
            </label>
            <label className="profile-field" htmlFor="profile-age">
              <span>Age <b aria-hidden="true">*</b></span>
              <input id="profile-age" name="age" type="number" min="5" max="25" step="1" inputMode="numeric" value={values.age} onChange={updateField} aria-invalid={Boolean(errors.age)} aria-describedby={errors.age ? 'profile-age-error' : undefined} required />
              {errors.age && <small className="profile-field-error" id="profile-age-error">{errors.age}</small>}
            </label>
            <label className="profile-field" htmlFor="profile-grade">
              <span>Grade / Class <small>Optional</small></span>
              <input id="profile-grade" name="grade" maxLength={40} value={values.grade} onChange={updateField} aria-invalid={Boolean(errors.grade)} aria-describedby={errors.grade ? 'profile-grade-error' : undefined} />
              {errors.grade && <small className="profile-field-error" id="profile-grade-error">{errors.grade}</small>}
            </label>
          </div>
          <div className="profile-form-actions">
            <button type="submit" className="rihla-primary"><Save size={17} aria-hidden="true" /> {profile.name ? 'Save Changes' : 'Save Details'}</button>
            {profile.name && editing && <button type="button" className="rihla-secondary" onClick={cancel}><X size={17} aria-hidden="true" /> Cancel</button>}
          </div>
        </form>
      )}
    </section>
  );
}