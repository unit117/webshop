const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }
  return response.json();
}

export const api = {
  menu: (lang) => request(`/menu?lang=${lang}`),
  locations: (lang) => request(`/locations?lang=${lang}`),
  createOrder: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  listOrders: () => request('/orders'),
  updateOrderStatus: (orderId, status) =>
    request(`/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  createPaymentIntent: (payload) => request('/payments/intent', { method: 'POST', body: JSON.stringify(payload) }),
  recordPayment: (payload) => request('/payments/record', { method: 'POST', body: JSON.stringify(payload) }),
  adminMenuCreate: (payload) => request('/admin/menu', { method: 'POST', body: JSON.stringify(payload) }),
};
