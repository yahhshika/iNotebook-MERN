const express = require("express");
const router = express.Router();
const getId = require("../middlewares/getId");
const Notes = require("../models/notes");
const { body, validationResult } = require('express-validator');
// route to fetch all notes.
// READ
router.get("/",getId,async(req,res)=>{
    let success = true;
    try{
        let notes = await Notes.find({user: req.user.id}).sort({ date: -1 });
        if(!notes.length){
            return res.json({success,result:[]});
        }
        res.json({success, result: notes});

    }catch(err){
        success = false;
        res.status().json({success,error: "Internal Server Error: "+err.message });
    }
})

// Create Notes.
router.post("/", getId,[
    body('title','give a proper title').isLength({min : 3}),
    body('description', "description can't be empty").notEmpty(),
], async(req,res)=>{
    let success = true
    let validity = validationResult(req);
    if(!validity.isEmpty()){
        success = false
        return res.status(400).json({success,error: validity.errors});
    }

    try{
        let note = new Notes({...req.body, user:req.user.id});
        let result = await note.save();
        res.json({success,result});
    }catch(err){
        success = false;
        res.status().json({success,error: "Internal Server Error: "+err.message });
    }
})


// update a note, only if the logged in/signed in user is the owner of it.
router.put("/:id",getId,async(req,res)=>{
    let success = true;
    try{
        // find the note
        let note = await Notes.findById(req.params.id);
        if(!note){
            success = false;
            return res.status(404).json({success,error:"no such note exists"});
        }
        // chdck if the user is owner
        if(note.user.toString() !== req.user.id){
            success = false;
            return res.status(401).json({success,error:"you are not the owner of this note"});
        }

        let newNote = {};
        if(req.body.title){
            newNote.title = req.body.title;
        }
        if(req.body.description){
            newNote.description = req.body.description;
        }
        if(req.body.tag){
            newNote.tag = req.body.tag;
        }
        // all set, update the note.
        let result = await Notes.findByIdAndUpdate(note.id, newNote, {runValidators: true, new:true});
        res.json({success,result});
    }
    catch(err){
        success = false;
        res.status().json({success,error: "Internal Server Error: "+err.message });       
    }
})

router.delete("/:id", getId, async(req,res)=>{
    let success = true;
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            success = false;
            return res.status(404).json({success,error:"no such note exists"});
        }
        if(note.user.toString() !== req.user.id){
            success = false
            return res.status(401).json({success,error:"you are not the owner of the note"});
        }

        let result = await Notes.findByIdAndDelete(note.id);
        res.json({success,action: "deleted", result});
    }
    catch(err){
        success = false
        res.status().json({success,error: "Internal Server Error: "+err.message });       
    }
})
module.exports = router;