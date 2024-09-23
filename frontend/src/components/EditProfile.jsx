import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';

const EditProfile = () => {
    const { user } = useSelector(store => store.auth);
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender,  
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    };

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append('bio', input.bio);
        formData.append('gender', input.gender);

        if (input.profilePhoto && typeof input.profilePhoto !== 'string') {
            formData.append('profilePhoto', input.profilePhoto);
        }
       console.log(input.profilePhoto)

        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8080/user/profile/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePicture: res.data.user?.profilePicture,
                    gender: res.data.user.gender,
                };

                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
                
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex max-w-2xl mx-auto pl-10'>
            <section className='flex flex-col gap-6 w-full my-8'>
                <h1 className='font-bold text-xl'>Edit Profile</h1>
                <div className='flex items-center justify-between text-xl bg-gray-100 rounded-xl p-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} alt='edit-profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-sm'>{user?.username}</h1>
                            <span className='text-gray-600'>{user?.bio}</span>
                        </div>
                    </div>
                    <input name="profilePhoto" onChange={fileChangeHandler} ref={imageRef} type='file' className='hidden' />
                    <Button onClick={() => imageRef?.current.click()} className='rounded bg-blue-500 hover:bg-blue-600 h-8'>
                        Change Photo
                    </Button>
                </div>

                <div>
                    <h1 className='font-bold text-xl mb-2'>Bio</h1>
                    <Textarea
                        name='bio'
                        className='focus-visible:ring-transparent'
                        value={input.bio}
                        onChange={(e) => setInput({ ...input, bio: e.target.value })}
                    />
                </div>

                <div>
                    <h1 className='font-bold mb-2 text-xl'>Gender</h1>
                    <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select Gender' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='male'>Male</SelectItem>
                                <SelectItem value='female'>Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex justify-end'>
                    {loading ? (
                        <Button className='w-fit bg-blue-600 rounded hover:bg-blue-700'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                        </Button>
                    ) : (
                        <Button onClick={editProfileHandler} className='w-fit bg-blue-600 rounded hover:bg-blue-700'>
                            Submit
                        </Button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default EditProfile;
