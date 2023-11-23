import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import Register from '../components/AccountPages/Register'
import Login from '../components/AccountPages/Login'
import AccountPage from '../pages/AccountPage'
import ProfilePage from '../pages/ProfilePage'
import PlaylistDetailsPage from '../pages/PlaylistDetailsPage'
import AllSongs from '../components/HomePage/Playlist/AllSongs'
import PlaylisDetails from '../components/HomePage/Playlist/PlaylistDetails'
import AllSongsPage from '../pages/AllSongsPage'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      {/*<Route path='/verify' element={<VerifyPage />} />*/}
      <Route path='/allsongs' element={<AllSongsPage />} />
      <Route path='/playlist/:id' element={<PlaylistDetailsPage />} />
    </Routes>
  )
}

export default MainRoutes