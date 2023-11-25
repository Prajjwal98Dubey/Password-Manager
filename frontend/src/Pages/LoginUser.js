import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const LOGIN_API = 'http://localhost:5001/api/user/login-user'
const LoginUser = () => {
    const [input, setInput] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLoginUser = async () => {
        if (!input || !password) {
            toast.warning('Enter all the fields', {
                postition: 'top-center'
            })
            return
        }
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(LOGIN_API, { input: input, password: password }, config)
            console.log(data)
            localStorage.setItem('passwordManager', JSON.stringify(data.token))
            navigate('/')
            toast.success("Login Successfull",{
                position:'top-center'
            })
        }
        catch(error){
            toast.error("Invalid Credentials",{
                position:'top-center'
            })
        }
        
    }
    return (
        <>
            <div className='mt-[70px]'>
                <div className='w-full flex justify-center'>
                    <div>
                        <div className='flex justify-center'>Email or username</div>
                        <div><input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter the username or email' className=' pl-1 border border-gray-400 w-[400px] h-[35px] mb-[15px]' /></div>
                        <div className='flex justify-center'>Password</div>
                        <div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className=' pl-1 border border-gray-400 w-[400px] h-[35px]' /></div>
                        <Link to='/auth/register'><div className='mt-[10px] text-blue-700 hover:underline flex justify-center cursor-pointer font-semibold'>Register Here</div></Link>
                        <div className='flex justify-center mt-[10px]'><button className='bg-blue-500 rounded-lg w-[130px] h-[34px] hover:bg-blue-700 text-white' onClick={() => handleLoginUser()}>Login</button></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginUser