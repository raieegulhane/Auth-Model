import { createContext, useContext, useReducer } from "react";
import { initialAuthData, authReducerFunction } from "../reducers/auth-reducer";

const AuthContext = createContext({ initialAuthData });

const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducerFunction, { ...initialAuthData });

    return(
        <AuthContext.Provider value={{ authState, authDispatch }}>
            { children }
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };