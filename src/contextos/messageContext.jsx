import { createContext, useState } from 'react'
import { getGroupMessages, sendMessage, deleteMessage } from '../services/messagesService'

export const messageContext = createContext({
    messages: [],
    getMessagesByGroup: (groupId) => {},
    sendNewMessage: (groupId, messageData) => {},
    deleteMessageById: (groupId, messageId) => {}
})

const MessageContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const getMessagesByGroup = async (groupId) => {
        setLoading(true)
        setError('')
        try {
            const response = await getGroupMessages(groupId)
            if (response.ok) {
                setMessages(response.data)
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const sendNewMessage = async (groupId, messageData) => {
        setLoading(true)
        setError('')
        try {
            const response = await sendMessage(groupId, messageData)
            if (response.ok) {
                const newMessage = response.data
                setMessages([...messages, newMessage])
                return newMessage
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const deleteMessageById = async (groupId, messageId) => {
        setLoading(true)
        setError('')
        try {
            const response = await deleteMessage(groupId, messageId)
            if (response.ok) {
                const updatedMessages = []
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i]._id !== messageId) {
                        updatedMessages.push(messages[i])
                    }
                }
                setMessages(updatedMessages)
                return response.data
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <messageContext.Provider 
            value={{
                messages: messages,
                loading: loading,
                error: error,
                getMessagesByGroup: getMessagesByGroup,
                sendNewMessage: sendNewMessage,
                deleteMessageById: deleteMessageById
            }}
        >
            {children}
        </messageContext.Provider>
    )
}

export default MessageContextProvider