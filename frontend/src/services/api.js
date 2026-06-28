import axios from "axios";

const API = axios.create({
  baseURL: "https://task-tracker-mern-dayh.onrender.com/api/tasks",
});

export default API;