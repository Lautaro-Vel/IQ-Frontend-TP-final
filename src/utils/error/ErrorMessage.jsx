import React, { useState } from 'react';
import './ErrorMessage.css';

export default function ErrorMessage({ status, message, title, error }) {
    const [visible, setVisible] = useState(true);

    // Normalize error input
    let errorMessage = message || 'Ha ocurrido un error';
    let errorStatus = status;
    let errorTitle = title || 'Error';
    if (error) {
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (typeof error === 'object') {
            errorMessage = error.message || errorMessage;
            errorStatus = error.status || errorStatus;
        }
    }

    if (!visible) return null;

    return (
        <div className="errorMessageFloating">
            <div className="errorCard">
                <button className="errorCloseButton" onClick={() => setVisible(false)} aria-label="Cerrar alerta">×</button>
                <div className="errorIcon">&#9888;</div>
                <div className="errorTitle">
                    {errorTitle}
                    {errorStatus && <span className="errorStatus"> (Status {errorStatus})</span>}
                </div>
                <div className="errorText">{errorMessage}</div>
            </div>
        </div>
    );
}