import { useState } from 'react';
import { ALLOWED_TRANSITIONS, STATUS_COLORS } from '../constants';

// JobRow renders one job and its action buttons. Like JobForm 
export default function JobRow({ job, onStatusChange, onDelete }) {
  const [busy, setBusy] = useState(false);
  const [rowError, setRowError] = useState(null);

  const nextOptions = ALLOWED_TRANSITIONS[job.status] || [];

  async function handleTransition(nextStatus) {
    setBusy(true);
    setRowError(null);
    try {
      await onStatusChange(job.id, nextStatus);
    } catch (err) {
      setRowError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setBusy(true);
    setRowError(null);
    try {
      await onDelete(job.id);
    } catch (err) {
      setRowError(err.message);
      setBusy(false);
    }
  }

  return (
    <tr className="job-row">
      <td className="job-row__title">
        <div>{job.title}</div>
        <div className="job-row__type">{job.type}</div>
      </td>
      <td>
        <span
          className="badge"
          style={{ '--badge-color': STATUS_COLORS[job.status] }}
        >
          {job.status}
        </span>
      </td>
      <td className="job-row__created">
        {new Date(job.createdAt).toLocaleString()}
      </td>
      <td className="job-row__actions">
        {nextOptions.length === 0 && (
          <span className="job-row__terminal">no actions</span>
        )}
        {nextOptions.map((next) => (
          <button
            key={next}
            className="btn btn--small"
            disabled={busy}
            onClick={() => handleTransition(next)}
          >
            → {next}
          </button>
        ))}
        <button className="btn btn--small btn--danger" disabled={busy} onClick={handleDelete}>
          delete
        </button>
        {rowError && <div className="job-row__error">{rowError}</div>}
      </td>
    </tr>
  );
}
