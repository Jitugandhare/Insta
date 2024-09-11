import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { ArrowUp, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialogue = ({ open, setOpen }) => {

const [text,setText]=useState("");


const changeEventHandler=(e)=>{
    const inputText=e.target.value;
    if(inputText.trim()){
        setText(inputText)
    }else{
        setText("");
    }
}

const sendMessageHandler=async(e)=>{
    // e.preventDefault()
    alert(text)

}
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w6xl p-0 flex flex-col" >
                <div className='flex flex-1'>
                    <div className='w-1/2' >
                        <img
                            src="https://feeds.abplive.com/onecms/images/uploaded-images/2022/09/26/5b4bff5a351f4c651461745787d076a81664166935443145_original.jpg"
                            alt="post_image"
                            className='w-full h-full object-cover rounded-l-lg'
                        />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='p-4 flex items-center justify-between '>
                            <div className='flex gap-3 items-center'>
                                <Link >
                                    <Avatar>
                                        <AvatarImage src="" alt="" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs'>username</Link>
                                    {/* <span>Bio</span> */}
                                </div>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center" >
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold' >
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full '>
                                        Add to favourite
                                    </div>
                                </DialogContent>

                            </Dialog>

                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            comments aayenge
                        </div>
                        <div className='p-4 flex items-center gap-2'>
                            <input
                                type="text"
                                placeholder='Add comments'
                                value={text}
                                onChange={changeEventHandler}
                                className='w-full outline-none border border-gray-300 p-2 rounded'
                            />
                            <Button disabled={!text.trim()} variant="outline" onClick={sendMessageHandler} className="bg-blue-500 text-white hover:bg-blue-700 border-blue-500 rounded-full">
                                <ArrowUp />
                            </Button>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialogue