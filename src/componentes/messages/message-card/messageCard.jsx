import './messageCard.css'
import React, { useContext } from 'react'
import { useAuth } from '../../../contextos/authContext'
import { messageContext } from '../../../contextos/messageContext'
import { useParams } from 'react-router-dom'

const MessageCard = ({ _id, message, userName, user }) => {
    const { user: loggedUser } = useAuth()
    const { deleteMessageById } = useContext(messageContext)
    const { groupId } = useParams()
    

    const getIsMyMessage = () => {
        if (String(loggedUser.id) === String(user)) {
            return 'messageCard myMessage'
        } else {
            return 'messageCard otherMessage'
        }
        
    }
    const getDeleteButton = () => {
        if (String(loggedUser.id) === String(user)) {
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
        <div className={getIsMyMessage()}>
                <div className="messageAuthor">
                    {typeof userName === 'string' && userName.trim() ? userName : 'Usuario desconocido'}
                </div>
            
            <div className="messageContent">{typeof message === 'string' && message.trim() ? message : '[Sin mensaje]'}</div>
            <div className="messageFooter">
                {getDeleteButton()}
            </div>
        </div>
    )
}

export default MessageCard