import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Signup = () => {
    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form action="" className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4 ' >
                    <h1 className='text-center font-bold text-xl'>Logo</h1>
                    <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
                </div>
                <div>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        className="focus-visible:ring-transparent my-2"


                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="text"
                        className="focus-visible:ring-transparent my-2"


                    />
                </div>
                
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        className="focus-visible:ring-transparent my-2"


                    />
                </div>
                <Button>Signup</Button>

            </form>
        </div>
    )
}

export default Signup;