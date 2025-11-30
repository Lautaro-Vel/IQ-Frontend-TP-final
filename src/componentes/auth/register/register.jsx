import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contextos/authContext'
import ErrorMessage from '../../../utils/error/ErrorMessage'
import SuccessMessage from '../../../utils/success/SuccessMessage'
import './register.css'

export default function Register() {
    const [name, setName] = useState('')
    const [gmail, setGmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registroExitoso, setRegistroExitoso] = useState('')
    const [localError, setLocalError] = useState('')
    const { registerUser, error, loading, setError } = useAuth()
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
        setRegistroExitoso('')

        if (!name.trim()) {
            setLocalError('El nombre es obligatorio.')
            return
        }
        if (!validateEmail(gmail)) {
            setLocalError('El email ingresado no es válido.')
            return
        }
        if (password.length < 8) {
            setLocalError('La contraseña debe tener al menos 8 caracteres.')
            return
        }
        if (password !== confirmPassword) {
            setLocalError('Las contraseñas no coinciden.')
            return
        }
        const result = await registerUser({ name, mail: gmail, password })
        if (result && result.ok) {
            setRegistroExitoso(
                (result.message ? result.message + ' ' : '') +
                'Te enviamos un mail de verificación. Revisa tu bandeja de entrada y spam para activar tu cuenta.'
            );
            setTimeout(() => {
                navigate('/login')
            }, 4000)
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

                    {localError && (
                        <ErrorMessage status={400} message={localError} />
                    )}

                    {error && !(typeof error === 'object' && error.message && error.message.toLowerCase().includes('token') && localStorage.getItem('token')) && (
                        <ErrorMessage status={error.status} message={error.message} />
                    )}
                    {registroExitoso && <SuccessMessage message={registroExitoso} title="Registro exitoso" />}
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