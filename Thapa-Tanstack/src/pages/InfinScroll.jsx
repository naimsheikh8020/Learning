import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

const InfinScroll = () => {
    useInfiniteQuery({
        queryKey:["user"],
        queryFn:fetchUser,
    })
  return (
    <div>
        <h1>InfinScroll</h1>
    </div>
  )
}

export default InfinScroll