import axios from "axios";

const api = axios.create({
  baseURL: "https://642f0a422b883abc641d3911.mockapi.io",

  headers: {
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
