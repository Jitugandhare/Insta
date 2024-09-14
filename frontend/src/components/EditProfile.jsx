import React, { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SelectGroup } from '@radix-ui/react-select';

const EditProfile = () => {
    const { user } = useSelector(store => store.auth);
    const imageRef = useRef();

    return (
        <div className='flex max-w-2xl mx-auto pl-10'>
            <section className='flex flex-col gap-6 w-full my-8'>
                <h1 className='font-bold text-xl '>Edit Profile</h1>
                <div className='flex items-center justify-between text-xl bg-gray-100 rounded-xl p-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} alt="edit-profile" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-sm'>{user?.username}</h1>
                            <span className='text-gray-600'>{user?.bio}</span>
                        </div>
                    </div>
                    <input ref={imageRef} type="file" className='hidden' />
                    <Button onClick={() => imageRef?.current.click()} className="rounded bg-blue-500 hover:bg-blue-600 h-8">Change Photo</Button>
                </div>
                <div>
                    <h1 className='font-bold text-xl mb-2'>Bio</h1>
                    <Textarea name="bio" className="focus-visible:ring-transparent" />
                </div>
                <div>
                    <h1 className='font-bold mb-2 text-xl'>
                        Gender
                    </h1>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>

                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button className="w-fit bg-blue-600 rounded hover:bg-blue-700">Submit</Button>
                </div>
            </section>
        </div>
    )
}

export default EditProfile