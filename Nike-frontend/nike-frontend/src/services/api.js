const API_BASE = "http://localhost:3000/api";

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) throw new Error("Request failed");
  return data;
}

export async function getProducts() {
  return request("/products", {
    method: "GET",
  });
}

export async function createOrder(orderData) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export async function getOrders() {
  return request("/orders", {
    method: "GET",
  });
}


export async function loginUser(formData) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function registerUser(formData) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}