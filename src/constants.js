// Single source of truth for status values and legal transitions.
export const STATUSES = ['pending', 'running', 'completed', 'failed'];

// key = current status, value = statuses it may move to
export const ALLOWED_TRANSITIONS = {
  pending: ['running'],
  running: ['completed', 'failed'],
  completed: [],
  failed: [],
};

export const STATUS_COLORS = {
  pending: '#d9a441',
  running: '#3d7fd9',
  completed: '#3fae6a',
  failed: '#d95f4a',
};
