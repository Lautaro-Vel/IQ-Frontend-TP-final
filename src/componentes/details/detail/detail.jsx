import './detail.css'
import React from "react";

const Detail = ({ userProfile, userQuotes }) => {
    if (!userProfile) {
        return (
            <div className="divContainerDetails">
                <p>Usuario no encontrado</p>
            </div>
        )
    }

    return (
        <div className="divContainerDetails">
            {/* Información del usuario */}
            <div className="userProfileSection">
                <h2 className="userName">
                    {userProfile.name} {userProfile.userSurname}
                </h2>
                <div className="userInfo">
                    <p><span className="label">Email:</span> {userProfile.gmail}</p>
                    <p><span className="label">Edad:</span> {userProfile.age} años</p>
                    <p><span className="label">Profesión:</span> {userProfile.profession}</p>
                    <p><span className="label">Nacionalidad:</span> {userProfile.nationality}</p>
                </div>
            </div>
            <div className="userStats">
                <p className="statInfo">
                    <span className="label">Citas publicadas:</span> {userQuotes?.length || 0}
                </p>
            </div>
        </div>
    )
}   

export default Detail