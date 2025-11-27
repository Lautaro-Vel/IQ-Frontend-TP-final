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
                    <QuoteCard
                        key={quote._id}
                        {...quote}
                    />
                ))
            )}
        </div>
    )
}