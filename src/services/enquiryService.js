import { apiClient } from './api';
import { ENDPOINTS } from './endpoints';

export function submitEnquiry(payload) {
  return apiClient.post(ENDPOINTS.ENQUIRIES, payload);
}

export function fetchCaptcha(signal) {
  return apiClient.get(ENDPOINTS.CAPTCHA, { signal });
}
