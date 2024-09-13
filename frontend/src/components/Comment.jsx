import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Comment = ({ com }) => {
    return (
        <div className="my-2 flex items-start gap-2">
            <Avatar>
                <AvatarImage src={com?.author?.profilePicture || '/default-avatar.png'} alt="Profile" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="font-bold text-sm">
                    {com?.author?.username || 'Unknown User'}
                    <span className="font-normal pl-1">
                        {com?.text || 'No comment text'}
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default Comment;
