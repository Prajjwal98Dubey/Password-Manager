import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const REGISTER_USER_API = 'http://localhost:5001/api/user/register-user'
const RegisterUser = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegisterUser = async () => {
        if (!username || !email || !password) {
            toast.warning('Enter all fields', {
                position: 'top-center'
            })
            return
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(REGISTER_USER_API, {
            username: username, email: email, password: password
        }, config)
        localStorage.setItem('passwordManager', JSON.stringify(data.token))
        navigate('/')
        toast.success('login Successfully', {
            position: 'top-center'
        })
    }
    return (
        <div className='mt-[25px]'>
            <div className='w-full flex justify-center'>
                <div>
                    <div className='flex justify-center'>Username</div>
                    <div><input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder='Enter the username ' className=' pl-1 border border-gray-400 w-[400px] h-[35px] mb-[15px]' /></div>
                    <div className='flex justify-center '>Email</div>
                    <div><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter the email ' className=' pl-1 border border-gray-400 w-[400px] h-[35px] mb-[15px]' /></div>
                    <div className='flex justify-center'>Password</div>
                    <div><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter the password ' className=' pl-1 border border-gray-400 w-[400px] h-[35px] mb-[15px]' /></div>
                    <div className='flex justify-center'><button className='bg-blue-500 text-white w-[150px] h-[34px] rounded-lg hover:bg-blue-700' onClick={() => handleRegisterUser()}>Register</button></div>
                </div></div>
        </div>
    )
}

export default RegisterUser