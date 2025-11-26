import React, { createContext, useContext, useState, useEffect } from 'react'
import { userService } from '../services/userService'
import { useAuth } from './authContext'

const UserContext = createContext({
    getUserProfile: () => {},
    updateUserProfile: (userData) => {},
    updateUserTemporal: (detalle, valor) => {}
})

export function UserContextProvider({ children }) {
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { user } = useAuth()
    useEffect(() => {
        if (user) {
            getUserProfile()
        }
    }, [user])
    const getUserProfile = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await userService.getProfile()
            if (response.ok) {
                setUserProfile(response.data.user)
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        }
        finally {
            setLoading(false)
        }
    }
    const updateUserProfile = async (userData) => {
        setLoading(true)
        setError('')
        try {
            const response = await userService.updateProfile(userData)
            if (response.ok) {
                setUserProfile(response.data.user)
                return true
            } else {
                setError({ status: response.status, message: response.message })
                return false
            }
        } 
        catch (error) {
            setError({ status: 500, message: 'Error de conexión' })
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const updateUserTemporal = (detalle, valor) => {
        setUserProfile({ ...userProfile, [detalle]: valor })
    }

    return (
        <UserContext.Provider value={{
            userProfile: userProfile,
            loading: loading,
            error: error,
            getUserProfile: getUserProfile,
            updateUserTemporal: updateUserTemporal,
            updateUserProfile: updateUserProfile
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext