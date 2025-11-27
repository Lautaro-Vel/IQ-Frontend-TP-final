import './messageCard.css'
import React, { useContext } from 'react'
import { useAuth } from '../../../contextos/authContext'
import { messageContext } from '../../../contextos/messageContext'
import { useParams } from 'react-router-dom'

const MessageCard = ({ _id, content, userName }) => {
    const { user } = useAuth()
    const { deleteMessageById } = useContext(messageContext)
    const { groupId } = useParams()
    const getIsMyMessage = () => {
        if (!user || !user._id) {
            return false
        }
        // No hay createdBy, pero si el mensaje es mío, el userName debería coincidir
        return user.name === userName
    }
    const getMessageClass = () => {
        if (getIsMyMessage()) {
            return 'messageCard myMessage'
        } else {
            return 'messageCard otherMessage'
        }
    }
    const getDeleteButton = () => {
        if (getIsMyMessage()) {
            return (
                <button 
                    className='deleteMessageButton' 
                    onClick={() => deleteMessageById(groupId, _id)}
                >
                    <i className="bi bi-trash"></i>
                </button>
            )
        } else {
            return null
        }
    }

    return (
        <div className={getMessageClass()}>
            {!getIsMyMessage() && (
                <div className="messageAuthor">
                    {userName ? userName : 'Usuario desconocido'}
                </div>
            )}
            <div className="messageContent">{content}</div>
            <div className="messageFooter">
                {getDeleteButton()}
            </div>
        </div>
    )
}

export default MessageCard