import React from 'react'
import { SiSolana } from "react-icons/si";

const Navbar = () => {
  return (
    <header className='sticky top-4 z-50'>
        <nav className='flex justify-start items-center p-5 bg-black text-white rounded-full w-3/4 mx-auto animated-bg'>
          <SiSolana />
          <h1 className='text-2xl font-bold ml-4'>SolMate</h1>
        </nav>
    </header>
  )
}

export default Navbar
