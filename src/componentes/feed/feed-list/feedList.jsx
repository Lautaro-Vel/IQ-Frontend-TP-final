import './feedList.css'
import React, { useContext } from "react"
import QuoteCard from "../quote-card/quoteCard"
import { useAuth } from "../../../contextos/authContext"
import { feedContext } from "../../../contextos/feedContext"

export default function FeedList() {
    const { quotes, loading, error } = useContext(feedContext)
    const { user: loggedUser } = useAuth()

    const getQuoteClass = (quote) => {
        if (loggedUser && quote.user && loggedUser.id && quote.user._id && String(loggedUser.id) === String(quote.user._id)) {
            return "quoteCardContainer userDivQuote";
        } else {
            return "quoteCardContainer";
        }
    }
    if (loading) {
        const LoadSpinner = require("../../../utils/loadSpinner/LoadSpinner").default;
        return <LoadSpinner />;
    }
    if (error && error.message) {
        const ErrorMessage = require("../../../utils/error/ErrorMessage").default;
        return <ErrorMessage status={error.status} message={error.message} />;
    }
    return (
        <div className='divContainerListCitas'>
            {quotes.length === 0 ? (
                <div className="noCitasMessage">No hay citas por el momento.</div>
            ) : (
                quotes.map((quote) => (
                    <div
                        className={getQuoteClass(quote)}
                        key={quote._id}
                    >
                        <QuoteCard
                            author={quote.author}
                            createdBy={quote.createdBy}
                            _id={quote._id}
                            quote={quote}
                            userName={quote.userName}
                        />
                    </div>
                ))
            )}
        </div>
    )
}