import axios from "axios";

const api = axios.create({
  baseURL: "https://client-e-commerce-store-backend.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("cart");
      // Instead of forcing to /login, just reload the page.
      // This turns them into a guest instantly while keeping them on the same page.
      window.location.reload();
    }
    return Promise.reject(error);
  }
);


export default api;
