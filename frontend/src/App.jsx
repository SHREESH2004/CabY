import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignUp.jsx'  
import CaptainLogin from './pages/Captainlogin.jsx'  
import CaptainSignup from './pages/Captainsignup.jsx'  
import UserHome from './pages/UserHome.jsx'
import RideSearchPanel from './pages/RideSearchPanel.jsx'
import CaptainHome from './pages/CaptainHome.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/ride-search" element={<RideSearchPanel />} />
        <Route path="/captain-home" element={<CaptainHome />} />
      </Routes>
    </div>
  )
}

export default App
