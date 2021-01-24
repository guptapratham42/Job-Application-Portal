var express = require("express");
var router = express.Router();
//const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load User model
const auth= require("../middleware/auth");
const Jobs = require("../models/Jobs");

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
router.post("/DeleteJob", async (req, res) => {
    var query={_id: req.body.id};
    var newval={isDeleted: true};
    Jobs.updateOne(query, newval, function(err, final)
    {
        //if(err)
          //  throw err;
        //console.log("deleted");
        return res.status(200).json({msg: "deleted job"});
    })
});
router.post("/UpdateJob", async (req, res) => {
    var query={_id: req.body.id};
    var newval={no_of_positions: req.body.positions, no_of_applicants: req.body.applicants};
    Jobs.updateOne(query, newval, function(err, final)
    {
        //if(err)
          //  throw err;
        //console.log("deleted");
        return res.status(200).json({msg: "updated job"});
    })
});
module.exports = router;
