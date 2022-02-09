import axios from "axios";

const gateway = axios.create({
  baseURL: "http://localhost:3002",
});

export default gateway;

