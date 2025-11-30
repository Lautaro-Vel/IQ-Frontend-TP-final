import './messageForm.css';
import React, { useContext, useState } from "react";
import { messageContext } from "../../../contextos/messageContext";
import ErrorMessage from '../../../utils/error/ErrorMessage';

export default function MessageForm({ groupId }) {
    const { sendNewMessage } = useContext(messageContext);
    const [messageText, setMessageText] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (messageText.trim() === '' || messageText.trim().length < 2) {
            setLocalError('El mensaje debe tener al menos 2 caracteres.');
            return;
        }
        const messageData = {
            message: messageText.trim()
        };
        const result = await sendNewMessage(groupId, messageData);
        if (result) {
            setMessageText('');
            setLocalError('');
        }
    };
    const handleInputChange = (event) => {
        setMessageText(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage(event);
        }
    };

    return (
        <form className='messageForm' onSubmit={handleSendMessage}>
            <div className='messageInputContainer'>
                <input
                    className='messageInput'
                    type="text"
                    value={messageText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje..."
                    maxLength={500}
                />
                <button 
                    className='sendMessageButton' 
                    type="submit"
                    disabled={messageText.trim() === ''}
                >
                    <i className="bi bi-send"></i>
                </button>
            </div>

            {localError && (
                <ErrorMessage status={400} message={localError} />
            )}
        </form>
    );
}