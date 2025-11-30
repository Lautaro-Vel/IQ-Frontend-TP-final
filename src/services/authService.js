import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

export async function register(userData) {
    const user = {
        userName: userData.name,
        mail: userData.mail,
        password: userData.password
    }
    
    const registerUrl = `${ENVIRONMENT.URL_API}/api/auth/register`
    
    try {
        const httpRequest = await fetch(registerUrl, {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(user)
        })
        if (!httpRequest.ok) {
            console.error('❌ Error HTTP:', httpRequest.status, httpRequest.statusText)
        }
        const httpResponse = await httpRequest.json()
        if(!httpResponse.ok) {
            const error = new Error(httpResponse.message || 'Error en el registro')
            error.status = httpResponse.status || httpRequest.status || 500
            throw error
        }
        return httpResponse
    } catch (error) {
        console.error('🚨 Error en register:', error)
        throw error
    }
}
export async function verifyEmail(token) {
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/auth/check-mail/${token}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || 'Error al verificar el email')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function login(user) {
    const userLogin = {
        mail: user.gmail,
        password: user.password
    }
    const loginUrl = `${ENVIRONMENT.URL_API}/api/auth/login`
    const httpRequest = await fetch (
        loginUrl,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(userLogin)
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || 'Error en el login')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}

export const authService = {
    register,
    login,
    verifyEmail
}