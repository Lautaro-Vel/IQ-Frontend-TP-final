import './app.css'
import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './screens/LoginScreen'

function AppSimplificado() {
  console.log('AppSimplificado: Renderizando')
  
  return (
    <div>
      <h1>Debug App</h1>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<div>Home Test</div>} />
      </Routes>
    </div>
  )
}

export default AppSimplificado