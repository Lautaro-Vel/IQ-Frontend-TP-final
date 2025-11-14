import './feedContainer.css'
import React from 'react'
import AppHeader from '../app-header/appHeader'
import FeedList from '../feed-list/feedList'
import AddNewQuoteForm from '../new-quote-form/AddNewQuoteForm'

function FeedContainer() {
  return (
    <div className='divFeedScreenContainer'>
        <AppHeader/>
        <FeedList/>
        <AddNewQuoteForm/>
    </div>
  )
}

export default FeedContainer