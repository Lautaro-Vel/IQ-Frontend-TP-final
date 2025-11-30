import React, { useContext } from "react";
import LoadSpinner from '../utils/loadSpinner/LoadSpinner';
import ErrorMessage from '../utils/error/ErrorMessage';
import FeedContainer from '../componentes/feed/feed-container/feedContainer';
import { feedContext } from '../contextos/feedContext';

export default function HomeScreen() {
    const { loading, error } = useContext(feedContext)
    if (loading) {
        return <LoadSpinner />
    }

    if (error && !(typeof error === 'object' && error.message && error.message.toLowerCase().includes('token') && localStorage.getItem('token'))) {
        return <ErrorMessage title="Error al cargar las citas" message={typeof error === 'object' ? error.message : error} status={error && typeof error === 'object' ? error.status : undefined} />
    }
    return <FeedContainer />
}