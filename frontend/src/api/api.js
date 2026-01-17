import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-ymb7.onrender.com/",
});

export default api;
