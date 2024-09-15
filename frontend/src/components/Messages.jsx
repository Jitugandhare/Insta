import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Messages = ({ selectedUser }) => {
    if (!selectedUser) {
        return <div className="p-4 text-center">No user selected</div>;
    }

    return (
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='text-center'>
                    <Avatar className="w-20 h-20 flex flex-col items-center justify-center mb-2 mx-auto">
                        <AvatarImage src={selectedUser?.profilePicture} alt={`${selectedUser?.username}'s profile picture`} />
                        <AvatarFallback className="flex items-center justify-center">CN</AvatarFallback>
                    </Avatar>
                    <span className='block text-lg font-medium'>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 my-2" variant="secondary">View Profile</Button>
                    </Link>
                </div>

            </div>
            <div className='flex flex-col gap-3'>
                {
                    [1, 2, 3, 4].map((msg) => {
                        return (
                            <div  className={`flex`}>
                                <div>
{msg}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Messages;
