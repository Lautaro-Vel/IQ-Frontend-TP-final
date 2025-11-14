import { createContext, useState, useEffect, useContext } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext({
    login: (dataUser, tokenUser) => {},
    logout: () => {},
    updateUser: (newData) => {},
    loginUser: (credentials) => {},
    registerUser: (userData) => {}
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }
    return context
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLogueado, setIsLogueado] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        console.log('AuthContext: Iniciando verificación de token guardado')
        try {
            const tokenGuardado = localStorage.getItem('token')
            const userGuardado = localStorage.getItem('user')
            
            console.log('AuthContext: Token guardado:', tokenGuardado)
            console.log('AuthContext: User guardado:', userGuardado)
            
            if (tokenGuardado && userGuardado) {
                const parsedUser = JSON.parse(userGuardado)
                setToken(tokenGuardado)
                setUser(parsedUser)
                setIsLogueado(true)
                console.log('AuthContext: Usuario restaurado desde localStorage:', parsedUser)
            } else {
                console.log('AuthContext: No hay usuario guardado, usuario no logueado')
            }
        } catch (error) {
            console.error('AuthContext: Error al restaurar usuario desde localStorage:', error)
        } finally {
            setIsLoading(false)
            console.log('AuthContext: Carga inicial completada, isLoading = false')
        }
    }, [])
    const login = (dataUser, tokenUser) => {
        setUser(dataUser)
        setToken(tokenUser)
        setIsLogueado(true)
        localStorage.setItem('token', tokenUser)
        localStorage.setItem('user', JSON.stringify(dataUser))
    }
    const logout = () => {
        setUser(null)
        setToken(null)
        setIsLogueado(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    const updateUser = (newData) => {
        setUser(newData)
        localStorage.setItem('user', JSON.stringify(newData))
    }
    const loginUser = async (credentials) => {
        setLoading(true)
        setError('')
        console.log('AuthContext: Iniciando loginUser con credentials:', credentials)
        try {
            const response = await authService.login(credentials)
            console.log('AuthContext: Respuesta del authService:', response)
            if (response.ok) {
                console.log('AuthContext: Login exitoso, estableciendo usuario y token')
                login(response.data.user, response.data.token)
                return true
            } else {
                console.log('AuthContext: Login falló con respuesta:', response)
                setError({ status: response.status, message: response.message })
                return false
            }
        } 
        catch (error) {
            console.error('AuthContext: Error en login:', error)
            setError({ status: 500, message: error.message || 'Error de conexión' })
            return false
        }
        finally {
            console.log('AuthContext: Finalizando loginUser, loading = false')
            setLoading(false)
        }
    }
    const registerUser = async (userData) => {
        setLoading(true)
        setError('')
        try {
            const response = await authService.register(userData)
            if (response.ok) {
                return {message: 'Registro exitoso! Revisa tu email para verificar tu cuenta.' }
            } else {
                setError({ status: response.status, message: response.message })
                return false
            }
        } 
        catch (error) {
            console.error('Error en registro:', error)
            setError({ status: 500, message: error.message || 'Error de conexión' })
            return false 
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                user: user,
                token: token,
                isLoading: isLoading,
                isLogueado: isLogueado,
                error: error,
                loading: loading,
                login: login,
                logout: logout,
                updateUser: updateUser,
                loginUser: loginUser,
                registerUser: registerUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider