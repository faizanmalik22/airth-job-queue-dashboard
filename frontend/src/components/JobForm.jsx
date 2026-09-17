import { useState } from 'react';

export default function JobForm({ onCreate, disabled }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !type.trim()) return;

    setSubmitting(true);
    try {
     
      await onCreate({ title: title.trim(), type: type.trim() });
      setTitle('');
      setType('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        className="job-form__input"
        placeholder="Job title (e.g. Resize product images)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={disabled || submitting}
      />
      <input
        className="job-form__input"
        placeholder="Job type (e.g. image-processing)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        disabled={disabled || submitting}
      />
      <button type="submit" className="btn btn--primary" disabled={disabled || submitting}>
        {submitting ? 'Adding…' : 'Create job'}
      </button>
    </form>
  );
}
