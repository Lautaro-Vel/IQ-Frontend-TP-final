import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { verifyEmail } from '../../../services/authService.js'
import LoadSpinner from '../../../utils/loadSpinner/LoadSpinner.jsx'
import ErrorMessage from '../../../utils/error/ErrorMessage.jsx'
import './verifyEmail.css'

function VerifyEmail() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [verification, setverification] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (token) {
            handleVerifyEmail()
        } else {
            setError('Token de verificación no encontrado')
            setLoading(false)
        }
    }, [token])
    const handleVerifyEmail = async () => {
        try {
            setLoading(true)
            const response = await verifyEmail(token)
            setverification(true)
            setError('')
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch (error) {
            setError(error.message || 'Error al verificar el email')
            setverification(false)
        } finally {
            setLoading(false)
        }
    }
    const goToLogin = () => {
        navigate('/login')
    }
    if (loading) {
        return (
            <div className="verifyEmailLoadingContainer">
                <LoadSpinner />
                <p className="verifyEmailLoadingText">Verificando tu email...</p>
            </div>
        )
    }
    return (
        <div className="verifyEmailContainer">
            <div className="verifyEmailBox">
                {verification && (
                    <>
                        <div className="verifyEmailIcon success">
                            ✓
                        </div>
                        <h1 className="verifyEmailTitle success">
                            ¡Email Verificado!
                        </h1>
                        <p className="verifyEmailMessage">
                            Tu cuenta ha sido verificada exitosamente. 
                            Serás redirigido al login en unos segundos.
                        </p>
                        <button 
                            onClick={goToLogin}
                            className="verifyEmailButton"
                        >
                            Ir al Login
                        </button>
                    </>
                )}
                {!verification && (
                    <>
                        <div className="verifyEmailIcon error">
                            ✗
                        </div>
                        <h1 className="verifyEmailTitle error">
                            Error de Verificación
                        </h1>
                        <ErrorMessage error={error} />
                        <p className="verifyEmailErrorMessage">
                            El enlace puede haber expirado o ser inválido.
                        </p>
                        <button 
                            onClick={goToLogin}
                            className="verifyEmailButton"
                        >
                            Volver al Login
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail