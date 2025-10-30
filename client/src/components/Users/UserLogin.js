import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
    let location = useLocation();
    let navigate = useNavigate();
    let [credentails, setCredentials] = useState({email:'', password:''});
    
    let onChangeHandler = (event)=>{
        console.log(event.target.value)
        setCredentials(prev=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }

    let onSubmitHandler = async(event)=>{
        event.preventDefault();
        let response = await fetch("http://localhost:5000/api/auth/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(credentails)
        })
        let jsonres = await response.json();
        console.log(jsonres);
        setCredentials({email:'', password:''});
        if(jsonres.authToken){
            localStorage.setItem("authToken", jsonres.authToken);
            console.log(localStorage);
            let path = location.state?.from?.pathname || "/";
            navigate(path, {replace:true});
        }
        else{
            navigate('/signup');
        }

    }

    return <>
        <form onSubmit={onSubmitHandler}>
            <div className="mb-3 mt-5">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentails.email} onChange={onChangeHandler} name="email"/>
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={credentails.password} onChange={onChangeHandler} name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
}
export default Login;