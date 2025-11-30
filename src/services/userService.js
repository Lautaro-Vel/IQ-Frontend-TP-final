import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

const URL_API_USERS = ENVIRONMENT.URL_API + "/api/user"
export async function getUserProfile() {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_USERS}/profile`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al obtener perfil')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function updateUserProfile(userData) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_USERS}/profile`,
        {
            method: HTTP_METHODS.PATCH,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al actualizar perfil')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function deleteUserAccount() {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_USERS}/account`,
        {
            method: HTTP_METHODS.DELETE,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al eliminar cuenta')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}

export async function getUserById(userId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_USERS}/${userId}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al obtener usuario')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}

export const userService = {
    getProfile: getUserProfile,
    updateProfile: updateUserProfile,
    deleteAccount: deleteUserAccount,
    getUserById: getUserById
}