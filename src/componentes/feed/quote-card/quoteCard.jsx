import React, { useContext } from 'react'
import { feedContext } from '../../../contextos/feedContext'
import { useAuth } from '../../../contextos/authContext'
const QuoteCard = ({ author, createdBy, _id, quote, userName }) => {
  const { user } = useAuth()
  const { handleDeleteQuote } = useContext(feedContext)
  const getDeleteButton = () => {
    if (user && createdBy && user._id && createdBy._id && user._id === createdBy._id) {
      return (
        <button className='deleteButtonQuote' onClick={() => handleDeleteQuote(_id)}>
          <i className="bi bi-trash"></i>
        </button>
      )
    } else {
      return null
    }
  }
  const getUserCardClass = () => {
    if (user && createdBy && user._id && createdBy._id && user._id === createdBy._id) {
      return 'divQuote userDivQuote'
    } else {
      return 'divQuote'
    }
  }
  const displayName = (createdBy && createdBy.name) ? createdBy.name : (userName ? userName : 'Usuario desconocido');
  return (
    <div className={getUserCardClass()}>
      <div className='divContainerLinkDetails'>
        {createdBy && createdBy._id ? (
          <Link className='linkUserNameQuote' to={`/user/${createdBy._id}`}>
            <h3 className='userNameQuote'>{(createdBy && createdBy.name) ? createdBy.name : (userName ? userName : 'Usuario desconocido')}</h3>
          </Link>
        ) : (
          <h3 className='userNameQuote'>{(createdBy && createdBy.name) ? createdBy.name : (userName ? userName : 'Usuario desconocido')}</h3>
        )}
      </div>
      <p className='paragraphUserQuote'>"{quote}"</p>
      <p className='authorQuote'><i>- {author}</i></p>
      <div className='divButtonsQuote'>
        {getDeleteButton()}
      </div>
    </div>
  )
}
export default QuoteCard