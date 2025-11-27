import './chatList.css'
import React, { useContext, useRef, useEffect } from "react"
import MessageCard from "../message-card/messageCard"
import { messageContext } from "../../../contextos/messageContext"

export default function ChatList() {
    const { messages } = useContext(messageContext)
    const safeMessages = Array.isArray(messages) ? messages : []
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className='divContainerChatMessages'>
            {safeMessages.length === 0 && (
                <div className="noMessagesContainer">
                    <p className="noMessagesText">No hay mensajes todavia, escribe uno!</p>
                </div>
            )}
            {safeMessages.length > 0 && (
                <div className="messagesList">
                    {safeMessages.map((message) => {
                        return (
                            <MessageCard
                                key={message._id}
                                {...message}
                            />
                        )
                    })}
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    )
}