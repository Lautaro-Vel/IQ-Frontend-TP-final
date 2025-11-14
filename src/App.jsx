import './app.css'
import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import DetailsScreen from './screens/DetailsScreen'
import GroupsScreen from './screens/GroupsScreen'
import MessagesScreen from './screens/MessagesScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProtectedRoute from './middleware/ProtectedRoute'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/" element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } 
        />
        <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/:userId" element={
            <ProtectedRoute>
              <DetailsScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/groups" element={
            <ProtectedRoute>
              <GroupsScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages/:groupId" element={
            <ProtectedRoute>
              <MessagesScreen />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
