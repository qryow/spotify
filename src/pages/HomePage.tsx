import React from 'react'
import Navbar from '../components/HomePage/Navbar/Navbar'
import MainComponent from '../components/HomePage/Main/MainComponent'
import SideBar from '../components/HomePage/SideBar/SideBar'
import Player from '../components/HomePage/Player/Player'

const HomePage = () => {
  return (
    <>
      <div className='container'>
        <Navbar />
        <MainComponent />
        <SideBar />
        <Player />
      </div>
    </>
  )
}

export default HomePage