import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const[isHovered,setIsHovered]=useState(false)
  const handleLogOut=()=>{
    localStorage.removeItem('passwordManager')
    window.location.reload()
  }
  return (
    <>
    <div className='flex justify-center w-full mt-2 relative'>
        <div className='text-2xl font-bold text-inherit'>Password Manager</div>
        {localStorage.getItem('passwordManager')? <div className='w-[36px] h-[36px] rounded-full bg-black absolute right-11 top-0' onMouseLeave={()=>setIsHovered(false)} onMouseEnter={()=>setIsHovered(true)}>
         { isHovered && <button className='w-[150px] h-[40px] border border-black flex justify-center items-center absolute top-8 right-[10px] hover:bg-gray-300 text-center text-black rounded-lg shadow-lg' onClick={()=>handleLogOut()}>Logout
          </button>}
        </div>:<Link to='/auth/login'><button className='bg-blue-500 w-[100px] h-[45px] absolute right-11 top-0 font-bold text-white rounded-lg hover:bg-blue-700'>Login</button></Link>}
    </div>
    </>
  )
}

export default NavBar