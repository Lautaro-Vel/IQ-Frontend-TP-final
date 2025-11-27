import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/authContext'
import LoadSpinner from '../utils/loadSpinner/LoadSpinner'

export default function ProtectedRoute({children}) {
    const { user, isLoading } = useAuth()
    if (isLoading) {
        return <LoadSpinner />
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}