import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ com }) => {
    return (
        <div className='my-2'>
            <div>
                <Avatar>
                    <AvatarImage src={com?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='font-bold text-sm' >{com?.author.username} <span className='font-normal pl-1' >{com?.text}</span></h1>
            </div>
        </div>
    )
}

export default Comment