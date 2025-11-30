import React, { useContext } from 'react'
import { feedContext } from '../../../contextos/feedContext'
import { useAuth } from '../../../contextos/authContext'
const QuoteCard = ({ author, createdBy, _id, quote, userName }) => {
  const { user: loggedUser } = useAuth()
  const { handleDeleteQuote } = useContext(feedContext)
  const quoteUser = quote && quote.user ? quote.user : createdBy;
  const getDeleteButton = () => {
    if (loggedUser && quoteUser && loggedUser.id && quoteUser._id && String(loggedUser.id) === String(quoteUser._id)) {
      return (
        <button className='deleteButtonQuote' onClick={() => handleDeleteQuote(_id)}>
          <i className="bi bi-trash"></i>
        </button>
      )
    } else {
      return null
    }
  }
  const displayName = (quoteUser && (quoteUser.userName || quoteUser.name)) ? (quoteUser.userName || quoteUser.name) : (userName ? userName : 'Usuario desconocido');
  return (
    <div className="divQuote">
      <h3 className='userNameQuote'>{displayName}</h3>
      <p className='paragraphUserQuote'>"{quote.quote}"</p>
      <p className='authorQuote'><i>- {author}</i></p>
      <div className='divButtonsQuote'>
        {getDeleteButton()}
      </div>
    </div>
  )
}
export default QuoteCard