import { useNavigate } from "react-router-dom";
function Navbar() {
    let navigate = useNavigate();

    let onClickLogin = ()=>{
        navigate("/login");
    }
    let onClickSignUp = ()=>{
        navigate("/signup");
    }
    let onLogout= ()=>{
        localStorage.removeItem("authToken");
        console.log("Logged out");
        navigate("/login");
        
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">iNoteBook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
               
                    </ul>
                    <div className="d-flex">
                        {localStorage.getItem("authToken")?
                        <button className="btn btn-outline-success me-2" type="submit" onClick={onLogout}>Logout</button>:
                        <button className="btn btn-outline-success me-2" type="submit" onClick={onClickLogin}>LogIn</button>}
                        <button className="btn btn-outline-success" type="submit" onClick={onClickSignUp}>New Account</button>
                    </div>
                </div>
            </div>
        </nav>


    </>
}
export default Navbar;