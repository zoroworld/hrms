import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-ymb7.onrender.com/api/v1/",
});

export default api;
