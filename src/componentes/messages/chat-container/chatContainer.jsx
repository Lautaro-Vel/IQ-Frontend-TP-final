import './chatContainer.css'
import React, { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import ChatList from '../chat-list/chatList'
import MessageForm from '../message-form/messageForm'
import { messageContext } from '../../../contextos/messageContext'
import { groupContext } from '../../../contextos/readingGroupContext'

function ChatContainer() {
    const { groupId } = useParams()
    const { getMessagesByGroup } = useContext(messageContext)
    const { getGroup, group } = useContext(groupContext)
    useEffect(() => {
        if (groupId) {
            getMessagesByGroup(groupId)
            getGroup(groupId)
        }
    }, [groupId])

    return (
        <div className='divChatScreenContainer'>
            <div className="chatHeader">
                <Link to={'/groups'} className='backToGroups'>
                    <i className="bi bi-arrow-left"></i> Volver a Grupos
                </Link>
                <h2 className="groupName">{group.name}</h2>
            </div>
            <ChatList />
            <MessageForm groupId={groupId} />
        </div>
    )
}

export default ChatContainer