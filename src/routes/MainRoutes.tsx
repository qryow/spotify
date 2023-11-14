import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import Register from '../components/AccountPages/Register'
import Login from '../components/AccountPages/Login'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default MainRoutes