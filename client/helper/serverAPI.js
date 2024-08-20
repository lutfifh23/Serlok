import axios from "axios";

const serverAPI = axios.create({
  baseURL: "https://3.107.46.1",
});

export default serverAPI;
