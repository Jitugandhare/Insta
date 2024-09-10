import { Heart, Home, icons, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



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
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ), text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },



]


const Sidebar = () => {
    const navigate = useNavigate();

    const logOutHandler = async () => {

        try {

            const res = await axios.get("http://localhost:8080/user/logout", { withCredentials: true });
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const sideBarHandler = (textType) => {
        if (textType === "Logout") logOutHandler();

    }

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
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar