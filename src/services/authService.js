import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

const URL_API_AUTH = ENVIRONMENT.URL_API + "/auth"

export async function register(userData) {
    const user = {
        name: userData.name,
        gmail: userData.gmail,
        password: userData.password
    }
    
    const registerUrl = `${URL_API_AUTH}/register`
    
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
            throw new Error(httpResponse.message || 'Error en el registro')
        }
        return httpResponse
    } catch (error) {
        console.error('🚨 Error en register:', error)
        throw error
    }
}
export async function verifyEmail(token) {
    const httpRequest = await fetch (
        `${URL_API_AUTH}/check-mail/${token}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        throw new Error(httpResponse.message || 'Error al verificar el email')
    }
    return httpResponse
}
export async function login(user) {
    const userLogin = {
        gmail: user.gmail,
        password: user.password
    }
    const loginUrl = `${ENVIRONMENT.URL_API}/auth/login`
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
        throw new Error(httpResponse.message || 'Error en el login')
    }
    return httpResponse
}

export const authService = {
    register,
    login,
    verifyEmail
}