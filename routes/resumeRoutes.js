const express = require("express");
const {resume,
     addeducation,
     editeducation,
     deleteeducation,
     addresp,
     editresp,
     deleteresp,
     addjob,
     editjob,
     deletejob,
     addintern,
     editintern,
     deleteintern,
     addcours,
    editcours,
    deletecours,
    addproj,
    editproj,
    deleteproj,
    addskil,
    editskil,
    deleteskil,
    addacomp,
    editacomp,
    deleteacomp,

} = require("../controllers/resumecontrollers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//GET/
router.get("/",isAuthenticated, resume)

// POST

router.post("/add-edu", isAuthenticated, addeducation)

// POST

router.post("/edit-edu/:eduid", isAuthenticated, editeducation)
// POST

router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)
// ============================jobs=====================================

router.post("/add-job", isAuthenticated, addjob)

// POST

router.post("/edit-job/:jobid", isAuthenticated, editjob)
// POST

router.post("/delete-job/:jobid", isAuthenticated, deletejob)

// =========internship================

router.post("/add-intern", isAuthenticated, addintern)
// POST
router.post("/edit-intern/:internid", isAuthenticated, editintern)
// POST
router.post("/delete-intern/:internid", isAuthenticated, deleteintern)
// ===================responsibilities=================================

router.post("/add-resp", isAuthenticated, addresp)
// POST
router.post("/edit-resp/:respid", isAuthenticated, editresp)
// POST
router.post("/delete-resp/:respid", isAuthenticated, deleteresp)
// ----------------------------Courses--------------------
// POST
router.post("/add-cours", isAuthenticated, addcours);

// POST
router.post("/edit-cours/:coursid", isAuthenticated, editcours);

// POST
router.post("/delete-cours/:coursid", isAuthenticated, deletecours);

// ----------------------------projects--------------------
// POST
router.post("/add-proj", isAuthenticated, addproj);

// POST
router.post("/edit-proj/:projid", isAuthenticated, editproj);

// POST
router.post("/delete-proj/:projid", isAuthenticated, deleteproj);

// ----------------------------skills--------------------
// POST
router.post("/add-skil", isAuthenticated, addskil);

// POST
router.post("/edit-skil/:skilid", isAuthenticated, editskil);

// POST
router.post("/delete-skil/:skilid", isAuthenticated, deleteskil);

// ----------------------------accomplishments--------------------
// POST
router.post("/add-acomp", isAuthenticated, addacomp);

// POST
router.post("/edit-acomp/:acompid", isAuthenticated, editacomp);

// POST
router.post("/delete-acomp/:acompid", isAuthenticated, deleteacomp);

module.exports =router;