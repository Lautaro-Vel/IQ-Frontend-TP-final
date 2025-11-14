import React, { useContext } from "react";
import LoadSpinner from '../utils/loadSpinner/LoadSpinner';
import ErrorMessage from '../utils/error/ErrorMessage';
import ChatContainer from '../componentes/messages/chat-container/chatContainer';
import { messageContext } from '../contextos/messageContext';

export default function MessagesScreen() {
    const { loading, error } = useContext(messageContext)
    if (loading) {
        return <LoadSpinner />
    }
    if (error) {
        return <ErrorMessage title="Error al cargar los mensajes" message={error} />
    }
    return <ChatContainer />
}