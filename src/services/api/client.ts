import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5099/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage on each request (keeps implementation simple)
apiClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

const API_DEBUG = import.meta.env.VITE_API_DEBUG === 'true';

if (API_DEBUG) {
  apiClient.interceptors.request.use(
    (config) => {
      try {
        console.debug('[api] Request:', config.method?.toUpperCase(), config.url, config.data);
      } catch (e) {
        /* ignore logging errors */
      }
      return config;
    },
    (err) => {
      console.error('[api] Request error:', err);
      return Promise.reject(err);
    }
  );

  apiClient.interceptors.response.use(
    (res) => {
      try {
        console.debug('[api] Response:', res.status, res.config.url, res.data);
      } catch (e) {
        /* ignore */
      }
      return res;
    },
    (err) => {
      try {
        console.error('[api] Response error:', err?.response?.status, err?.response?.config?.url, err?.response?.data);
      } catch (e) {
        /* ignore */
      }
      return Promise.reject(err);
    }
  );
}

export default apiClient;
