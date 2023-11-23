import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/HomePage/Navbar/Navbar'
import SideBar from '../components/HomePage/SideBar/SideBar'
import Player from '../components/HomePage/Player/Player'
import SearchMain from '../components/HomePage/Search/SearchMain'
import ProfileComp from '../components/HomePage/Main/MainAcc'
import { getOneUser } from '../store/Slices/AuthSlice'
import MainProfile from '../components/HomePage/Main/MainProfile'


const ProfilePage = () => {
  return (
    <div className='container'>
      <Navbar />
      <MainProfile />
      <SideBar />
      <Player />
    </div>
  )
}

export default ProfilePage