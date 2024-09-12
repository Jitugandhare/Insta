import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("")
    const createPostHandler = async (e) => {
        e.preventDefault();
        try {

        } catch (error) {
            console.log(error);
        }
    };


    const fileHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataurl = await readFileAsDataURL(file);
            setImagePreview(dataurl);

        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
                <div className="flex items-center gap-3 my-4">
                    <Avatar>
                        <AvatarImage src="" alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>Username</h1>
                        <span className='text-gray-500 text-xs'>Bio...</span>
                    </div>

                </div>
                <Textarea className="focus-visible:ring-transparent border-none" placeholder="Write caption..." />
                {
                    imagePreview && (
                        <div className='w-full h-64 items justify-center'>
                            <img src={imagePreview} alt="image_preview" className='object-cover h-full w-full'  />
                        </div>
                    )
                }

                <input ref={imageRef} onChange={fileHandler} type="file" className='hidden' />
                <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#1274b6] hover:bg-[#023658]">Select from device</Button>

            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
