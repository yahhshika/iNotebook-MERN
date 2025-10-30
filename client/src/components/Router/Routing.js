import { Routes, Route } from "react-router-dom";
import About from "../Notes/About";
import Signup from "../Users/UserSignup";
import Login from "../Users/UserLogin";
import Error from "../Alerts/Error";
import Authorization from "../Users/Authorization";
import Home from "../Notes/Home";
function Routing(){
    return <>
        <Routes>
            <Route  exact path="/" element={<Authorization>
            <Home/>
            </Authorization>}>
            </Route>
            <Route exact path="/about" element={<About/>}>
            </Route>
            <Route exact path="/signup" element={<Signup/>}>
            </Route>
            <Route exact path="/login" element={<Login/>}>
            </Route>
            <Route exact path="/error" element={<Error/>}></Route>

        </Routes>
    </>
}
export default Routing;