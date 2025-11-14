import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { groupContext } from '../../../contextos/readingGroupContext'
import ErrorMessage from '../../../utils/error/ErrorMessage'
import './groupList.css'

export default function GroupList() {
    const {
        allGroups,
        myGroups,
        getAllGroupsList,
        getMyGroupsList,
        joinNewGroup,
        leaveGroupById,
        createNewGroup,
        error
    } = useContext(groupContext)
    const [mostrarCreateForm, setmostrarCreateForm] = useState(false)
    const [newGroupData, setNewGroupData] = useState({
        name: '',
        description: '',
        maxMembers: 10
    })
    useEffect(() => {
        getAllGroupsList()
        getMyGroupsList()
    }, [])
    const handleJoinGroup = async (groupId) => {
        await joinNewGroup(groupId)
    }
    const handleLeaveGroup = async (groupId) => {
        await leaveGroupById(groupId)
    }
    const handleCreateGroup = async (event) => {
        event.preventDefault()
        const result = await createNewGroup(newGroupData)
        if (result) {
            setNewGroupData({ name: '', description: '', maxMembers: 10 })
            setmostrarCreateForm(false)
        }
    }
    const handleInputChange = (detalle, valor) => {
        setNewGroupData({ ...newGroupData, [detalle]: valor })
    }
    const isUserInGroup = (groupId) => {
        for (let i = 0; i < myGroups.length; i++) {
            if (myGroups[i]._id === groupId) {
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
        if (group.members?.length >= group.maxMembers) {
            return 'Lleno'
        } else {
            return 'Unirse'
        }
    }
    const getMemberCount = (group) => {
        if (group.members.length) {
            return group.members.length
        } else {
            return 0
        }
    }
    const getCreatorName = (group) => {
        if (group.createdBy.name) {
            return group.createdBy.name
        } else {
            return 'Usuario'
        }
    }
    return (
        <div className="group-list-container">
            <div className="group-header">
                <h1>Grupos de Lectura</h1>
                <button 
                    className="btn-create-group"
                    onClick={() => setmostrarCreateForm(!mostrarCreateForm)}
                >
                    {getButtonText()}
                </button>
            </div>
            {error && <ErrorMessage message={error} />}
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
                    <button type="submit" className="btn-submit">Crear Grupo</button>
                </form>
            )}
            <div className="groups-sections">
                {/* Mis Grupos */}
                <section className="my-groups-section">
                    <h2>Mis Grupos ({myGroups.length})</h2>
                    {myGroups.length === 0 && (
                        <p className="no-groups">No perteneces a ningún grupo aún.</p>
                    )}
                    {myGroups.length > 0 && (
                        <div className="groups-grid">
                            {myGroups.map((group) => (
                                <div key={group._id} className="group-card my-group">
                                    <h3>{group.name}</h3>
                                    <p>{group.description}</p>
                                    <div className="group-stats">
                                        <span>Miembros: {getMemberCount(group)}</span>
                                        <span>Máximo: {group.maxMembers}</span>
                                    </div>
                                    <div className="group-actions">
                                        <button 
                                            className="btn-leave"
                                            onClick={() => handleLeaveGroup(group._id)}
                                        >
                                            Salir del Grupo
                                        </button>
                                        <Link to={`/messages/${group._id}`} className="btn-messages">
                                            Ver Mensajes
                                        </Link>
                                    </div>
                                </div>
                            ))}
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
                                <div key={group._id} className="group-card">
                                    <h3>{group.name}</h3>
                                    <p>{group.description}</p>
                                    <div className="group-stats">
                                        <span>Miembros: {getMemberCount(group)}</span>
                                        <span>Máximo: {group.maxMembers}</span>
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
                                                disabled={group.members.length >= group.maxMembers}
                                            >
                                                {getJoinButtonText(group)}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}