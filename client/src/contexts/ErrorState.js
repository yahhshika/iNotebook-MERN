import { useContext } from "react";
import ErrorContext from "./ErrorContext";
import { useState } from "react";

function ErrorState({children}){
    let [error, setError] = useState({type:"", content:""});
    return(
        <ErrorContext.Provider value={{error, setError}}>
            {children}
        </ErrorContext.Provider>
    )
}
export default ErrorState;