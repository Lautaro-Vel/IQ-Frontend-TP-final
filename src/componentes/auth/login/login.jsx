import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contextos/authContext'
import { authService } from '../../../services/authService'
import ErrorMessage from '../../../utils/error/ErrorMessage'
import './login.css'

export default function Login() {

    const [gmail, setGmail] = useState('')
    const [localError, setLocalError] = useState('')
    const [password, setPassword] = useState('')
    const { loginUser, error, loading, setError } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (error) setError('')
        if (localError) setLocalError('')
    }, [location.pathname])


    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!validateEmail(gmail)) {
            setLocalError('El email ingresado no es válido.')
            return
        }
        if (password.length < 8) {
            setLocalError('La contraseña debe tener al menos 8 caracteres.')
            return
        }
        const request = await loginUser({ gmail, password })
        if (request) {
            navigate('/')
        }
    }
    const goToRegister = () => {
        navigate('/register')
    }
    const getButtonText = () => {
        if (loading) {
            return 'Iniciando...'
        }
        return 'Iniciar Sesión'
    }

    return (
        <div className="loginContainer">
            <div className="loginBox">
                <h2 className="loginTitle">Iniciar Sesión</h2>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={gmail}
                            onChange={(event) => setGmail(event.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    {localError && (
                        <ErrorMessage status={400} message={localError} />
                    )}

                    {error && !(typeof error === 'object' && error.message && error.message.toLowerCase().includes('token') && localStorage.getItem('token')) && (
                        <ErrorMessage status={error.status} message={error.message} />
                    )}
                    <button 
                        type="submit" 
                        className="loginButton"
                        disabled={loading}
                    >
                        {getButtonText()}
                    </button>
                </form>
                <div className="registerLink">
                    ¿No tienes cuenta?
                    <button 
                        className="linkButton" 
                        onClick={goToRegister}
                        type="button"
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    )
}