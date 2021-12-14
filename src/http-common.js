import axios from "axios";

export default axios.create({
  baseUrl: process.env.baseURL || "http://localhost:3001",
  headers: {
    "Content-type": "application/json"
  }
});
