import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useParams } from 'react-router-dom'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const { userProfile } = useSelector(store => store.auth);
  console.log(userProfile)
  useGetUserProfile(userId)
  const isLoggedUserProfile = true;
  const isFollowing = false;


  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className="h-32 w-32">
              <AvatarImage src={userProfile?.profilePicture} alt="profilePicture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5' >
              <div className='flex items-center gap-2'>
                <span>{userProfile?.username}</span>
                {
                  isLoggedUserProfile ? (
                    <>
                      <Button variant="secondary" className="hover:bg-gray-200 h-8">Edit Profile</Button>
                      <Button variant="secondary" className="hover:bg-gray-200 h-8">View Archives</Button>
                      <Button variant="secondary" className="hover:bg-gray-200 h-8">Ad Tools</Button>
                    </>
                  ) : (

                    isFollowing ? (
                      <>
                        <Button variant="secondary" className="bg-gray-300 hover:bg-gray-400 h-8 text-black">Unfollow</Button>
                        <Button variant="secondary" className="bg-gray-300 hover:bg-gray-400 h-8 text-black">Message</Button>
                      </>
                    ) :
                      (
                        <Button className="bg-[#0095F6] hover:bg-[#0775bf] h-8">Follow</Button>

                      )


                  )
                }
              </div>

            </div>
          </section>
        </div>
      </div>


    </div>
  )
}

export default Profile