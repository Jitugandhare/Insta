import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetsuggestedUsers'
import SuggestedUsers from './SuggestedUsers'


const Home = () => {
  useGetSuggestedUsers();
  useGetAllPost();

  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    

    </div>
  )
}

export default Home