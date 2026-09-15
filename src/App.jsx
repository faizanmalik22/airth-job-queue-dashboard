import { useEffect, useMemo, useState } from 'react';
import { fetchJobs, createJob, updateJobStatus, deleteJob } from './api/jobs';
import JobForm from './components/JobForm';
import StatusSummary from './components/StatusSummary';
import StatusFilterTabs from './components/StatusFilterTabs';
import JobTable from './components/JobTable';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  async function loadJobs() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

//load the jobs when App first time mount
  useEffect(() => {
    loadJobs();
  }, []);


  async function handleCreate(payload) {
    await createJob(payload);
    await loadJobs(); // refresh so the new job (with server-assigned id/createdAt) shows up
  }

  //UPDATE STATUS 
  async function handleStatusChange(id, nextStatus) {
    await updateJobStatus(id, nextStatus);
    await loadJobs();
  }

  // DELETE 
  async function handleDelete(id) {
    await deleteJob(id);
    await loadJobs();
  }

  // DERIVED DATA 
  const filteredJobs = useMemo(() => {
    if (filter === 'all') return jobs;
    return jobs.filter((j) => j.status === filter);
  }, [jobs, filter]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Job Queue</h1>
        <p className="app__subtitle">Create, track, and move jobs through their lifecycle.</p>
      </header>

      <StatusSummary jobs={jobs} />

      <JobForm onCreate={handleCreate} disabled={loading} />

      {error && (
        <div className="banner banner--error">
          Couldn't reach the server: {error}
          <button className="btn btn--small" onClick={loadJobs}>Retry</button>
        </div>
      )}

      <StatusFilterTabs active={filter} onChange={setFilter} />

      <JobTable
        jobs={filteredJobs}
        loading={loading}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
