
import React from 'react'
import NavBar from './NavBar'
import MainComponent from './MainComponent'

const Home = () => {
  return (
        <>
        <div>
        <NavBar/>
        <div className='mt-[35px]'>
            <MainComponent/>
        </div>
        </div>
            
        </>
  )
}

export default Home