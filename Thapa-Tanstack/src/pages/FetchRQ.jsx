import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0)
  
  const queryClient = useQueryClient()

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

  // Mutation Function to delete the post 

  const deleteMustaion = useMutation({
    mutationFn:(id)=> deletePost(id),
    onSuccess: (data, id)=>{
      queryClient.setQueryData(["posts",pageNumber],(currElem)=>{
        return currElem?.filter((post=> post.id !==id))
      })
      //  queryClient.invalidateQueries(["posts"]); -> this is the best approce for delete this logice refatche the  data 
    }
  })

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="section-accordion">
      
        <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <NavLink to={`/rq/${post.id}`}>
            <p>{post.id}</p>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            </NavLink>
            <button onClick={()=> deleteMustaion.mutate(post.id)}>Delete</button>
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
