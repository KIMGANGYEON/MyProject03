import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.PROD ? "" : "http://localhost:4000",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response);
    if (error.response.data.includes("jwt expired")) {
      alert("로그인이 만료됐습니다");
      window.location.reload();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
