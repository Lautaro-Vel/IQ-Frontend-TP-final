import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import UserContext from '../../contextos/userContext'
import LoadSpinner from '../../utils/loadSpinner/LoadSpinner'
import ErrorMessage from '../../utils/error/ErrorMessage'
import './profile.css'

export default function Profile() {
        const goHome = () => {
            navigate('/');
        }
    const {userProfile, loading, error, updateUserProfile, updateUserTemporal} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [updateError, setUpdateError] = useState('')
    const [actualizacion, setActualizacion] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        updateUserTemporal(name, value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUpdateError('');
        const request = await updateUserProfile({
            userName: userProfile.name,
            userSurname: userProfile.userSurname,
            age: userProfile.age,
            profession: userProfile.profession,
            nationality: userProfile.nationality
        });
        if (request) {
            setIsEditing(false);
            setActualizacion('Perfil actualizado correctamente');
            setTimeout(() => setActualizacion(''), 3000);
        } else {
            setUpdateError(error);
        }
    };

    if (loading) {
        return <LoadSpinner />;
    }
    // Si hay error pero existe token en localStorage, no mostrar alerta
    if (error && !(typeof error === 'object' && error.message && error.message.toLowerCase().includes('token') && localStorage.getItem('token'))) {
        return <ErrorMessage status={error.status} message={error.message} />;
    }
    if (!userProfile) {
        return (
            <div className="profileContainer">
                <p>No se pudo cargar el perfil</p>
            </div>
        );
    }

    // Renderizar nombre y gmail correctamente, sin estilos en línea
    return (
        <div className="profileContainer">
            <div className="profileHeader">
                <button onClick={goHome} className="backHomeButton">
                    &#8592; Volver al inicio
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
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={userProfile.userName || userProfile.name || ''}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <div className="profileField">{userProfile.userName || userProfile.name || ''}</div>
                        )}
                    </div>
                    <div className="inputGroup">
                        <label>Apellido:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="userSurname"
                                value={userProfile.userSurname || ''}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <div className="profileField">{userProfile.userSurname || ''}</div>
                        )}
                    </div>
                    <div className="inputGroup">
                        <label>Email:</label>
                        <div className="profileField">{userProfile.mail || userProfile.gmail || ''}</div>
                    </div>
                    <div className="inputGroup">
                        <label>Edad:</label>
                        {isEditing ? (
                            <input
                                type="number"
                                name="age"
                                value={userProfile.age || ''}
                                onChange={handleInputChange}
                                min="1"
                                max="120"
                                required
                            />
                        ) : (
                            <div className="profileField">{userProfile.age || ''}</div>
                        )}
                    </div>
                    <div className="inputGroup">
                        <label>Profesión:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="profession"
                                value={userProfile.profession || ''}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <div className="profileField">{userProfile.profession || ''}</div>
                        )}
                    </div>
                    <div className="inputGroup">
                        <label>Nacionalidad:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nationality"
                                value={userProfile.nationality || ''}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <div className="profileField">{userProfile.nationality || ''}</div>
                        )}
                    </div>
                    {/* Si hay error pero existe token en localStorage, no mostrar alerta */}
                    {updateError && !(typeof updateError === 'object' && updateError.message && updateError.message.toLowerCase().includes('token') && localStorage.getItem('token')) && (
                        <ErrorMessage status={updateError.status} message={updateError.message} />
                    )}
                    {actualizacion && <p className="exitoMessage">{actualizacion}</p>}
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
    );
}