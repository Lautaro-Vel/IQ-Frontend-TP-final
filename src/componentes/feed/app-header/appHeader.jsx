import './appHeader.css'
import React, {useContext} from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../../contextos/authContext'

function AppHeader() {
    const {user} = useAuth()
  return (
    <div className="divHeaderFeedScreen">
        <Link to={'/'} className='linkIqLogo'>
            <span className="iqLogo">I<span className='punto'>.</span>Q</span>
        </Link>
        <nav className="navLinks">
            <Link to={'/groups'} className='linkGroups'>Grupos</Link>
        </nav>    
        <Link to={'/profile'} className='linkProfile'>
            <h2 className="welcomeFeedScreen">Bienvenido {user.name}</h2>
        </Link>
    </div>
  )
}

export default AppHeader