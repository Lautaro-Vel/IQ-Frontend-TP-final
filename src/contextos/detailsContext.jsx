import React, {useState, useEffect, createContext} from "react"
import { useParams } from "react-router"
import { userService } from "../services/userService"
import { quotesService } from "../services/quotesService"

export const detailsContext = createContext()
const DetailsContextProvider = ({children}) => {
    const { userId } = useParams()
    const [userProfile, setUserProfile] = useState(null)
    const [userQuotes, setUserQuotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true)
            setError('')
            try {
                const response = await userService.getUserById(userId)
                if (response.ok) {
                    setUserProfile(response.data.user)
                } else {
                    setError({ status: response.status, message: response.message })
                    setLoading(false)
                }
                const quotesResponse = await quotesService.getQuotesByUser(userId)
                if (quotesResponse.ok) {
                    setUserQuotes(quotesResponse.data.quotes || [])
                } else {
                    setUserQuotes([])
                }
            } 
            catch (error) {
                return false
            }
            finally {
            setLoading(false)
            }
        }
        if (userId) {
            fetchUserDetails()
        }
    }, [userId])

    return (
        <detailsContext.Provider
            value={{
                userProfile: userProfile,
                userQuotes: userQuotes,
                loading: loading,
                error: error
            }}
        >
            {children}
        </detailsContext.Provider>
    )
} 

export default DetailsContextProvider


