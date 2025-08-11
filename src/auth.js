export function getStoredToken() {
  // Try localStorage first, then sessionStorage
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const expiry =
    localStorage.getItem("tokenExpiry") ||
    sessionStorage.getItem("tokenExpiry");

  if (!token || !expiry) return null;

  if (Date.now() > parseInt(expiry, 10)) {
    // Token expired - clean storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenExpiry");
    return null;
  }

  return token;
}
