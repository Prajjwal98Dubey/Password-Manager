import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const CREATE_NEW_PASS = 'http://localhost:5001/api/password/new'
const GET_ALL_PASS = 'http://localhost:5001/api/password/all'
const GET_MY_ORIGINAL_PASS = 'http://localhost:5001/api/password/get-one'
const EDIT_MY_PASS = 'http://localhost:5001/api/password/edit-password'
const DELETE_MY_PASS = 'http://localhost:5001/api/password/delete-password'
const MainComponent = () => {
  const [newPasswordModal, setNewPasswordModal] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordList, setPasswordList] = useState([])
  const [loading, setLoading] = useState(true)
  const [seekArray, setSeekArray] = useState(Array(passwordList.length).fill(false))
  const [passwordLoader, setPasswordLoader] = useState(true)
  const [originalPassword, setOriginalPassword] = useState("")
  const [editModal, setEditModal] = useState(false)
  const [updatedPassword, setUpdatedPassword] = useState("")
  const [passwordId, setPasswordId] = useState(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const getAllPasswords = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('passwordManager'))}`
        }
      }
      const { data } = await axios.get(GET_ALL_PASS, config)
      setPasswordList(data)
      setLoading(false)
    }
    if (JSON.parse(localStorage.getItem('passwordManager'))) {
      getAllPasswords()
    }
  }, [])
  const handleNewPasswordSubmit = async () => {
    if (!name || !password) {
      toast.warning("Enter all fields.", {
        position: 'top-center'
      })
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('passwordManager'))}`
      }
    }
    await axios.post(CREATE_NEW_PASS, {
      name: name,
      password: password
    }, config)
    setNewPasswordModal(false)
    setName("")
    setPassword("")
    toast.success("New Password Managed", {
      position: 'top-center'
    })
  }
  const converPasswordToStar = (textPassword) => {
    return "***************"
  }
  const toggleSeek = (index) => {
    const newSeekArray = [...seekArray]
    for (let i = 0; i <= newSeekArray.length; i++) {
      if (i !== index) {
        if (newSeekArray[i] === true) {
          newSeekArray[i] = false
        }
      }
    }
    newSeekArray[index] = !newSeekArray[index]
    setSeekArray(newSeekArray)
  }
  const copyToClipBoard = async (text) => {
    await text.then((res) => {
      navigator.clipboard.writeText(res)
      toast.success('Password Copied to Clipboard!!!', {
        position: 'top-center'
      })
    }
    ).catch((error) => console.log(error))
  }
  const getMyOriginalPass = async (encrpyted) => {
    setOriginalPassword("")
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('passwordManager'))}`
      }
    }
    const { data } = await axios.post(GET_MY_ORIGINAL_PASS, {
      encrpytedPassword: encrpyted
    }, config)
    setOriginalPassword(data.decrypted)
    setPasswordLoader(false)
  }
  const handleCopyToClipboard = async (encrpyted) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('passwordManager'))}`
      }
    }
    const { data } = await axios.post(GET_MY_ORIGINAL_PASS, {
      encrpytedPassword: encrpyted
    }, config)
    return data.decrypted
  }
  const handleUpdatePassword = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('passwordManager'))}`
      }
    }
     await axios.put(EDIT_MY_PASS, {
      password_id: passwordId,
      updatedPassword: updatedPassword
    }, config)
    setUpdatedPassword("")
    setEditModal(false)
    toast.success("Password Edited", {
      position: 'top-center'
    })
  }
  const handleDeletePassword = async (id) => {
    await axios.delete(DELETE_MY_PASS, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('passwordManager'))}`
      },
      data: {
        password_id: id
      }
    }).then((res) => toast.error("Password Deleted...", {
      position: 'top-center'
    })).catch((error) => console.log(error))
  }
  return (
    <>
      {JSON.parse(localStorage.getItem('passwordManager')) ? <div>
        <div className='flex justify-center items-center relative'>
          <button className='w-[250px] h-[35px] rounded-lg bg-gray-400 mb-[10px] font-semibold text-center hover:bg-gray-500' onClick={() => setNewPasswordModal(true)}
          >+ create new password</button>
        </div>
        {newPasswordModal &&
          <div className=' rounded-lg shadow-lg  z-10 absolute top-[10px] left-[485px] w-[400px] h-[200px] bg-gray-300 '
          >
            <div className='flex justify-center relative'>
              <div className='absolute top-1 right-2 '><div className='w-[25px] h-[25px] rounded-full hover:bg-gray-500 cursor-pointer flex justify-center text-center ' onClick={() => setNewPasswordModal(false)} ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div></div>
              <div>
                <div className='text-xl font-semibold text-center mt-6'>Create a New Password</div>
                <div className='m-2'><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter the Account Name' className='w-[300px] h-[35px] rounded-lg border border-gray-500 pl-1' /></div>
                <div className='m-2'><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter the password' className='w-[300px] h-[35px] rounded-lg border border-gray-500 pl-1' /></div>
                <div className='flex justify-center'><button className='bg-blue-500 rounded-lg w-[200px] h-[35px] text-white hover:bg-blue-700' onClick={() => handleNewPasswordSubmit()}>Submit</button></div>
              </div></div>
          </div>}

        {loading ? <div className='flex justify-center'>Loading...</div> : <div className='relative'>
          {passwordList.map((pass, index) => <div key={pass._id} className='w-full flex justify-center mb-2 relative'>
            <div className=' shadow-md shadow-gray-300 relative flex w-[750px] h-[60px] rounded-lg bg-gray-300 justify-center items-center'>
              <div className='absolute left-10'>{pass.name}</div>
              <div className='flex absolute right-10'>
                <div className='text-2xl mr-[4px]'>{seekArray[index] ? passwordLoader ? <div>Loading...</div> : originalPassword : converPasswordToStar(pass.password)}</div>
                <div className='mt-[2px] mr-[6px] cursor-pointer' onClick={() => {
                  toggleSeek(index)
                  getMyOriginalPass(pass.password)
                }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5c5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg></div>
                <div className='mt-[2px] mr-[2px] cursor-pointer' onClick={() => {
                  copyToClipBoard(handleCopyToClipboard(pass.password))
                }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5c5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg></div>

              </div>
            </div>
            <div className='absolute top-[20px] right-[230px] cursor-pointer' onClick={() => {
              setEditModal(true)
              setPasswordId(pass._id)
            }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </div>
            <div className='absolute top-[20px] right-[200px] cursor-pointer' onClick={() => {
              handleDeletePassword(pass._id)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
            </div>
          </div>)
          }
          {editModal && <div className='z-10 absolute top-0 left-[410px] bg-gray-400 w-[450px] h-[160px] rounded-lg shadwow-xl shadow-white'>
            <div className='absolute top-1 right-2 cursor-pointer' onClick={() => {
              setUpdatedPassword("")
              setShow(false)
              setEditModal(false)
            }}>❌</div>
            <div className='text-center mt-[16px] font-bold text-xl'>Update the Password</div>
            <div className="flex justify-center mt-[20px] "><input type={show ? "text" : "password"} placeholder='Enter the new password' className='w-[360px] h-[35px] border border-black rounded-lg pl-[3px] relative' value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} />
              <div className='absolute top-[70px] right-4 cursor-pointer' onClick={() => setShow(!show)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
            </div>
            <div className='flex justify-center'><button className='w-[150px] h-[30px] bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg shadow-lg mt-[4px]' onClick={() => handleUpdatePassword()}>Update</button></div>
          </div>}
        </div>}
      </div> :
        <div className='text-center text-5xl font-bold font-sans '>
          Remeber all of your passwords by just remembering <span className='text-6xl text-blue-500 '>"1"</span>password...
        </div>}
    </>
  )
}

export default MainComponent