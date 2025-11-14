import './chatList.css'
import React, { useContext, useRef, useEffect } from "react"
import MessageCard from "../message-card/messageCard"
import { messageContext } from "../../../contextos/messageContext"

export default function ChatList() {
    const { messages } = useContext(messageContext)
    //funcion de Scroll, cada vez que se recibe un mensaje, se auto-scrollea hacia abajo.
    //con ayuda de mi amigo(IA)
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
            {messages.length === 0 && (
                <div className="noMessagesContainer">
                    <p className="noMessagesText">No hay mensajes todavia, escribe uno!</p>
                </div>
            )}
            {messages.length > 0 && (
                <div className="messagesList">
                    {messages.map((message) => {
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