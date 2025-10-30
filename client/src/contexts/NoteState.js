import NoteContext from "./NoteContext";
import { useState,useContext } from "react";
import ErrorContext from "./ErrorContext";
import { useNavigate } from "react-router-dom";
function NoteState({children}){
    let navigate = useNavigate();
    let { setError } = useContext(ErrorContext);
    const host = "http://localhost:5000";
    // const initialNotes = []
    const authToken = localStorage.getItem("authToken");
    let [notes, setNotes] = useState([]);


    async function getDBnotes(){
        try{

            const response = await fetch(`${host}/api/notes`, {
                method:"GET",
                headers:{
                    "auth-token":authToken,
                    "Content-Type": "application/json"
                }
            })
            const jsonRes =await response.json();
            // console.log(jsonRes);
            if(jsonRes.success){

                setNotes(jsonRes.result);
            }else{
                throw new Error(jsonRes.error);
                
            }
        }catch(err){
            setError({type:"danger", content: err.message || "unable to fetch notes"})
            navigate("/error");

        }
    }
    async function addNotes(note){
        //backend-logic
        try{

            const response = await fetch(`${host}/api/notes`,{
                method:"POST",
                headers:{
                    "auth-token":authToken,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(note)
            })
            const jsonRes = await response.json();
            // console.log(jsonRes);
            if(jsonRes.success){

                setNotes(prev=>{
                    return [...prev, jsonRes.result];
                });
            }else{
                throw new Error(jsonRes.error);
                
            }
        }catch(err){
            setError({type:"danger", content: err.message || "unable to add the note"})
            navigate("/error");

        }
        //front-end logic
        // setNotes(prev=>{
        //     return [...prev, note];
        // })
    }

    

    async function deleteNotes(id){
        //back-end logic
        try{
            
            const response = await fetch(`${host}/api/notes/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":authToken
                }
            })
            const jsonRes = await response.json();
            console.log(jsonRes);
            // console.log(jsonRes);
            if(jsonRes.success){

                setNotes((prev)=>{
                    return prev.filter(note=>(note._id !== jsonRes.result._id));
                })
            }else{
                throw new Error(jsonRes.error);
            }
            //front-end logic
            // setNotes(prev=>{
            //     return prev.filter(note=>note._id !== id);
            // })
        }catch(err){
            setError({type:"danger", content: err.message || "unable to delete notes"})
            navigate("/error");
        }
    }

    async function editNotes(data){
        try{

            const response = await fetch(`${host}/api/notes/${data._id}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":authToken
                },
                body:JSON.stringify({title:data.title,description:data.description,tag:data.tag})
            });
            const jsonRes = await response.json();

            // console.log(jsonRes);
            if(jsonRes.success){

                setNotes((prev)=>{
                    return prev.map(note=>{
                        if(note._id==jsonRes.result._id){
                            return jsonRes.result;
                        }
                        return note;
                    })
                })
            }else{
                throw new Error(jsonRes.error);
            }
            //front-end logic
            // setNotes(prev=>{
            //     return prev.map(note=>{
            //         if(note._id==data._id){
            //             return {...prev,title:data.title, description:data.description, tag:data.tag};
            //         }
            //         return note;
            //     })
            // })
        }catch(err){
            setError({type:"danger", content: err.message || "unable to edit"})
            navigate("/error");
        }



    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNotes, deleteNotes, editNotes, getDBnotes}}>
            {children}
        </NoteContext.Provider>
    )
}
export default NoteState;