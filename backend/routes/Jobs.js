var express = require("express");
var router = express.Router();
//const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load User model
const auth= require("../middleware/auth");
const Jobs = require("../models/Jobs");
const application = require("../models/Application");
router.get("/", function(req, res) {
    Jobs.find(function(err, jobs) {
        if (err) {
            console.log(err);
        } else {
            res.json(jobs);
        }
    })
});
 //POST request 
 //Add a job listing
router.post("/newJob", async (req, res) => {
    const {rec, title, name_of_recruiter, email_of_recruiter, no_of_applicants, no_of_positions, date_of_posting, deadline, skills, type, duration, salary, rating, isDeleted, isActive}= req.body;
    //console.log(rec);
    const newJob = new Jobs({
        rec,
        title,
        name_of_recruiter,
        email_of_recruiter,
        no_of_applicants,
        no_of_positions,
        date_of_posting,
        deadline,
        skills,
        type,
        duration,
        salary,
        rating,
        isDeleted,
        isActive
    });
    //const user= await User.findOne({ email: email_of_recruiter });
        newJob.save()
       // .populate({path: "rec"})
        .then(Jobs => {
            res.status(200).json(newJob);
        })
        .catch(err => {
            res.status(200).send(err);
        });
});

router.post("/MyJobs", async (req, res) => {
    // const _id=req.body.user;
    Jobs.find({email_of_recruiter: req.body.user.email, isActive: true, isDeleted: false})
     .then(MyJobs => res.json(MyJobs))
     .catch(err=> res.status(400).json(err));
});
router.post("/AllJobs", async (req, res) => {
    // const _id=req.body.user;
    Jobs.find({deadline: { $gt : Date.now()},isActive: true, isDeleted: false})
     .then(MyJobs => res.json(MyJobs))
     .catch(err=> res.status(400).json(err));
});
router.post("/SearchJobs", async (req, res) => {
    // const _id=req.body.user;s
    //console.log(req.body);
    Jobs.find({title: req.body.title, isActive: true, isDeleted: false})
     .then(MyJobs => res.json(MyJobs))
     .catch(err=> res.status(400).json(err));
});
router.post("/DeleteJob", async (req, res) => {
    var query={_id: req.body.id};
    var newval={isDeleted: true};
    Jobs.updateOne(query, newval, function(err, final)
    {
        return res.status(200).json({msg: "deleted job"});
    })
});
router.post("/UpdateJob", async (req, res) => {
    var query={_id: req.body.id};
    var newval={no_of_positions: req.body.positions, no_of_applicants: req.body.applicants};
    Jobs.updateOne(query, newval, function(err, final)
    {
        return res.status(200).json({msg: "updated job"});
    })
});
router.post("/getjob", async (req, res) => {
    // const _id=req.body.user;
    Jobs.find({_id: req.body.id, isActive: true, isDeleted: false})
     .then(MyJobs => res.json(MyJobs))
     .catch(err=> res.status(400).json(err));
});
router.post("/Newapplication", async (req, res) => {
    const Newapplication = new application({
        applicant_name: req.body.applicant_name,
        applicant_id: req.body.applicant_id,
        date_of_application: req.body.date_of_application,
        sop: req.body.sop,
        email_of_recruiter: req.body.email_of_recruiter,
        job_id: req.body.job_id,
        job_title: req.body.job_title,
        salary: req.body.salary,
        name_of_recruiter: req.body.name_of_recruiter
    });
        Newapplication.save()
        .then(application => {
            res.status(200).json(application);
        })
        .catch(err => {
            res.status(200).send(err);
        });
});
router.post("/MyApplications", async (req, res) => {
    // const _id=req.body.user;
    application.find({applicant_id: req.body.user._id})
     .then(MyApplications => res.json(MyApplications))
     .catch(err=> res.status(400).json(err));
});
router.post("/MyApplications2", async (req, res) => {
    // const _id=req.body.user;
    application.find({job_id: req.body.id, stage_of_application : { $ne: "Rejected"}})
     .then(MyApplications => res.json(MyApplications))
     .catch(err=> res.status(400).json(err));
});
router.post("/Shortlist", async (req, res) => {
    var query={_id: req.body.id};
    //console.log("abf");
    var newval={stage_of_application: "Shortlisted"};
    application.updateOne(query, newval, function(err, final)
    {
        return res.status(200).json({msg: "Applicant Shortlisted"});
    })
});
router.post("/Accept", async (req, res) => {
    var query={_id: req.body.id};
    //console.log("abf");
    var newval={stage_of_application: "Accepted"};
    application.updateOne(query, newval, function(err, final)
    {
        return res.status(200).json({msg: "Applicant Accepted"});
    })
});
router.post("/Reject", async (req, res) => {
    var query={_id: req.body.id};
    //console.log("abf");
    var newval={stage_of_application: "Rejected"};
    application.updateOne(query, newval, function(err, final)
    {
        return res.status(200).json({msg: "Applicant Accepted"});
    })
});

module.exports = router;
