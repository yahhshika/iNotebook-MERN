import ErrorContext from "../../contexts/ErrorContext";
import { useContext } from "react";
function Error(){
    let {type, content} = useContext(ErrorContext);
    return <>
        <div className={`alert alert-${type || "danger"} mt-5`} role="alert">
            {content || <p>Something went wrong, Try Again!</p>}
        </div>
    </>
}
export default Error;