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
    if (error) {
        return <ErrorMessage title="Error al cargar las citas" message={error.message} status={error.status} />
    }
    return <FeedContainer />
}