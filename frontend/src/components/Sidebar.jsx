import { Heart, Home, icons, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPosts } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'





const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth)
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();


    const logOutHandler = async () => {

        try {

            const res = await axios.get("http://localhost:8080/user/logout", { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null))
                dispatch(setSelectedPosts(null));
                dispatch(setPosts([]))
                navigate("/login")
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const createPostHandler = () => {
        setOpen(true)
    }








    const sideBarHandler = (textType) => {
        if (textType === "Logout") {
            logOutHandler();
        } else if (textType === "Create") {
            createPostHandler();
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`)
        } else if (textType === "Home") {
            navigate("/")
        } else if (textType === "Messages") {
            navigate("/chat")
        }

    }
    const sideBarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ), text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },



    ]

    return (
        <div className='fixed top-0 z-10 left-8 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <h1 className='my-8 pl-3 font-bold text-xl'>Logo</h1>
                <div>
                    {
                        sideBarItems.map((i, index) => {
                            return (
                                <div key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg py-3 my-3' onClick={() => sideBarHandler(i.text)}>
                                    {i.icon}
                                    <span>
                                        {i.text}
                                    </span>
                                    {i.text === "Notifications" && likeNotification > 0 && (
                                        <Popover>
                                            <PopoverTrigger asChild>

                                                <Button size="icon" className="rounded-full h-5 w-5 absolute bottom-6 left-6" >{likeNotification.length}</Button>

                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div>
                                                    {
                                                        likeNotification.length===0 ? (
                                                            <p>No new Notification</p>
                                                        ) : (
                                                            likeNotification.map((notification)=>{
                                                                return (
                                                                    <div key={notification.userId}>
                                                                            <Avatar>
                                                                                <AvatarImage src={notification.userDetails?.profilePicture}/>
                                                                            </Avatar>
                                                                            <p>{notification.userDetails?.username} <span>liked your post</span> </p>
                                                                    </div>
                                                                )
                                                            })
                                                        )
                                                    }
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </div>
    )
}

export default Sidebar