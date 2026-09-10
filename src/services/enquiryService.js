import { apiClient } from './api';
import { ENDPOINTS } from './endpoints';

export function submitEnquiry(payload) {
  return apiClient.post(ENDPOINTS.ENQUIRIES, payload);
}
