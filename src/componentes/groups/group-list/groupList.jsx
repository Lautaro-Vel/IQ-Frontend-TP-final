import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { groupContext } from '../../../contextos/readingGroupContext'
import ErrorMessage from '../../../utils/error/ErrorMessage'
import './groupList.css'

export default function GroupList() {
    const {
        allGroups,
        myGroups,
        getAllGroupsData,
        joinNewGroup,
        leaveGroupById,
        createNewGroup,
        error,
        loading
    } = useContext(groupContext)
    const navigate = useNavigate();
    const handleGoHomeQuotes = () => {
        navigate("/");
    }
    const [mostrarCreateForm, setmostrarCreateForm] = useState(false)
    const [newGroupData, setNewGroupData] = useState({
        name: '',
        description: '',
        maxMembers: 10
    })
    const [localError, setLocalError] = useState('')
    useEffect(() => {
        getAllGroupsData()
    }, [])
    const handleJoinGroup = async (groupId) => {
        await joinNewGroup(groupId)
    }

    const waitForMembershipAndNavigate = async (groupId) => {
        let attempts = 0;
        while (attempts < 10) {
            const isMember = isUserInGroup(groupId);
            if (isMember) {
                navigate(`/messages/${groupId}`);
                return;
            }
            await new Promise(res => setTimeout(res, 200));
            attempts++;
        }
        setLocalError('No se pudo acceder al grupo, intenta nuevamente.');
    }
    const handleLeaveGroup = async (groupId) => {
        await leaveGroupById(groupId)
    }
    const handleCreateGroup = async (event) => {
        event.preventDefault()
        if (!newGroupData.name.trim() || newGroupData.name.length < 3) {
            setLocalError('El nombre del grupo debe tener al menos 3 caracteres.')
            return
        }
        if (!newGroupData.description.trim() || newGroupData.description.length < 10) {
            setLocalError('La descripción debe tener al menos 10 caracteres.')
            return
        }
        if (!newGroupData.maxMembers || newGroupData.maxMembers < 2 || newGroupData.maxMembers > 50) {
            setLocalError('El máximo de miembros debe estar entre 2 y 50.')
            return
        }
        let result = null;
        try {
            result = await createNewGroup({
                groupName: newGroupData.name,
                description: newGroupData.description
            });
        } catch (err) {
            setLocalError(err?.message || 'Error al crear el grupo');
            return;
        }
        if (result) {
            setNewGroupData({ name: '', description: '', maxMembers: 10 })
            setmostrarCreateForm(false)
            setLocalError('')
        }
    }
    const handleInputChange = (detalle, valor) => {
        setNewGroupData({ ...newGroupData, [detalle]: valor })
    }
    const isUserInGroup = (groupId) => {
        for (let i = 0; i < myGroups.length; i++) {
            if (myGroups[i].group && myGroups[i].group._id === groupId) {
                return true
            }
        }
        return false
    }
    const getButtonText = () => {
        if (mostrarCreateForm) {
            return 'Cancelar'
        } else {
            return 'Crear Grupo'
        }
    }
    const getJoinButtonText = (group) => {
        const memberCount = group.members?.length || 0
        const maxMembers = group.maxMembers || 10
        if (memberCount >= maxMembers) {
            return 'Lleno'
        } else {
            return 'Unirse'
        }
    }
    const getMemberCount = (group) => {
        return group.members?.length || 0
    }
    const getCreatorName = (group) => {
        return group.createdBy?.name || 'Usuario'
    }
    return (
        <div className="group-list-container">
            <button
                className="goHomeQuotesButton"
                onClick={handleGoHomeQuotes}
            >
                Volver a Home de Quotes
            </button>
            <div className="group-header">
                <h1>Grupos de Lectura</h1>
                <button 
                    className="btn-create-group"
                    onClick={() => setmostrarCreateForm(!mostrarCreateForm)}
                >
                    {getButtonText()}
                </button>
            </div>
            {mostrarCreateForm && (
                <form className="create-group-form" onSubmit={handleCreateGroup}>
                    <h3>Crear Nuevo Grupo</h3>
                    <input
                        type="text"
                        placeholder="Nombre del grupo"
                        value={newGroupData.name}
                        onChange={(event) => handleInputChange('name', event.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descripción del grupo"
                        value={newGroupData.description}
                        onChange={(event) => handleInputChange('description', event.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Máximo de miembros"
                        value={newGroupData.maxMembers}
                        onChange={(event) => handleInputChange('maxMembers', parseInt(event.target.value))}
                        min="2"
                        max="50"
                        required
                    />
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Creando...' : 'Crear Grupo'}
                    </button>
                    {localError && (
                        <ErrorMessage status={400} message={localError} />
                    )}
                </form>
            )}
            <div className="groups-sections">
                <section className="my-groups-section">
                    <h2>Mis Grupos ({myGroups.length})</h2>
                    {myGroups.length === 0 && (
                        <p className="no-groups">No perteneces a ningún grupo aún.</p>
                    )}
                    {myGroups.length > 0 && (
                        <div className="groups-grid">
                            {myGroups.map((memberGroup) => {
                                const group = memberGroup.group
                                if (!group) return null
                                return (
                                <div key={group._id} className="group-card my-group">
                                    <h3>{group.groupName || group.name}</h3>
                                    <p>{group.description}</p>
                                    <div className="group-stats">
                                        <span>Miembros: {getMemberCount(group)}</span>
                                        <span>Máximo: {group.maxMembers || 10}</span>
                                    </div>
                                    <div className="group-actions">
                                        <button 
                                            className="btn-leave"
                                            onClick={() => handleLeaveGroup(group._id)}
                                        >
                                            Salir del Grupo
                                        </button>
                                        <button 
                                            className="btn-messages"
                                            onClick={() => waitForMembershipAndNavigate(group._id)}
                                        >
                                            Ver Mensajes
                                        </button>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    )}
                </section>
                <section className="all-groups-section">
                    <h2>Grupos Disponibles ({allGroups.length})</h2>
                    {allGroups.length === 0 && (
                        <p className="no-groups">No hay grupos disponibles.</p>
                    )}
                    {allGroups.length > 0 && (
                        <div className="groups-grid">
                            {allGroups.map((group) => (
                                group ? (
                                    <div key={group._id} className="group-card">
                                        <h3>{group.name || group.groupName || 'Sin nombre'}</h3>
                                        <p>{group.description || 'Sin descripción'}</p>
                                        <div className="group-stats">
                                            <span>Miembros: {getMemberCount(group)}</span>
                                            <span>Máximo: {group.maxMembers || 10}</span>
                                            <span>Creado por: {getCreatorName(group)}</span>
                                        </div>
                                        <div className="group-actions">
                                            {isUserInGroup(group._id) && (
                                                <button 
                                                    className="btn-leave"
                                                    onClick={() => handleLeaveGroup(group._id)}
                                                >
                                                    Salir
                                                </button>
                                            )}
                                            {!isUserInGroup(group._id) && (
                                                <button 
                                                    className="btn-join"
                                                    onClick={() => handleJoinGroup(group._id)}
                                                    disabled={(group.members?.length || 0) >= (group.maxMembers || 10)}
                                                >
                                                    {getJoinButtonText(group)}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}