const express = require("express");
     const {   
      currentEmploye,
        homepage,
        employesignin ,
        employesignup ,
        employesignout,
        employesendmail,
        employeforgetlink,
     employeresetpassword, 
     employeupdate,
     employeavatar,
     createinternship,
     readinternship,
     readsingleinternship,
     createjob,
     readjob,
     readsinglejob,
} = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//GET/
router.get("/", homepage)

// // post  /student/signup
router.post("/signup",employesignup)



// post  /student/signin
router.post("/signin",employesignin)

//  GET  /student/signout
router.get("/signout",isAuthenticated,employesignout)

// post / currentEmpolye
router.post("/current",isAuthenticated,currentEmploye)



//  post /send-mail
router.post("/send-mail",employesendmail)

//  GET /forget-link/
router.get("/forgot-link/:id", employeforgetlink);

//  POST /student/reset-password/:studentId
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);


//  POST /student/update/:studentId
router.post("/update/:id", isAuthenticated, employeupdate);



//  POST /student/avatar/:studentId
router.post("/avatar/:id", isAuthenticated, employeavatar);

//  POST /employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);


//  POST /employe/internship/read
router.post("/internship/read", isAuthenticated,readinternship);


//  POST /employe/internship/read/id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

// =========================jobs==================================

//  POST /employe/job/create
router.post("/job/create", isAuthenticated, createjob);


//  POST /employe/job/read
router.post("/job/read", isAuthenticated,readjob);


//  POST /employe/internship/read/id
router.post("/job/read/:id", isAuthenticated, readsinglejob);





 module.exports =router;