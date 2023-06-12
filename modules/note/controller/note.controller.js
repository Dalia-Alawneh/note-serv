import noteModel from "../../../DB/models/note.model.js"

export const getNotes =async (req,res)=>{

    let notes = await noteModel.find().populate()
    return res.json({message:"notes", notes})
}


export const addNote = async (req,res)=>{
    console.log(req.id);
    let {title , description, date} = req.body
    let note = await noteModel.create({title , description, date, UId:req.id})
    return res.status(201).json({ message: "note created" });
}