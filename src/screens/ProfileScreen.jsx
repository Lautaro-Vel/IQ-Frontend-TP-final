import React from 'react'
import { UserContextProvider } from '../contextos/userContext'
import Profile from '../componentes/profile/profile'

    return (
        <UserContextProvider>
            <Profile />
        </UserContextProvider>
    )
}