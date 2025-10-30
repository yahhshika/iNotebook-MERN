import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Form  from "./Form";
import Show from "./Show";
function Home(){
    let navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            navigate("/login");
        }
    })
 
    return (<>
        <Form/>
        <Show/>
    </>)
}

export default Home;