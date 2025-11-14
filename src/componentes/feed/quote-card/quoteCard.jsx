import './quoteCard.css'
import React, { useContext } from 'react'
import { feedContext } from '../../../contextos/feedContext'
import { Link } from 'react-router'
import { useAuth } from '../../../contextos/authContext'

const QuoteCard = ({ author, createdBy, _id, quote}) => {
  const { user } = useAuth()
  const { handleDeleteQuote } = useContext(feedContext)
  const getDeleteButton = () => {
    if (user._id === createdBy._id) {
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
    if (user._id === createdBy._id) {
      return 'divQuote userDivQuote'
    } else {
      return 'divQuote'
    }
  }
  return (
    <div className={getUserCardClass()}>
      <div className='divContainerLinkDetails'>
        <Link className='linkUserNameQuote' to={`/user/${createdBy?._id}`}>
          <h3 className='userNameQuote'>{createdBy?.name}</h3>
        </Link>
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