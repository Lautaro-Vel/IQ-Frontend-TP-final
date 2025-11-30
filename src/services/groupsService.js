import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

const URL_API_GROUPS = ENVIRONMENT.URL_API + "/api/groups"
export async function getAllGroups() {
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/all`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al obtener grupos')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function getGroupById(groupId) {
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/${groupId}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al obtener grupo')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function getMyGroups() {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/my/groups`,
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
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al obtener mis grupos')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function createGroup(groupData) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/create`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(groupData)
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al crear grupo')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function joinGroup(groupId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/join/${groupId}`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al unirse al grupo')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function leaveGroup(groupId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/leave/${groupId}`,
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
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al salir del grupo')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}

export const groupsService = {
    getAllGroups,
    getGroupById,
    getMyGroups,
    createGroup,
    joinGroup,
    leaveGroup
}