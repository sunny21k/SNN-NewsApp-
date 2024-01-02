import React, { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'

const Main = () => {

    const [menu, setMenu] = useState("");
    const [search, setSearch] = useState("");

  return (
    <div className='grid grid-rows-2'>
        <Navbar setMenu={setMenu} setSearch={setSearch}/>
        <Home menu={menu} search={search}/>
    </div>
  )
}

export default Main