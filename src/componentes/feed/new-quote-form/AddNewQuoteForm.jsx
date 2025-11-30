import './AddNewQuoteForm.css'
import React, { useContext, useState } from "react";
import { feedContext } from "../../../contextos/feedContext";
import ErrorMessage from '../../../utils/error/ErrorMessage';

export default function AddNewQuoteForm() {
    const { addNewQuote } = useContext(feedContext)
    const [localError, setLocalError] = useState('')

    const handleAddNewQuote = (event) => {
        event.preventDefault()
        const newQuote = event.target.quote.value.trim()
        const authorQuote = event.target.author.value.trim()

        if (!newQuote || newQuote.length < 6) {
            setLocalError('La cita debe tener al menos 6 caracteres.')
            return
        }
        if (!authorQuote || authorQuote.length < 3) {
            setLocalError('El autor debe tener al menos 3 caracteres.')
            return
        }
        addNewQuote(newQuote, authorQuote)
        event.target.quote.value = ''
        event.target.author.value = ''
        setLocalError('')
    }

    return (
        <form className='formNewCita' onSubmit={handleAddNewQuote}>
            <div className='divLabelForm'>
                <label className='labelAddCita' htmlFor="text">Añade una cita:</label>
            </div>
            <div className='divContaiterInputButton'>
                <div className='divContainerInputs'>
                    <input className='inputWriteCita' type="text" name="quote"
                        placeholder="escribe tu cita aquí"
                        required
                    />
                    <input className='inputWriteCita autorInput' type="text" name="author"
                        placeholder="pon su autor aquí"
                        required
                    />
                </div>
                <button className='buttonSubmitCita' type="submit">
                    <i className="bi bi-arrow-right-circle"></i>
                </button>
            </div>

            {localError && (
                <ErrorMessage status={400} message={localError} />
            )}
        </form>
    )
}
