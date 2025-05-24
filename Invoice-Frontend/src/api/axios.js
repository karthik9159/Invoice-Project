// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axiosInstance;






// import axios from "axios";



// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/", // update if needed
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Automatically attach token to every request if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Token ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
