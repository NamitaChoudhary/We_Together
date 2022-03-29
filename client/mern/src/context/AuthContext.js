import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={

    user:JSON.parse(localStorage.getItem('user'))||null,
    isfetching:false,
    error:false,
    socket:null,
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{
    
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);
    return(
        <AuthContext.Provider value={{
            user:state.user,
            isfetching:state.isfetching,
            error:state.error,
            socket:state.socket,
            dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}