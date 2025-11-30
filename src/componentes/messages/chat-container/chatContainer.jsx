import './chatContainer.css'
import React, { useContext, useEffect } from 'react'
import LoadSpinner from '../../../utils/loadSpinner/LoadSpinner';
import ErrorMessage from '../../../utils/error/ErrorMessage';
import { useParams, Link } from 'react-router-dom'
import ChatList from '../chat-list/chatList'
import MessageForm from '../message-form/messageForm'
import { messageContext } from '../../../contextos/messageContext'
import { groupContext } from '../../../contextos/readingGroupContext'

function ChatContainer() {
    const { groupId } = useParams();
    const { getMessagesByGroup, loading, error } = useContext(messageContext);
    const { getGroup, group } = useContext(groupContext);

    useEffect(() => {

        if (groupId && !loading && !error) {
            getMessagesByGroup(groupId);
            getGroup(groupId);
        }
    }, [groupId]);



    if (error && error.message) {
        return <ErrorMessage status={error.status} message={error.message} />;
    }

    let groupNameRender = 'Cargando...';
    if (group && (group.groupName || group.name)) {
        groupNameRender = group.groupName || group.name;
    } else if (!group && error && error.message) {
        groupNameRender = 'Grupo no encontrado';
    }
    return (
        <div className='divChatScreenContainer'>
            <div className="chatHeader">
                <Link to={'/groups'} className='backToGroups'>
                    <i className="bi bi-arrow-left"></i> Volver a Grupos
                </Link>
                <h2 className="groupName">{groupNameRender}</h2>
            </div>
            <ChatList />

            {groupId && <MessageForm groupId={groupId} />}
        </div>
    );
}

export default ChatContainer