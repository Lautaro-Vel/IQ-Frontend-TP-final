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
        setLoading(true)
        setError('')
        try {
            const response = await getAllGroups()
            if (response.ok) {
                setAllGroups(response.data)
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const getMyGroupsList = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await getMyGroups()
            if (response.ok) {
                setMyGroups(response.data)
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const getGroup = async (groupId) => {
        setLoading(true)
        setError('')
        try {
            const response = await getGroupById(groupId)
            if (response.ok) {
                setGroup(response.data)
                return response.data
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const createNewGroup = async (groupData) => {
        setLoading(true)
        setError('')
        try {
            const response = await createGroup(groupData)
            if (response.ok) {
                const newGroup = response.data
                setMyGroups([...myGroups, newGroup])
                return newGroup
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const joinNewGroup = async (groupId) => {
        setLoading(true)
        setError('')
        try {
            const response = await joinGroup(groupId)
            if (response.ok) {
                for (let i = 0; i < allGroups.length; i++) {
                    if (allGroups[i]._id === groupId) {
                        const joinedGroup = allGroups[i]
                        setMyGroups([...myGroups, joinedGroup])
                        break
                    }
                }
                return response.data
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
            setLoading(false)
        }
    }
    const leaveGroupById = async (groupId) => {
        setLoading(true)
        setError('')
        try {
            const response = await leaveGroup(groupId)
            if (response.ok) {
                // Remover el grupo de myGroups usando for loop
                const updatedGroups = []
                for (let i = 0; i < myGroups.length; i++) {
                    if (myGroups[i]._id !== groupId) {
                        updatedGroups.push(myGroups[i])
                    }
                }
                setMyGroups(updatedGroups)
                return response.data
            } else {
                setError({ status: response.status, message: response.message })
            }
        } 
        catch (error) {
            return false
        } 
        finally {
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