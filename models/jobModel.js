const mongoose = require("mongoose")

const jobModel = new mongoose.Schema({
    students: [{type : mongoose.Schema.Types.ObjectId, ref:"student"}],
    
    employe: {type : mongoose.Schema.Types.ObjectId, ref:"employe"},

   title:String,
    skill: String,
jobtype: {type: String , enum:[ "In office", "Remote"]},
openings: Number,
description: String,
preferences: String,
salary: Number,
parks:String,
assisments: String,

},
{timestamps:true}
);



const Job = mongoose.model("job", jobModel)
module.exports =Job ;   