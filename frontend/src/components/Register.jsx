import React, { useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
const [person, setPerson] = useState(null)
    const navigate = useNavigate();


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            const { data } = await axios.post('/api/register', formData);
            console.log("data is :" , data);

            if(data === String){
                return
            }

            toast.success("successfully registered");
            setLoading(false);
            setPerson(data)
            navigate('/');

        } catch (e) {
            setLoading(false);
            toast.error(e.response.data);
            console.error(e);
        }

    };
console.log("perosn is :" , person)

    return (
        <div className='w-full'>
            <Card>
                <CardHeader>
                    <CardTitle>Register With Your Info</CardTitle>
                    <CardDescription>Register With Your Info</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    onChange={handleInputChange}
                                    id="username" placeholder="Enter Your Username" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={handleInputChange}
                                    id="email" placeholder="Enter your Email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    onChange={handleInputChange}
                                    id="password" placeholder="Enter Your Password" />
                            </div>
                            <p className='text-sm'>if you have account plz  <Link to="/login" className='text-red-700 font-medium underline'>Login</Link></p>
                            <div className="flex flex-col space-y-1.5">
                                <Button>{loading ? "Registering..." : "register"}</Button>
                            </div>


                        </div>
                    </form>

                </CardContent>

            </Card>
        </div>

    );
}
