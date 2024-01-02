import React from 'react'
import { ImNewspaper } from "react-icons/im";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth';

const Navbar = (props) => {

    const navigate = useNavigate()

    const logout = async() => {
        try {
            await signOut(auth) 
            navigate("/")
        } catch(err) {
            console.error(err)
        }
    }

  return (
    <div className='bg-red-600 text-white grid grid-cols-3 fixed w-full'>
        <div className='flex p-2'>
            <ImNewspaper className='h-14 w-14 ml-2 mr-4'/>
            {auth.currentUser ? 
                <button onClick={logout} className='flex hover:border border-red-700 p-2 items-center'>
                        <span className="ml-1">Log out</span>
                    </button> : 
                <Link to='/signin'>
                    <button className='flex hover:border border-red-700 p-2 w-20 items-center'>
                        <IoPersonCircleOutline className='h-12 w-12'/>  
                        <span className="ml-1">Sign in</span>
                    </button>
                </Link>}
        </div>
        <div className='flex'>
            <button onClick={()=> props.setMenu("All")} className='m-auto font-semibold text-md'>
                Home
            </button>
            <button onClick={()=> props.setMenu("Science")} className='m-auto font-semibold text-md'>
                Science
            </button>
            <button onClick={()=> props.setMenu("Movies")} className='m-auto font-semibold text-md'>
                Movies
            </button>
            <button onClick={()=> props.setMenu("Food")} className='m-auto font-semibold text-md'>
                Food
            </button>
            <button onClick={()=> props.setMenu("Worklife")} className='m-auto font-semibold text-md'>
                Worklife
            </button>
            <button  onClick={()=> props.setMenu("Travel")} className='m-auto font-semibold text-md'>
                Travel
            </button>
            <button onClick={()=> props.setMenu("Future")} className='m-auto font-semibold text-md'>
                Future
            </button>
            <button onClick={()=> props.setMenu("Culture")} className='m-auto font-semibold text-md'>
                Culture
            </button>
        </div>
        <div className='ml-60 flex p-3 items-center'>
            <IoIosSearch className='h-6 w-6'/>
            <input onChange={(e) => props.setSearch(e.target.value)} className='flex ml-2  bg-red-600'  placeholder='Search SNN'/>
        </div>
    </div>
  )
}

export default Navbar