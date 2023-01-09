import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	isFetching: false,
	error: false,
	temp: true,
	temp2: "123",
};

export const AuthContext = createContext(INITIAL_STATE); // AuthContext stands for Authentication-Context. or we can say Authencation-globalstore.

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				temp: state.temp,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
