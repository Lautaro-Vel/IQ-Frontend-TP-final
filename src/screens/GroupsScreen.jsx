import React, { useContext } from "react";
import LoadSpinner from '../utils/loadSpinner/LoadSpinner';
import ErrorMessage from '../utils/error/ErrorMessage';
import GroupList from '../componentes/groups/group-list/groupList';
import { groupContext } from '../contextos/readingGroupContext';

export default function GroupsScreen() {
    const { loading } = useContext(groupContext)
    if (loading) {
        return <LoadSpinner />
    }
    // Siempre mostrar la pantalla de grupos, sin importar errores
    return <GroupList />
}