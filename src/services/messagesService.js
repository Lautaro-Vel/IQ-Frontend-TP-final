import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

export async function getGroupMessages(groupId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/${groupId}/messages`,
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
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al obtener mensajes')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function sendMessage(groupId, messageData) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/${groupId}/messages`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(messageData)
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al enviar mensaje')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}
export async function deleteMessage(groupId, messageId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/${groupId}/messages/${messageId}`,
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
        const error = new Error(httpResponse.message || httpResponse.data || 'Error al eliminar mensaje')
        error.status = httpResponse.status || httpRequest.status || 500
        throw error
    }
    return httpResponse
}

export const messagesService = {
    getGroupMessages,
    sendMessage,
    deleteMessage
}