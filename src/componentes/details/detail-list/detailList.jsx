import './detailList.css'
import React, {useContext} from "react";
import Detail from "../detail/detail";
import { detailsContext } from "../../../contextos/detailsContext";
import { Link } from 'react-router-dom';

export default function DetailList() {
    const { userProfile, userQuotes } = useContext(detailsContext)
    if (!userProfile) {
        return (
            <div className='divListDetails'>
                <div className="divButtonReturnCitas">
                    <Link className='linkReturnCitas' to={"/"}>
                        <i className="bi bi-arrow-left-circle"></i>
                    </Link>
                </div>
                <div className='divSpansContainer'>
                    <span className="upsSpan"><span className='puntoTransparent'>.</span>ups...</span>
                    <span className="InvalidUserSpan">Usuario no encontrado</span>    
                </div>
            </div>
        )
    }

    return (
        <div className="divListDetails">
            <div className="divButtonReturnCitas">
                <Link className='linkReturnCitas' to={"/"}>
                    <i className="bi bi-arrow-left-circle"></i>
                </Link>
            </div>
            <Detail userProfile={userProfile} userQuotes={userQuotes} />
        </div>
    )
}