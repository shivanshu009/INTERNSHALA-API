const mongoose = require("mongoose")

const internshipModel = new mongoose.Schema({
    employe: {type : mongoose.Schema.Types.ObjectId, ref:"employe"},
    students: [{type : mongoose.Schema.Types.ObjectId, ref:"student"}],

    profile: String,
    skill: String,
internshiptype: {type: String , enum:[ "In office", "Remote"]},

openings: Number,

from:String,
to:String ,
resposibility:String,
duration:String,
stipend:{
    status: {
        type: String,
         enum:[ "Fixed", "negotiable", "performance based", "unpaid"],},
    amount: Number,
    
    },
    parks:String,
    assisments: String,
    
},
{timestamps:true}
);

internshipModel.pre("save", function(){
    if (!this.isModified("password")){
        return;
    }
let salt = bcrypt.genSaltSync(10);
this.password = bcrypt.hashSync(this.password, salt)

})


const Internship = mongoose.model("internship", internshipModel)
module.exports =Internship ;
