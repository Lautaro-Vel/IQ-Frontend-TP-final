import { Navigate } from 'react-router'
import { useAuth } from '../contextos/authContext'
import LoadSpinner from '../utils/loadSpinner/LoadSpinner'

export default function ProtectedRoute({children}) {
    const { user, isLoading } = useAuth()
    
    console.log('ProtectedRoute: user:', user)
    console.log('ProtectedRoute: isLoading:', isLoading)
    
    if (isLoading) {
        console.log('ProtectedRoute: Mostrando LoadSpinner porque isLoading = true')
        return <LoadSpinner />
    }
    if (!user) {
        console.log('ProtectedRoute: No hay usuario, redirigiendo a /login')
        return <Navigate to="/login" replace />
    }
    
    console.log('ProtectedRoute: Usuario logueado, mostrando children')
    return children
}