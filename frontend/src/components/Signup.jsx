import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoding] = useState(false)
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            setLoding(true)
            const res = await axios.post("http://localhost:8080/user/register", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message);
                setInput({
                    username: "",
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
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])


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
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please Wait...
                        </Button>
                    ) : (
                        <Button type="submit">Signup</Button>
                    )
                }


                <span>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup;