import './feedList.css'
import React, { useContext } from "react"
import QuoteCard from "../quote-card/quoteCard"
import { feedContext } from "../../../contextos/feedContext"

export default function FeedList() {
    const { quotes } = useContext(feedContext)

    return (
        <div className='divContainerListCitas'>
            {quotes.length === 0 ? (
                <div className="noCitasMessage">No hay citas por el momento.</div>
            ) : (
                quotes.map((quote) => (
                    <div className="quoteCardContainer" key={quote._id}>
                        <QuoteCard
                            author={quote.author}
                            createdBy={quote.createdBy}
                            _id={quote._id}
                            quote={quote.quote}
                            userName={quote.userName}
                        />
                    </div>
                ))
            )}
        </div>
    )
}