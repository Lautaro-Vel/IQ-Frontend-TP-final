import React, { useContext } from "react";
import DetailList from '../componentes/details/detail-list/detailList'
import LoadSpinner from "../utils/loadSpinner/LoadSpinner";
import ErrorMessage from "../utils/error/ErrorMessage";
import { detailsContext } from '../contextos/detailsContext';

export default function DetailsScreen() {
    const { loading, error } = useContext(detailsContext)
    if (loading) {
        return <LoadSpinner />
    }
    if (error) {
        return <ErrorMessage title="Error al cargar los detalles" message={error} />
    }
    return <DetailList />
}






