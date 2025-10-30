import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(){
    let navigate = useNavigate();
    let [credentails, setCredentials] = useState({name:'',email:'', password:''});
    
    let onChangeHandler = (event)=>{
        console.log(event.target.value)
        setCredentials(prev=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }

    let onSubmitHandler = async(event)=>{
        event.preventDefault();
        let response = await fetch("http://localhost:5000/api/auth/signup", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(credentails)
        })
        let jsonres = await response.json();
        console.log(jsonres);
        setCredentials({name:'', email:'', password:''});
        if(jsonres.authToken){
            localStorage.setItem("authToken", jsonres.authToken);
            navigate('/');
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
                <label className="form-check-label" htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" value={credentails.name} onChange={onChangeHandler} name="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={credentails.password} onChange={onChangeHandler} name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
}
export default Signup;