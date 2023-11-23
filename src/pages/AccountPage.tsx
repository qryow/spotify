import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/HomePage/Navbar/Navbar'
import SideBar from '../components/HomePage/SideBar/SideBar'
import Player from '../components/HomePage/Player/Player'
import SearchMain from '../components/HomePage/Search/SearchMain'
import MainAcc from '../components/HomePage/Main/MainAcc'
import { getOneUser } from '../store/Slices/AuthSlice'


const AccountPage = () => {
  return (
    <div className='container'>
      <Navbar />
      <MainAcc />
      <SideBar />
      <Player />
    </div>
  )
}

export default AccountPage