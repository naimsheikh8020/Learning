// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async () => {
  const { data:postData } = await api.get("/posts");
  return postData;
};
