// API LAYER
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let body = null;
  try {
    body = await res.json();
  } catch(err){
      console.log(err);
  }

  if (!res.ok) {
    const message =
      (body && (Array.isArray(body.message) ? body.message.join(', ') : body.message)) ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body;
}

// GET /jobs -> Job[]
export function fetchJobs() {
  return request('/jobs');
}

// POST /jobs -> Job
// payload: jobObj
export function createJob(payload) {
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// PATCH /jobs/:id/status -> Job
export function updateJobStatus(id, status) {
  return request(`/jobs/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteJob(id) {
  return request(`/jobs/${id}`, { method: 'DELETE' });
}
