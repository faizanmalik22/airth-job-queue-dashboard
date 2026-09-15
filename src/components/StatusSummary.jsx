import { STATUSES, STATUS_COLORS } from '../constants';

// StatusSummary shows a count per status and Total count of the job
export default function StatusSummary({ jobs }) {
  return (
    <div className="summary">
      {STATUSES.map((status) => {
        // got the array of matching job status get the length as count of that status job
        const count = jobs.filter((j) => j.status === status).length;
        return (
          <div key={status} className="summary__card">
            <span className="summary__dot" style={{ background: STATUS_COLORS[status] }} />
            <span className="summary__count">{count}</span>
            <span className="summary__label">{status}</span>
          </div>
        );
      })}
      <div className="summary__card summary__card--total">
        <span className="summary__count">{jobs.length}</span>
        <span className="summary__label">total</span>
      </div>
    </div>
  );
}
