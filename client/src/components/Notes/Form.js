import { useState, useContext } from "react";
import NoteContext from "../../contexts/NoteContext";
import { v4 as uuidv4 } from 'uuid';
function Form() {
    let {addNotes} = useContext(NoteContext);
    let [curNote, setCurNote] = useState({title:"", description:"", tag:""});
    let onChangeHandler =(event)=>{
        
        setCurNote((prev)=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }
    let onSubmitHandler = (event)=>{
        event.preventDefault();
        addNotes(curNote);
        setCurNote({title:"", description:"", tag:""})
    }
    return (<>
        <form onSubmit={onSubmitHandler} className="mt-5">
            <div className="mb-3">
                <label htmlFor="title" className="form-label" required>Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' value={curNote.title} onChange={onChangeHandler} />
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label" required>Description</label>
                <textarea className="form-control" id="desc" name="description" value={curNote.description} onChange={onChangeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={curNote.tag} onChange={onChangeHandler} />
            </div>
          
            <button type="submit" className="btn btn-primary">Add Note</button>
        </form>

    </>);
}
export default Form;