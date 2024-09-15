import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';

const Messages = ({ selectedUser }) => {
    const { messages } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.auth);

    if (!selectedUser) {
        return <div className="p-4 text-center">No user selected</div>;
    }

    // Filter messages that are either sent or received by the selected user
    const validMessages = Array.isArray(messages)
        ? messages.filter(
              (msg) => (msg.senderId === user._id && msg.receiverId === selectedUser._id) ||
                       (msg.senderId === selectedUser._id && msg.receiverId === user._id)
          )
        : [];

    return (
        <div className="overflow-y-auto flex-1 p-4">
            <div className="flex justify-center">
                <div className="text-center">
                    <Avatar className="w-20 h-20 flex flex-col items-center justify-center mb-2 mx-auto">
                        <AvatarImage
                            src={selectedUser?.profilePicture}
                            alt={`${selectedUser?.username}'s profile picture`}
                        />
                        <AvatarFallback className="flex items-center justify-center">CN</AvatarFallback>
                    </Avatar>
                    <span className="block text-lg font-medium">{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 my-2" variant="secondary">
                            View Profile
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {validMessages.length > 0 ? (
                    validMessages.map((msg, index) => (
                        <div className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`} key={index}>
                            <div className="bg-gray-100 p-2 rounded">{msg.message}</div>
                        </div>
                    ))
                ) : (
                    <div>No messages available</div>
                )}
            </div>
        </div>
    );
};

export default Messages;
