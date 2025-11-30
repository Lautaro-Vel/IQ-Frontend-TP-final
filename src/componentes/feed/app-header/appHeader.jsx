import './appHeader.css'
import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contextos/authContext'

function AppHeader() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogoClick = () => {
        logout();
        navigate('/login');
    };
    return (
        <div className="divHeaderFeedScreen">
            <div className="headerLeft">
                <button className='linkIqLogo' onClick={handleLogoClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <span className="iqLogo">I<span className='punto'>.</span>Q</span>
                </button>
            </div>
            <div className="headerCenter">
                <Link to={'/profile'} className='linkProfile'>
                    <h2 className="welcomeFeedScreen">Bienvenido {(user && user.name) ? user.name : 'Usuario'}</h2>
                </Link>
            </div>
            <div className="headerRight">
                <nav className="navLinks">
                    <Link to={'/groups'} className='linkGroups'>Grupos</Link>
                </nav>
            </div>
        </div>
    )
}

export default AppHeader