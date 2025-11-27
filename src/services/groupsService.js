import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

const URL_API_GROUPS = ENVIRONMENT.URL_API + "/groups"
export async function getAllGroups() {
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/all`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        throw new Error(httpResponse.data)
    }
    return httpResponse
}
export async function getGroupById(groupId) {
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/${groupId}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            }
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        throw new Error(httpResponse.data)
    }
    return httpResponse
}
export async function getMyGroups() {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/my/groups`,
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
export async function createGroup(groupData) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/create`,
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
        throw new Error(httpResponse.data)
    }
    return httpResponse
}
export async function joinGroup(groupId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/join/${groupId}`,
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
        throw new Error(httpResponse.data)
    }
    return httpResponse
}
export async function leaveGroup(groupId) {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${ENVIRONMENT.URL_API}/api/groups/leave/${groupId}`,
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

export const groupsService = {
    getAllGroups,
    getGroupById,
    getMyGroups,
    createGroup,
    joinGroup,
    leaveGroup
}