// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // <-- backend API URL-in burda olsun
  withCredentials: true, // <-- cookie üçün vacibdir
});

export default instance;
