import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

const URL_API_GROUPS = ENVIRONMENT.URL_API + "/groups"
export async function getGroupMessages(groupId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/${groupId}/messages`,
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
        throw new Error(httpResponse.data)
    }
    return httpResponse
}
export async function sendMessage(groupId, messageData) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/${groupId}/messages`,
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
        throw new Error(httpResponse.data)
    }
    return httpResponse
}
export async function deleteMessage(groupId, messageId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_GROUPS}/${groupId}/messages/${messageId}`,
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
        throw new Error(httpResponse.data)
    }
    return httpResponse
}

export const messagesService = {
    getGroupMessages,
    sendMessage,
    deleteMessage
}