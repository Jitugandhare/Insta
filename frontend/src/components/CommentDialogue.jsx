import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

const CommentDialogue = ({ open, setOpen }) => {

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} >
                <img
                    src="https://feeds.abplive.com/onecms/images/uploaded-images/2022/09/26/5b4bff5a351f4c651461745787d076a81664166935443145_original.jpg"
                    alt="post_image"

                />
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialogue