import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback } from './ui/avatar';

const Chatpage = () => {
    const { user, suggestedUsers } = useSelector(store => store.auth);
    const dispatch = useDispatch();


    return (
        <div className='flex ml-[18%] h-screen'>
            <section>
                <h1 className='font-bold mb-4 px-3 text-xl' >{user?.username}</h1>

                <hr className='mb-4 border-gray-300' />
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers?.length > 0 ? (
                            suggestedUsers.map((suggestedUser) => (
                                <div key={suggestedUser._id} className="flex items-center mb-4">
                                    <Avatar>
                                        <AvatarImag src={suggestedUser?.profilePicture} alt="suggested-user" />
                                        <AvatarFallback>{suggestedUser?.username?.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <div className="ml-4">
                                        <span className="font-bold">{suggestedUser?.username}</span>
                                        <span className="text-sm text-gray-500 ml-2">online</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No suggested users found.</p>
                        )
                    }
                </div>

            </section>
        </div>
    )
}

export default Chatpage