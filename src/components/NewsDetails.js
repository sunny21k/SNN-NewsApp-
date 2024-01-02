import React from 'react'
import { useLocation } from 'react-router-dom'
import Comments from './Comments';

const NewsDetails = () => {

    const location = useLocation();

  return (
    <div className='grid grid-cols-2'>
        <div className='p-5'>
            <h1 className='font-extrabold text-2xl'>{location.state.data.title}</h1>
            <h4 className='m-2'>{location.state.data.description}</h4>
            <img src={location.state.data.urlToImage} alt="" />
        </div>
        <div className='grid grid-rows-2'>
            <Comments url={location.state.data.url}/>
        </div>
    </div>
  )
}

export default NewsDetails