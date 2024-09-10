import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialogue from './CommentDialogue'
const Post = () => {
  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog >
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center" >
            <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4957]  font-bold">Unfollow</Button>
            <Button variant="ghost" className="cursor-pointer w-fit   ">Add to favoutites</Button>
            <Button variant="ghost" className="cursor-pointer w-fit  ">Delete</Button>
          </DialogContent>
        </Dialog>
      </div>
      <img className='rounded-sm my-2 w-full aspect-square object-cover'

        src="data:image/jpeg;base64,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"
        alt="post_image" />


      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center gap-3'>
          <FaRegHeart size={'25px'} className='cursor-pointer' />
          <MessageCircle className='cursor-pointer hover:text-gray-600' />
          <Send className='cursor-pointer hover:text-gray-600' />
        </div>
        <Bookmark className='cursor-pointer hover text-gray-600' />
      </div>
      <span className='font-medium
      block mb-2'>1k likes</span>
      <p>
        <span className='font-medium mr-2'>username</span>
        caption
      </p>
      <span>View all 10 comments</span>
      <CommentDialogue/>
      <div className='flex'>
        <input type="text" 
        placeholder='Add a comment...'
        className='outline-none text-sm w-full' />
        <span className='text-[#259eee] font-bold' >Post</span>
      </div>
    </div>

  )
}

export default Post