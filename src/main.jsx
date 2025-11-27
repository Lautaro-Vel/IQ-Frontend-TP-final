
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import AuthProvider from './contextos/authContext.jsx';
import FeedContextProvider from './contextos/feedContext.jsx';
import GroupContextProvider from './contextos/readingGroupContext.jsx';
import { UserContextProvider } from './contextos/userContext.jsx';
import MessageContextProvider from './contextos/messageContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserContextProvider>
        <FeedContextProvider>
          <GroupContextProvider>
            <MessageContextProvider>
              <App/>
            </MessageContextProvider>
          </GroupContextProvider>
        </FeedContextProvider>
      </UserContextProvider>
    </AuthProvider>
  </BrowserRouter>
);