import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import Messages from './Messages';

const Chatpage = () => {
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUser } = useSelector(store => store.chat);

    const dispatch = useDispatch();

    return (
        <div className='flex ml-[18%] h-screen'>
            {/* Sidebar for suggested users */}
            <section className="w-1/4 border-r border-gray-300 p-3">
                <h1 className='font-bold mb-4 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />

                <div className='overflow-y-auto h-[80vh]'>
                    {suggestedUsers?.length > 0 ? (
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUser?.includes(suggestedUser?._id) ?? false;

                            return (
                                <div
                                    key={suggestedUser._id}
                                    className="flex items-center mb-4 p-3 cursor-pointer hover:bg-gray-50"
                                    onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                >
                                    <Avatar>
                                        <AvatarImage src={suggestedUser?.profilePicture} alt="suggested-user" />
                                        <AvatarFallback>{suggestedUser?.username?.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <div className="ml-4 flex flex-col">
                                        <span className="font-bold">{suggestedUser?.username}</span>
                                        <span className={`text-sm font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
                                            {isOnline ? "online" : "offline"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No suggested users found.</p>
                    )}
                </div>
            </section>

            {/* Chat section */}
            {selectedUser ? (
                <section className='flex-1 flex flex-col h-full justify-center'>
                    {/* Chat Header */}
                    <div className='flex items-center gap-3 p-4 border-b border-gray-300 bg-white sticky top-0 z-10'>
                        <Avatar className="w-14 h-14 flex items-center justify-center">
                            <AvatarImage src={selectedUser?.profilePicture} alt="selected-user" />
                            <AvatarFallback>{selectedUser?.username?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className='font-bold text-lg'>{selectedUser?.username}</span>
                    </div>

                    {/* Chat Messages Area */}
                    <Messages selectedUser={selectedUser} />

                    {/* Chat Input */}
                    <div className='p-4 border-t border-gray-300 bg-white'>
                        <div className='flex gap-2'>
                            <Input type="text" placeholder="Message..." className="flex-1 focus-visible:ring-transparent" />
                            <Button type="submit">Send</Button>
                        </div>
                    </div>
                </section>
            ) : (
                <div className='flex-1 flex items-center justify-center'>
                    <MessageCircle className='w-32 h-32 my-4' />
                    <h1 className="text-2xl">Select a user to start chatting</h1>
                </div>
            )}
        </div>
    );
};

export default Chatpage;
