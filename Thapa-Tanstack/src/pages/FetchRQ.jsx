// src/pages/FetchRQ.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";
import { NavLink } from "react-router-dom";

const FetchRQ = () => {
  const {
    data: posts = [], 
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts, 
    // staleTime: 1000,
    // gcTime:1000,
    retry: 2, 
  });


  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="section-accordion">
      
        <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <NavLink to={`/rq/${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      
    </section>
  );
};

export default FetchRQ;
