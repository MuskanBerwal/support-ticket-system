import axios from "axios";

const API = axios.create({
 baseURL: "http://localhost:8000/api/tickets/"
});

export default API;   api .js