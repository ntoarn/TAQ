
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/User";
import instance from "../apis";
import userReducer from "../reducers/userReducer";

type UserContextType = {
    state: { users: IUser[] }
    handleRemoveUser: (id: string) => void
    handleUser: (user: IUser) => void
}

export const UserContext = createContext({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(userReducer, { users: [] })

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get(`/users`)
                dispatch({ type: 'SET_USERS', payload: data.data })
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        })()
    }, [])

    const handleRemoveUser = async (id: string) => {
        if (confirm("Are you sure you want to delete?")) {
            try {
                await instance.delete(`/users/${id}`)
                dispatch({ type: 'DELETE_USER', payload: id })
            } catch (error) {
                console.error("Error deleting users:", error)
            }
        }
    }

    const handleUser = async (user: IUser) => {
		try {
			if (user._id) {
                const { data } = await instance.put(`/users/me/${user._id}`, user);
                dispatch({ type: "UPDATE_USER", payload: data });
                alert(data.message);
                navigate("/admin/user");
              } else {
                alert("Loi edit");
              }
			navigate("/admin/user");
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <UserContext.Provider value={{ state, handleRemoveUser, handleUser }}>
            {children}
        </UserContext.Provider>
    )
}