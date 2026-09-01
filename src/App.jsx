import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice.js'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.jsx';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then(() => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])


  return !loading ? (<div className='min-h-screen  flex flex-wrap content-between  bg-gray-400'><div className='w-full block'>
    <Header />
    <main>
      todo:<Outlet />
    </main>
    <Footer />
  </div></div>
  ) : null
}

export default App
