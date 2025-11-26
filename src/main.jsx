import React, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppSimplificado from './AppSimplificado.jsx'
import AuthContextProvider from './contextos/authContext.jsx'
import FeedContextProvider from './contextos/feedContext.jsx'
import DetailsContextProvider from './contextos/detailsContext.jsx'
import GroupContextProvider from './contextos/readingGroupContext.jsx'
import MessageContextProvider from './contextos/messageContext.jsx'
import UserContextProvider from './contextos/userContext.jsx'
import { BrowserRouter } from 'react-router'

// Usar app simplificada para debugging
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>  
  </BrowserRouter>
)
