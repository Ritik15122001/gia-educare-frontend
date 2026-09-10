// Thin fetch wrapper for the public website. The site only ever reads content
// and posts enquiries, so there is no auth handling here.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://gia-educare-backend.onrender.com/api/v1';

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, { method = 'GET', body, headers, signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(payload?.message || `Request failed (${res.status})`, res.status, payload?.errors);
  }

  return payload?.data ?? payload;
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
