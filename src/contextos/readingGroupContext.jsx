import { createContext, useState } from 'react'
import { getAllGroups, getGroupById, getMyGroups, createGroup, joinGroup, leaveGroup } from '../services/groupsService'

export const groupContext = createContext({
    getAllGroupsList: () => {},
    getMyGroupsList: () => {},
    getGroup: (groupId) => {},
    createNewGroup: (groupData) => {},
    joinNewGroup: (groupId) => {},
    leaveGroupById: (groupId) => {}
})

const GroupContextProvider = ({ children }) => {
    const [allGroups, setAllGroups] = useState([])
    const [myGroups, setMyGroups] = useState([])
    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const getAllGroupsList = async () => {
        setLoading(false)
        setError('')
        try {
            const response = await getAllGroups()
            if (response.ok) {
                setAllGroups(response.data.groups)

            } else if (response.status && response.status >= 400 && response.message) {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            if (error && error.status) {
                setError({ status: error.status, message: error.message })
            } else if (error && error.message && error.message.toLowerCase().includes('token')) {
                setError({ status: 401, message: error.message })
            } else if (error && error.message) {
                setError({ status: 500, message: error.message })
            } else {
                setError('')
            }
            return false
        }
    }
    const getMyGroupsList = async () => {
        setLoading(false)
        setError('')
        try {
            const response = await getMyGroups()
            if (response.ok) {
                setMyGroups(response.data.groups)
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            if (error && error.status) {
                setError({ status: error.status, message: error.message || 'Error de conexión' })
            } else {
                setError({ status: 500, message: error.message || 'Error de conexión' })
            }
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const getGroup = async (groupId) => {
        setLoading(false)
        setError('')
        try {
            const response = await getGroupById(groupId)
            if (response.ok && response.data && response.data.group) {
                setGroup(response.data.group)
                return response.data.group
            } else {
                setGroup(null)
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            setGroup(null)
            if (error && error.status) {
                setError({ status: error.status, message: error.message || 'Error de conexión' })
            } else {
                setError({ status: 500, message: error.message || 'Error de conexión' })
            }
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const createNewGroup = async (groupData) => {
        setLoading(false)
        setError('')
        try {

            const response = await createGroup({
                groupName: groupData.groupName || groupData.name,
                description: groupData.description
            });

            if (response.ok) {
                const newGroup = response.data.group;
                await getMyGroupsList();
                return newGroup;
            } else {
                setError({ status: response.status, message: response.message });
            }
        } 
        catch (error) {

            if (error && error.status) {
                setError({ status: error.status, message: error.message || 'Error de conexión' });
            } else {
                setError({ status: 500, message: error.message || 'Error de conexión' });
            }
            return false;
        } 
        finally {
            setLoading(false);
        }
    }
    const joinNewGroup = async (groupId) => {
        setLoading(false)
        setError('')
        try {
            const response = await joinGroup(groupId)
            if (response.ok) {
                await getMyGroupsList()
                await getAllGroupsList()
                return response.data
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            if (error && error.status) {
                setError({ status: error.status, message: error.message || 'Error de conexión' })
            } else {
                setError({ status: 500, message: error.message || 'Error de conexión' })
            }
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const leaveGroupById = async (groupId) => {
        setLoading(false)
        setError('')
        try {
            const response = await leaveGroup(groupId)
            if (response.ok) {
                await getMyGroupsList()
                await getAllGroupsList()
                return response.data
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            if (error && error.status) {
                setError({ status: error.status, message: error.message || 'Error de conexión' })
            } else {
                setError({ status: 500, message: error.message || 'Error de conexión' })
            }
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const getAllGroupsData = async () => {
        setLoading(false)
        setError('')
        try {
            const [allGroupsRes, myGroupsRes] = await Promise.all([
                getAllGroups(),
                getMyGroups()
            ])
            if (allGroupsRes.ok) {
                setAllGroups(allGroupsRes.data.groups)
            } else if (allGroupsRes.status && allGroupsRes.status >= 400 && allGroupsRes.message) {
                setError({ status: allGroupsRes.status, message: allGroupsRes.message })
            }
            if (myGroupsRes.ok) {
                setMyGroups(myGroupsRes.data.groups)
            } else if (myGroupsRes.status && myGroupsRes.status >= 400 && myGroupsRes.message) {
                setError({ status: myGroupsRes.status, message: myGroupsRes.message })
            }
        } catch (error) {
            if (error && error.status) {
                setError({ status: error.status, message: error.message || 'Error de conexión' })
            } else {
                setError({ status: 500, message: error.message || 'Error de conexión' })
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <groupContext.Provider 
            value={{
                allGroups: allGroups,
                myGroups: myGroups,
                group: group,
                loading: loading,
                error: error,
                getAllGroupsList: getAllGroupsList,
                getMyGroupsList: getMyGroupsList,
                getAllGroupsData: getAllGroupsData,
                getGroup: getGroup,
                createNewGroup: createNewGroup,
                joinNewGroup: joinNewGroup,
                leaveGroupById: leaveGroupById
            }}
        >
            {children}
        </groupContext.Provider>
    )
}

export default GroupContextProvider