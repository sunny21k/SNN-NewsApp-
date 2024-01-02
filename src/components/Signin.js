import React from 'react'
import newsImg from '../images/Designer.png'
import {signInWithPopup} from 'firebase/auth'
import {auth, googleProvider } from '../firebase/setup'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const navigate  = useNavigate();

    const googleSignIn = async() => {
        try {
            await signInWithPopup(auth, googleProvider)
            auth.currentUser && navigate("/")
        } catch(err) {
            console.error(err)
        }
    }

    console.log(auth)
  return (
    <div className='grid grid-cols-2 h-screen'>
        <div>
             <img className='h-screen' src="https://img.freepik.com/premium-psd/ripped-old-newspaper-brown-background_536881-439.jpg" alt="" />
        </div>
        <div className='text-center'>
            <img src={newsImg} className='h-20 m-auto mt-32' alt="" />
            <h1 className='text-3xl font-semibold mt-7'>Sign in</h1>
            <button onClick={googleSignIn} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-14 w-96 mt-14">
            Sign in
            </button>
            <h4 className='text-red-500 mt-7 cursor-pointer underline'>Sign in now</h4>
        </div>
    </div>
  )
}

export default Signin