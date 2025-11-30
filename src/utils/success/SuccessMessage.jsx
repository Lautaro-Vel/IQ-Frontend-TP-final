import React, { useState } from 'react';
import './SuccessMessage.css';

export default function SuccessMessage({ message, title }) {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    return (
        <div className="successMessageFloating">
            <div className="successCard">
                <button className="successCloseButton" onClick={() => setVisible(false)} aria-label="Cerrar alerta">×</button>
                <div className="successIcon">&#10003;</div>
                <div className="successTitle">{title || 'Éxito'}</div>
                <div className="successText">{message}</div>
            </div>
        </div>
    );
}
