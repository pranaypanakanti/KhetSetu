const baseUrl = import.meta.env.VITE_BASE_URL;

export  async function apiFetch(endpoint, options = {}) {
  let token = localStorage.getItem("token");

  const fetchOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: "include", // important for refresh cookie
  };

  let response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);

  // If unauthorized → try refresh
  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();

        // Update token
        token = refreshData.accessToken;
        localStorage.setItem("token", token);

        // Retry original request
        fetchOptions.headers.Authorization = `Bearer ${token}`;

        response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);
      } else {
        // Refresh failed → logout
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
    } catch (err) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
  }

  return response;
}
