// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (pageNumber) => {
  const { data:postData } = await api.get(`/posts?_start=${pageNumber}&_limit=5`);
  return postData;
};


export const dynamicContent = async (id)=>{
  const {data: dynamicContent} = await api.get(`/posts/${id}`)
  return dynamicContent
}