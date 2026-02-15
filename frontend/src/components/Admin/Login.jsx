import { useState } from 'react'
import { Navbar } from '../Navbar'
import { EyeOff,Eye } from 'lucide-react';
import Footer from '../Footer'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [islogin, issetlogin] = useState(false);
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        if (!islogin) {
            // Sign up
            try {
                const res = await fetch("http://localhost:5000/api/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                const result = await res.json();
                if (!res.ok) {
                    toast.error(result.message)
                }
                else {
                    toast.success("Sign up successfully")
                    navigate('/Message');
                    reset();
                }
            }
            catch (err) {
                toast.error(err.message)
            }
        }
        // Login
        else {
            try {
                const res = await fetch("http://localhost:5000/api/Login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                })
                const result = await res.json();
                if (!res.ok) {
                    toast.error(result.message)
                } else {
                    toast.success("Login successfully")
                    navigate('/Message')
                }
            }
            catch (err) {
                toast.error(err.message)
            }
        }
    };

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: "#16a34a",
                            color: "#fff",
                        },
                    },
                    error: {
                        style: {
                            background: "#dc2626",
                            color: "#fff",
                        },
                    },
                }}
            />
            <Navbar />
            <section className='py-35 h-screen bg-linear-to-bl from-gray-900 to-black'>
                <div className='max-w-7xl mx-auto px-5 lg:px-12 flex justify-center items-center'>
                    <div className='bg-white/10 backdrop-blur-[10px] border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.08)] rounded-lg p-10 w-2xl'>
                        <h2 className='text-4xl text-center py-10 text-white/70'>{islogin ? "Login" : "sign up"}</h2>
                        <form className='space-y-4' action="" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className='text-white/70 text-xl mb-2 block px-4'>Name</label>
                                <input type="text" {...register("name")} className='w-full rounded-xl text-white border-b placeholder-white/40 border-white/20 px-4 py-3 dark:focus:border-orange-400 transition-all duration-300 focus:outline-none' placeholder='Your Name' />
                            </div>
                            <div className={`my-10 ${islogin ? "hidden" : ""}`} >
                                <label className='text-white/70 text-xl mb-2 block px-4'>Email</label>
                                <input type="text" {...register("email")} className='w-full rounded-xl text-white border-b placeholder-white/40 border-white/20 px-4 py-3 dark:focus:border-orange-400 transition-all duration-300 focus:outline-none' placeholder='Your Email' />
                            </div>
                            <div className='relative my-10'>
                                <label className='text-white/70 text-xl mb-2 block px-4'>Password</label>
                                <input type={showPassword ? "text" : "password"} {...register("password")} className='w-full rounded-xl text-white border-b placeholder-white/40 border-white/20 px-4 py-3 dark:focus:border-orange-400 transition-all duration-300 focus:outline-none' placeholder='Your Password' />
                                
                                <button type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 bottom-2 text-sm text-white">
                                    {showPassword ? <Eye /> : <EyeOff />}
                                    

                                </button>
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit' disabled={isSubmitting} className=' cursor-pointer bg-white w-sm py-3 rounded-4xl font-semibold hover:-translate-y-0.5 transition-all duration-300 hover:drop-shadow-2xl'>{islogin ? "Login" : "Sign up"}</button>
                            </div>
                            <div className='text-center text-white'>
                                <span>{islogin ? "Already Registered?" : "New Here?"} <button type='button' className='text-orange-400 cursor-pointer' onClick={() => issetlogin(!islogin)}>{islogin ? "sign up" : "Login"}</button></span>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Login