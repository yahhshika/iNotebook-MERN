import AlertContext from "./AlertContext";

import { useState } from "react";
function AlertState({children}){

    let [alertData, setAlertData] = useState({display:"block", message:"", type:""});

    return(
        <AlertContext.Provider value={{alertData, setAlertData}}>
            {children}
        </AlertContext.Provider>
    );
}
export default AlertState;