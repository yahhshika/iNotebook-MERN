
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from '../../contexts/NoteState';
import About from '../Notes/About';
import Home from '../Notes/Home';
import Navbar from '../Util/Navbar';
import Signup from "../Users/UserSignup";
import Login from "../Users/UserLogin";
import Authorization from "../Users/Authorization";
import Error from "../Alerts/Error";
import ErrorState from "../../contexts/ErrorState";
import AlertState from "../../contexts/AlertState";
import Routing from "../Router/Routing";
function FinalComp(){
    return <>
        <Router>
            <ErrorState>
                <AlertState>
                    <NoteState>
                        <Navbar/>
                        <div className='container col-8'>
                            <Routing/>
                        </div>

                    </NoteState>
                </AlertState>
            </ErrorState>
      </Router>
    </>
}
export default FinalComp;