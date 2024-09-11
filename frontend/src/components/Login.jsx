import React, { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {

    const [input, setInput] = useState({

        email: "",
        password: ""
    });
    const [loading, setLoding] = useState(false)
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            setLoding(true)
            const res = await axios.post("http://localhost:8080/user/login", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                navigate('/')
                toast.success(res.data.message);
                setInput({

                    email: "",
                    password: ""
                })
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoding(false);
        }
    }


    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={loginHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4 ' >
                    <h1 className='text-center font-bold text-xl'>Logo</h1>
                    <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
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
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please Wait...
                        </Button>
                    ) : (
                        <Button type="submit">Login</Button>
                    )
                }

                <span>Doesn't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    )
}

export default Login;