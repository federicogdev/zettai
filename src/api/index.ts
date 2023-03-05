import axios from "axios";

export const animesApi = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});
