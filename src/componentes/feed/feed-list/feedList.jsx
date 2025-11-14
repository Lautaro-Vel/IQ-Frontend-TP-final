import './feedList.css'
import React, { useContext } from "react"
import QuoteCard from "../quote-card/quoteCard"
import { feedContext } from "../../../contextos/feedContext"

export default function FeedList() {
    const { quotes } = useContext(feedContext)

    return (
        <div className='divContainerListQuotes'>
            {quotes.map((quote) => {
                return (
                    <QuoteCard
                        key={quote._id}
                        {...quote}
                    />
                )
            })}
        </div>
    )
}