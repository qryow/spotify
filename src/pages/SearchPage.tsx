import React from 'react'
import Navbar from '../components/HomePage/Navbar/Navbar'
import SideBar from '../components/HomePage/SideBar/SideBar'
import Player from '../components/HomePage/Player/Player'
import SearchMain from '../components/HomePage/Search/SearchMain'


const SearchPage = () => {
  return (
    <div className='container'>
      <Navbar />
      <SearchMain />
      <SideBar />
      <Player />
    </div>
  )
}

export default SearchPage