import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { dynamicContent } from '../../api/api'

const DynamicPage = () => {
  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => dynamicContent(id)
  });

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>Error fetching data</h1>

  return (
    <div className='section-accordion'>
      <h1>DynamicPage {id}</h1>
      <h2 className='text-3xl text-center text-white'>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  )
}

export default DynamicPage
