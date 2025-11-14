import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../contextos/userContext'
import LoadSpinner from '../../utils/loadSpinner/LoadSpinner'
import ErrorMessage from '../../utils/error/ErrorMessage'
import './profile.css'

export default function Profile() {
    const {userProfile, loading, error, updateUserProfile, updateUserTemporal} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [updateError, setUpdateError] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        updateUserTemporal(name, value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUpdateError('')
        const request = await updateUserProfile({
            name: userProfile.name,
            userSurname: userProfile.userSurname,
            age: userProfile.age,
            profession: userProfile.profession,
            nationality: userProfile.nationality
        })
        if (request) {
            setIsEditing(false)
            setTimeout(() => setUpdateSuccess(''), 3000)
        } else {
            setUpdateError(error)
        }
    }
    const handleCancel = () => {
        setIsEditing(false)
        setUpdateError('')
    }
    const goHome = () => {
        navigate('/')
    }
    const getButtonText = () => {
        if (loading) {
            return 'Guardando...'
        } else {
            return 'Guardar Cambios'
        }
    }
    if (loading) {
        return <LoadSpinner />
    }
    if (error) {
        return <ErrorMessage status={error.status} message={error.message} />
    }
    if (!userProfile) {
        return (
            <div className="profileContainer">
                <p>No se pudo cargar el perfil</p>
            </div>
        )
    }

    return (
        <div className="profileContainer">
            <div className="profileHeader">
                <button onClick={goHome} className="backHomeButton">
                    ← Volver al inicio
                </button>
                <h2 className="profileTitle">Mi Perfil</h2>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="editButton"
                    >
                        Editar Perfil
                    </button>
                )}
            </div>
            <div className="profileContent">
                <form onSubmit={handleSubmit} className="profileForm">
                    <div className="inputGroup">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={userProfile.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="userSurname"
                            value={userProfile.userSurname}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={userProfile.gmail}
                            disabled
                            className="disabledInput"
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Edad:</label>
                        <input
                            type="number"
                            name="age"
                            value={userProfile.age}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            min="1"
                            max="120"
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Profesión:</label>
                        <input
                            type="text"
                            name="profession"
                            value={userProfile.profession}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Nacionalidad:</label>
                        <input
                            type="text"
                            name="nationality"
                            value={userProfile.nationality}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    {updateError && <ErrorMessage status={updateError.status} message={updateError.message} />}
                    {isEditing && (
                        <div className="buttonGroup">
                            <button type="submit" className="saveButton" disabled={loading}>
                                {getButtonText()}
                            </button>
                            <button 
                                type="button" 
                                onClick={handleCancel} 
                                className="cancelButton"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}