import React from 'react'
import './ErrorMessage.css'

export default function ErrorMessage({ status, message = 'Ha ocurrido un error' }) {
    return (
        <div className="errorMessageContainer">
            <h2 className="errorTitle">Status {status}</h2>
            <p className="errorText">{message}</p>
        </div>
    )
}