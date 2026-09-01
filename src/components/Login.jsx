import React, { useState } from 'react'
//React Router
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from '../components'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//Appwrite authentication
import authService from '../appwrite/auth'


const Login = () => {
    //Hooks
    //Redux ko data bhejne ke liye.
    const dispatch = useDispatch()
    // → doosre route par jao
    const navigate = useNavigate()
    // → inputs ko React Hook Form se connect karo  → form submit handle karo
    const { register, handleSubmit } = useForm()
    //→ error message store karo
    const [error, setError] = useState(null);

    const login = async (data) => {
        setError("")
        try {

            //Appwrite login
            const session = await authService.login(data)
            if (session) {

                //Current logged-in user ka data Appwrite se lao.
                const userData = await authService.getCurrentUser()
                if (data) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-4'>
                    <div className='space-y-5'>
                        <Input
                            placeholder='enter your email'
                            label="Email: "
                            type='email'
                            {...register("email",
                                // options
                                {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Email address must e a valid address"
                                    }
                                })}
                        />
                        <Input
                            label="Password: "
                            type="Password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button type="Submit" className="w-full" >Sign In</Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
