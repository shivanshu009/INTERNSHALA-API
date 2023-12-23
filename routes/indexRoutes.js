const express = require("express");
const { homepage,
     studentsignup ,
     studentsignin ,
     currentUser,
     studentsendmail,
     studentforgetlink,
     studentresetpassword,
     studentupdate,
     studentsignout,
     studentavatar,
     applyinternship,
     applyjob,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
//GET/
router.get("/", homepage)

// post  /student/signup
router.post("/student/signup",studentsignup)

// post  /student
router.post("/student",isAuthenticated ,currentUser)


// post  /student/signin
router.post("/student/signin",studentsignin)

//  GET  /student/signout
router.get("/student/signout",isAuthenticated,studentsignout)


//  post /student/send-mail
router.post("/student/send-mail",studentsendmail)

//  GET /student/forget-link/:studentId
router.get("/student/forgot-link/:id", studentforgetlink);

//  POST /student/reset-password/:studentId
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);


//  POST /student/update/:studentId
router.post("/student/update/:id", isAuthenticated, studentupdate);



//  POST /student/update/:studentId
router.post("/student/avatar/:id", isAuthenticated, studentavatar);


// =================apply internship===============
//  POST /student/apply/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);


// =================apply job===============
//  POST /student/apply/:internshipid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);
module.exports =router;