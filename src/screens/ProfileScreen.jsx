import React from 'react'
import { UserContextProvider } from '../contextos/userContext'
import Profile from '../componentes/profile/profile'

export default function ProfileScreen() {
    return (
        <UserContextProvider>
            <Profile />
        </UserContextProvider>
    )
}