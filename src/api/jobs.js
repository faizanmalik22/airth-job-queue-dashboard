
// API LAYER
const BASE_URL =import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}){
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  let body = null;

  try {
    body = await res.json();
  } catch {
    // No JSON response body
  }

  if (!res.ok) {
    const message =
      (body &&
        (Array.isArray(body.message)
          ? body.message.join(', ')
          : body.message)) ||
      `Request failed with status ${res.status}`;

    throw new Error(message);
  }

  return body;
}


// JOB APIs

// GET /jobs
// Returns: Job[]
export function fetchJobs(){
  return request('/jobs');
}

// POST /jobs
// JSON Server creates the id.
// We create status and date createdAt on the client for now.
export function createJob(payload){
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }),
  });
}

// PATCH /jobs/:id
// JSON Server updates the existing job.
export function updateJobStatus(id, status){
  return request(`/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
    }),
  });
}

// DELETE /jobs/:id
export function deleteJob(id) {
  return request(`/jobs/${id}`, {
    method: 'DELETE',
  });
} 