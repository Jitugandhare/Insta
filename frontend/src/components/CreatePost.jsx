import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const dispatch = useDispatch();

    const createPostHandler = async () => {
        const formData = new FormData();
        formData.append("caption", caption);
        if (imagePreview) {
            formData.append("image", file);
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8080/post/addpost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating post");
        } finally {
            setLoading(false);
        }
    };

    const fileHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataurl = await readFileAsDataURL(file);
            setImagePreview(dataurl);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
                <div className="flex items-center gap-3 my-4">
                    <Avatar>
                        {/* Check if the user object exists and if profilePicture is available */}
                        <AvatarImage src={user?.profilePicture || 'https://via.placeholder.com/150'} alt="profilePicture" />
                        <AvatarFallback>{user?.username?.charAt(0) || 'CN'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>{user?.username || "Unknown User"}</h1>
                        <span className='text-gray-500 text-xs'>Bio...</span>
                    </div>
                </div>

                <Textarea 
                    value={caption} 
                    onChange={(e) => setCaption(e.target.value)} 
                    className="focus-visible:ring-transparent border-none" 
                    placeholder="Write caption..." 
                />

                {imagePreview && (
                    <div className='w-full h-64 items justify-center'>
                        <img src={imagePreview} alt="image_preview" className='object-cover h-full w-full' />
                    </div>
                )}

                <input ref={imageRef} onChange={fileHandler} type="file" className='hidden' />
                <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#1274b6] hover:bg-[#023658]">Select from device</Button>

                {imagePreview && (
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        </Button>
                    ) : (
                        <Button onClick={createPostHandler} type="submit" className="mt-4 w-full bg-blue-500 text-white">Post</Button>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
