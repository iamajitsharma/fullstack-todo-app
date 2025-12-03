import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fullstack-todo-app-8709.onrender.com/api/v1",
});

export default axiosInstance;
