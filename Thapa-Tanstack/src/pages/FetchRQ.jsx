import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const {
    data: posts = [], 
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts",pageNumber],
    queryFn: ()=> fetchPosts(pageNumber), 
    // staleTime: 1000,
    // gcTime:1000,
    retry: 2, 
    placeholderData:keepPreviousData,
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
      <div className="pagination-section container">
        <button disabled={pageNumber === 0 ? true : false} onClick={()=>setPageNumber((prev)=>prev -3)}>Prev</button>
        <h2 className="text-white text-2xl">{(pageNumber/3) + 1}</h2>
        <button onClick={()=>setPageNumber((prev)=>prev +3)}>Next</button>
      </div>
      
    </section>
  );
};

export default FetchRQ;
