import {useState, createContext, useEffect} from 'react'
import { quotesService } from '../services/quotesService'

export const feedContext = createContext({
    quotes: [],
    handleDeleteQuote: (quoteId) => {},
    addNewQuote: (quote, author) => {}
})
const FeedContextProvider = function ({children}) {
    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        const getQuotes = async () => {
            setLoading(true)
            setError('')
            try {
                const response = await quotesService.getAllQuotes()
                if (response.ok) {
                    setQuotes(response.data.quotes)
                    // Si no hay citas, no es error, solo UI vacía
                } else if (response.status === 404 || (response.data && response.data.length === 0)) {
                    setQuotes([])
                    setError('')
                } else {
                    setError({ status: response.status, message: response.message })
                }
            } 
            catch (error) {
                // Si el error es por token, sí mostrarlo
                if (error.message && error.message.toLowerCase().includes('token')) {
                    setError({ status: 401, message: error.message })
                } else {
                    // Si es por ausencia de citas, no mostrar error
                    setError('')
                }
            } 
            finally {
                setLoading(false)
            }
        }
        getQuotes()
    }, [])
    const handleDeleteQuote = async (quoteId) => {
        try {
            const response = await quotesService.deleteQuote(quoteId)
            if (response.ok) {
                const newQuotes = quotes.filter(quote => quote._id !== quoteId)
                setQuotes(newQuotes)
                return true
            } else {
                setError({ status: response.status, message: response.message })
                return false
            }
        } 
        catch (error) {
            setError({ status: 500, message: error.message || 'Error de conexión' })
            return false
        }
    }
    const addNewQuote = async (quote, author) => {
        try {
            setLoading(true)
            const response = await quotesService.createQuote({ quote: quote, author: author })
            if (response.ok) {
                setQuotes([response.data.newQuote, ...quotes])
                return true
            } else {
                setError({ status: response.status, message: response.message })
                return false
            }
        } 
        catch (error) {
            setError({ status: 500, message: error.message || 'Error de conexión' })
            return false
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <feedContext.Provider
            value={{
                quotes: quotes,
                loading: loading,
                error: error,
                handleDeleteQuote: handleDeleteQuote,
                addNewQuote: addNewQuote
            }}
        >
            {children}
        </feedContext.Provider>
    )
}
 
export default FeedContextProvider