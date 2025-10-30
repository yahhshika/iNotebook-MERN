import { useContext, useState, useEffect } from "react";
import NoteContext from "../../contexts/NoteContext";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Show() {
    let ref1 = useRef(null);
    let [curNote, setCurNote] = useState({_id:"", title: "", description: "", tag: "" });
    let { notes, deleteNotes, editNotes, getDBnotes } = useContext(NoteContext);

    
    useEffect(()=>{
        getDBnotes();
    },[]);



    let onDeleteHandler = (idx) => {
        deleteNotes(idx);
    }

    let handleEdit = (idx, noteId) => {
        ref1.current.click();
        setCurNote({_id:notes[idx]._id, title: notes[idx].title, description: notes[idx].description, tag: notes[idx].tag });
    }

    let onChangeHandler = (event)=>{
        setCurNote(prev=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }
    let handleEditSubmit = (event)=>{
        event.preventDefault();
        editNotes(curNote);
        setCurNote({_id:"", title: "", description: "", tag: "" });

    }
    return <>
        {console.log(curNote)}
        <button ref={ref1} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">


                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label" required>Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' value={curNote.title} onChange={onChangeHandler} />
                                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label" required>Description</label>
                                <textarea className="form-control" id="desc" name="description" value={curNote.description} onChange={onChangeHandler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag" name="tag" value={curNote.tag} onChange={onChangeHandler} />
                            </div>

                            {/* <button type="submit" className="btn btn-primary">Add Note</button> */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </div>


        <div className="row">
            {/* {console.log(notes)} */}
            {notes.length==0?
            <div className={`alert alert-success mt-5`} role="alert">
                No Notes Available
            </div>:
            notes.map((note,idx) => (

                <div className="card col-md-12 col-lg-4 my-3" key={idx}>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                        <Link className="btn" to="#" role="button" style={{ fontSize: "20px" }} onClick={() => { onDeleteHandler(note._id) }}><i className="fa-solid fa-trash"></i></Link>
                        <Link className="btn" href="#" role="button" style={{ fontSize: "20px" }} onClick={() => { handleEdit(idx, note._id) }}><i className="fa-solid fa-pen-to-square"></i></Link>

                    </div>
                </div>
            ))}
        </div>
    </>
}

export default Show;