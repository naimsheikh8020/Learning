import React, { useEffect } from 'react'
import { fetchPosts } from '../api/api';

const FetchOld = () => {
  const [posts, setPosts] = React.useState([])
  
  const getPostsData = async ()=>{
    try {
      const res = await fetchPosts();
      console.log(res);
      res.status === 200 ? setPosts(res.data): [];
    } catch (error) {
      console.log(error);
      return []
    }
  }

  useEffect(()=>{
    getPostsData()
  },[])

  return (
    <div>
      <ul className='section-accordion'>
        {
          posts?.map((curElem)=>{
            return (
              <li key={curElem.id}>
                <p>{curElem.title}</p>
                <p>{curElem.body}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FetchOld