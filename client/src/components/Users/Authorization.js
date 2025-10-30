import { useLocation, Navigate } from "react-router-dom";
function Authorization({children}){

    let location = useLocation();

    if(!localStorage.getItem("authToken")){
        return <Navigate to={"/login"} state={{ from: location }} replace/>;
    }
    return children;


}
export default Authorization;