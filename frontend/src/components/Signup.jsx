import React, { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const Signup = () => {

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

 const signupHandler=async(e)=>{
    e.preventDefault();
    console.log(input)
    try{
        const res=await axios.post("http://localhost:8080/user/register",input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res.data.success){
            toast.success(res.data.message);
        }

    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }
 }


    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4 ' >
                    <h1 className='text-center font-bold text-xl'>Logo</h1>
                    <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
                </div>
                <div>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        className="focus-visible:ring-transparent my-2"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}

                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="text"
                        className="focus-visible:ring-transparent my-2"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}

                    />
                </div>

                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        className="focus-visible:ring-transparent my-2"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}

                    />
                </div>
                <Button type="submit">Signup</Button>

            </form>
        </div>
    )
}

export default Signup;