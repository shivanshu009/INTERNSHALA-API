// const ImageKit = require("imagekit");
const { exec } = require("child_process");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const  Job = require("../models/jobModel");

const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendToken");
const imagekit = require('../utils/imageKit').initImageKit()
const path = require("path")


exports.homepage = catchAsyncErrors(async(req,res,next)=>{
        res.json({message:" secure homepage!"});
})


exports.currentUser = catchAsyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.id).exec();
  
  res.json({student});

})

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});


exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
  .select("+password")
  .exec();


  if (!student)
    return next(new ErrorHandler("user not found with this email address ", 404))

  const isMatch = student.comparepassword(req.body.password)
  if (!isMatch) return next(new ErrorHandler("wrong credientials", 500))
  sendtoken(student, 200, res);
});


exports.studentsignout = catchAsyncErrors(async (req, res, next) => {

res.clearCookie("token");
res.json({message: "successfully signout"})
});

exports.studentsendmail = catchAsyncErrors(async(req,res,next)=>{
  const student = await Student.findOne({ email: req.body.email }).exec()
  if (!student)
  return next(new ErrorHandler("user not found with this email address ", 404))
const url =` ${req.protocol}://${req.get("host")}/student/forgot-link/${
  student._id
}`
sendmail(req,res,next,url)
student.resetPasswordToken ="1";
 await student.save();
  res.json({student, url});
})


exports.studentforgetlink = catchAsyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.params.id).exec()
  if (!student)
  return next(new ErrorHandler("user not found with this email address ", 404))
  if(student.resetPasswordToken =="1"){
    student.resetPasswordToken ="0"
student.password = req.body.password;
await student.save();


  } else{
  return next(new ErrorHandler("invailed reset password link please try again ", 500))

  }

res.status(200).json({
  message:"password has been successfully changed"
})
})

exports.studentresetpassword = catchAsyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.id).exec();
student.password = req.body.password;
await student.save();
sendtoken(student, 201, res);

})

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
  await  Student.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({
    success:true,
    message:"student Updated successfully",
   
  })
});


exports.studentavatar= catchAsyncErrors(async (req, res, next) => {
const student = await  Student.findById(req.params.id).exec();
const file = req.files.avatar;

const modifiedFileName = `resumebuilder-${Date.now()}${path.extname((file.name))}`

if (student.avatar.fileId !==""){
    await imagekit.deleteFile(student.avatar.fileId);
  }

const {fileId,url} = await imagekit.upload({
  file:file.data,
  fileName: modifiedFileName,
})
student.avatar = {fileId,url};
await student.save()
res.status(200).json({
  success: true,
  message:"profile updated"
})
});


exports.applyinternship= catchAsyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
await student.save();
await internship.save();
  res.json({student, internship});
})

exports.applyjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();
  console.log(job)
  student.jobs.push(job._id);
  
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.json({ student, job });
});


 