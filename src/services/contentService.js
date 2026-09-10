import { apiClient } from './api';
import { ENDPOINTS } from './endpoints';

// One request returns every published row the site needs, already ordered.
export function fetchSiteContent(signal) {
  return apiClient.get(ENDPOINTS.CONTENT, { signal });
}
