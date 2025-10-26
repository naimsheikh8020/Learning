// src/pages/FetchRQ.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

const FetchRQ = () => {
  const {
    data: posts = [],   // ✅ Default to empty array (avoids undefined)
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts, // ✅ API call separated from UI
    staleTime: 1000 * 60 * 5, // ✅ Cache fresh for 5 mins
    retry: 2, // ✅ Retry failed requests twice
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="section-accordion">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FetchRQ;
