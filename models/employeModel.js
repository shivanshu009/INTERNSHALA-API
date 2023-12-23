const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const employeModel = new mongoose.Schema({
    firstname:{
        type:String,
        required: [true, "firstname is required"],
      minLength:[4,"firstname should be atleast 4 character long"]
    },
lastname:{
    type:String,
    required: [true, "lastname is required"],
  minLength:[4,"lastname should be atleast 4 character long"]
},

contact:{
    type:String,
    required: [true, "contact is required"],
  maxLength:[10,"contact must not axceed 10 character long"],
  minLength:[10,"contact should be atleast 10 character long"]

},


    email:{
        type:String,
        unique:true,
        required: [true, "email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please fill a valid email address'],
    },
    password:{
        type:String,
        select:false,
maxLength:[15,"password should not exceed more then 15 characters"],
minLength:[6,"password should have atleast 6 characters"],
// match:[],
    },
    resetPasswordToken: {
        type: String,
        default: "0"
    },
organizationlogo:{
    type:Object,
    default:{
        fileId:"",
        url:"https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }},
    organizationname:{
        type:String,
        required: [true, "organization name is required"],
      minLength:[4,"organization name should be atleast 4 character long"]
    },
    internships: [
        { type: mongoose.Schema.Types.ObjectId, ref: "internship" },
    ],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
},
{ timestamps: true })

employeModel.pre("save", function(){
    if (!this.isModified("password")){
        return;
    }
let salt = bcrypt.genSaltSync(10);
this.password = bcrypt.hashSync(this.password, salt)

})
employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

employeModel.methods.getjwttoken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

const Employe = mongoose.model("employe", employeModel)
module.exports = Employe ;


