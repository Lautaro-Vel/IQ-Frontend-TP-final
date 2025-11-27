import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contextos/authContext'
import ErrorMessage from '../../../utils/error/ErrorMessage'
import './register.css'

export default function Register() {
    const [name, setName] = useState('')
    const [gmail, setGmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registroExitoso, setRegistroExitoso] = useState('')
    const { registerUser, error, loading } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        setRegistroExitoso('')        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden')
            return
        }
        const result = await registerUser({ name, gmail, password })
        if (result && result.ok) {
            setRegistroExitoso(result.message)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
    }    
    const goToLogin = () => {
        navigate('/login')
    }
    const getButtonText = () => {
        if (loading) {
            return 'Registrando...'
        }
        return 'Registrarse'
    }

    return (
        <div className="registerContainer">
            <div className="registerDiv">
                <h2 className="registerTitle">Crear Cuenta</h2>                
                <form className="registerForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
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
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Confirmar Contraseña:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    {/* Si hay error pero existe token en localStorage, no mostrar alerta */}
                    {error && !(typeof error === 'object' && error.message && error.message.toLowerCase().includes('token') && localStorage.getItem('token')) && (
                        <ErrorMessage status={error.status} message={error.message} />
                    )}
                    {registroExitoso && <p className="exitoMessage">{registroExitoso}</p>}
                    <button 
                        type="submit" 
                        className="registerButton"
                        disabled={loading}
                    >
                        {getButtonText()}
                    </button>
                </form>
                <div className="loginLink">
                    ¿Ya tienes cuenta?
                    <button 
                        className="linkButton" 
                        onClick={goToLogin}
                        type="button"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}