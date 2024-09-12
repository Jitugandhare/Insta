import React from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const CreatePost = ({ open, setOpen }) => {
    const createPostHandler = async (e) => {
        e.preventDefault();
        try {

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
                <div className="flex items-center gap-3 my-4">
                    <Avatar>
                        <AvatarImage src="" alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>

            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
