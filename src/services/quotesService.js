import { HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from '../dictionary/httpDictionary.js'
import ENVIRONMENT from '../config/environmentConfig.js'

const URL_API_QUOTES = ENVIRONMENT.URL_API + "/api/quotes"

export async function getAllQuotes() {
    const quotesUrl = `${URL_API_QUOTES}/home-quotes`;
    const token = localStorage.getItem('token');
    if (!token || token === 'null') {
        // Si no hay token, no se hace la petición y se lanza error para redirigir al login
        throw new Error('No hay token de autorización, por favor inicia sesión');
    }
    const httpRequest = await fetch(
        quotesUrl,
        {
            method: HTTP_METHODS.GET,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const httpResponse = await httpRequest.json();
    if (!httpResponse.ok) {
        throw new Error(httpResponse.data);
    }
    return httpResponse;
}
export async function getMyQuotes() {
    const token = localStorage.getItem('token')
    const httpRequest = await fetch (
        `${URL_API_QUOTES}/my-quotes`,
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
export async function createQuote(quoteData) {
    const token = localStorage.getItem('token')
    
    const httpRequest = await fetch (
        `${URL_API_QUOTES}/home-quotes`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quoteData)
        }
    )
    const httpResponse = await httpRequest.json()
    if(!httpResponse.ok) {
        throw new Error(httpResponse.data)
    }
    return httpResponse
}

export async function deleteQuote(quoteId) {
    const token = localStorage.getItem('token')
    
    const httpRequest = await fetch (
        `${URL_API_QUOTES}/my-quotes/${quoteId}`,
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

export async function getQuotesByUser(userId) {
    const token = localStorage.getItem('token')
    
    const httpRequest = await fetch (
        `${URL_API_QUOTES}/user-quotes/${userId}`,
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

export const quotesService = {
    getAllQuotes,
    getMyQuotes,
    createQuote,
    deleteQuote,
    getQuotesByUser
}