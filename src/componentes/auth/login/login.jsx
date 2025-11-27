import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../contextos/authContext'
import { authService } from '../../../services/authService'
import ErrorMessage from '../../../utils/error/ErrorMessage'
import './login.css'

export default function Login() {
    const [gmail, setGmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginUser, error, loading } = useAuth()
    const navigate = useNavigate()
    
    
    const handleSubmit = async (event) => {
        event.preventDefault()
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
                    {/* Si hay error pero existe token en localStorage, no mostrar alerta */}
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