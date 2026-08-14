
export const BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const TOKEN_KEY = "shopco_token";
const GUEST_KEY = "shopco_guestid";

export class BackendDownError extends Error {
  constructor() {
    super("Backend band hai. Doosre terminal me chalayein:  cd shopco-backend && npm run dev");
    this.backendDown = true;
  }
}


export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
  }
}

export function getGuestId() {
  try {
    let id = localStorage.getItem(GUEST_KEY);
    if (!id) {
      id = `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      localStorage.setItem(GUEST_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}


async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    guestid: getGuestId(),
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) headers.token = token;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new BackendDownError();
  }

  if (response.status === 502 || response.status === 503 || response.status === 504) {
    throw new BackendDownError();
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }
  return data;
}


export const api = {
  health: () => request("/health"),

  products: ({ section, style, limit } = {}) => {
    const q = new URLSearchParams();
    if (section) q.set("section", section);
    if (style) q.set("style", style);
    if (limit) q.set("limit", String(limit));
    return request(`/products?${q}`).then((data) => data.items);
  },
  product: (slug) => request(`/products/${slug}`),

  getCart: () => request("/cart"),
  addToCart: (body) => request("/cart", { method: "POST", body: JSON.stringify(body) }),
  updateCartItem: (id, quantity) =>
    request(`/cart/${id}`, { method: "PATCH", body: JSON.stringify({ quantity }) }),
  removeCartItem: (id) => request(`/cart/${id}`, { method: "DELETE" }),
  clearCart: () => request("/cart", { method: "DELETE" }),

  me: () => request("/profile"),
  login: (body) => request("/login", { method: "POST", body: JSON.stringify(body) }),
  signup: (body) => request("/signup", { method: "POST", body: JSON.stringify(body) }),
  logout: async () => ({ success: true }), 
};
