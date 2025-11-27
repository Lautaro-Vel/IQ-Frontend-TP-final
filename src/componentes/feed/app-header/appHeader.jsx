import './appHeader.css'
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contextos/authContext'

function AppHeader() {
        const {user} = useAuth()
        return (
            <div className="divHeaderFeedScreen">
                <div className="headerLeft">
                    <Link to={'/'} className='linkIqLogo'>
                        <span className="iqLogo">I<span className='punto'>.</span>Q</span>
                    </Link>
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