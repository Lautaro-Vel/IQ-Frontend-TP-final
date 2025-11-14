import './AddNewQuoteForm.css'
import React, { useContext } from "react";
import { feedContext } from "../../../contextos/feedContext";

export default function AddNewQuoteForm() {
    const { addNewQuote } = useContext(feedContext)
    const handleAddNewQuote = (event) => {
        event.preventDefault()
        const newQuote = event.target.quote.value
        const authorQuote = event.target.author.value
        addNewQuote(newQuote, authorQuote)
        event.target.quote.value = ''
        event.target.author.value = ''
    }

    return (
        <form className='formNewQuote' onSubmit={handleAddNewQuote}>
            <div className='divContainerInputQuote divLabelForm'>
                <label className='labelAddQuote' htmlFor="text">Añade una cita:</label>
            </div>
            <div className='divContaiterInputButton'>
                <div className='divContainerInputs'>
                    <input className='inputWriteQuote' type="text" name="quote"
                        placeholder="escribe tu cita aquí"
                        required
                    />
                    <input className='inputWriteQuote authorInput' type="text" name="author"
                        placeholder="pon su autor aquí"
                        required
                    />
                </div>
                <button className='buttonSubmitQuote' type="submit">
                    <i className="bi bi-arrow-right-circle"></i>
                </button>
            </div>
        </form>
    )
}
