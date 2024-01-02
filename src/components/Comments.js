import { doc, getDocs,  addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/setup';
import { auth } from '../firebase/setup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Comments = (props) => {

    const [comments, setComments] = useState("")
    const [newsComments, setNewsComments] = useState([])

    const addComments = async() => {
        const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`)
        const commentsRef = collection(newsDoc, "Comments")
        auth.currentUser == null && toast.warning("Please login")
        try {
            auth.currentUser && await addDoc(commentsRef, {
                comments: comments,
                name: auth.currentUser.displayName,
                profileImg: auth.currentUser.photoURL
            })
            auth.currentUser && toast.success("Comment added successfully")
        } catch(err) {
            console.log(err)
        }
    }

    const showComments = async() => {
        const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`)
        const commentsRef = collection(newsDoc, "Comments")
        try {
            const data = await getDocs(commentsRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setNewsComments(filteredData)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        showComments()
    }, [newsComments])

  return (
    <div className='grid grid-rows-2'>
        <div className='p-5 mt-5'>
            <label for="Add Comments" class="block mb-2 text-sm font-medium text-gray-900">Add Comments</label>
            <div className='flex'>
                <input onChange={(e) => setComments(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-2/3 p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comments" required />
                <button onClick={addComments} class="ml-2 bg-gray-50 hover:bg-slate-500 hover:text-white text-gray-500 py-2 px-4 border border-gray-300 rounded">
                Add
                </button>     
            </div>          
        </div>
<div className='h-2 p-4'>
    {newsComments.map((data, index) => (
        <div key={index} className='border rounded-lg p-2 mb-4'>
            <div className='flex items-center'>
                <img src={data.profileImg} className='rounded-full w-7 h-7' alt="" />
                <h3 className='font-semibold ml-2 text-slate-500'>{data.name.toUpperCase()}</h3>
            </div>
            <h6 className='ml-10 mt-2'>
                {data.comments}
            </h6>
        </div>
    ))}
</div>

        <ToastContainer autoClose={3000} />
    </div>
  )
}

export default Comments