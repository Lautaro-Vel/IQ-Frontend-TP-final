import React, { useContext } from "react";
import LoadSpinner from '../utils/loadSpinner/LoadSpinner';
import ErrorMessage from '../utils/error/ErrorMessage';
import GroupList from '../componentes/groups/group-list/groupList';
import { groupContext } from '../contextos/readingGroupContext';

export default function GroupsScreen() {
    const { loading, error } = useContext(groupContext)
    if (loading) {
        return <LoadSpinner />
    }
    if (error) {
        return <ErrorMessage title="Error al cargar los grupos" message={typeof error === 'object' ? error.message : error} status={error && typeof error === 'object' ? error.status : undefined} />
    }
    return <GroupList />
}