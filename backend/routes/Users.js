var express = require("express");
var router = express.Router();
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load User model
const auth= require("../middleware/auth");
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});


router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        date: req.body.date
    });
    const { email, name, password, role, date}= req.body;
    if(!name || !email || !password || !role)
        return res.status(200).json({msg: "Please enter all the required details!"});
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    newUser.password=passwordhash;
        newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(200).send(err);
        });
});

// POST request 
// Login
router.post("/login", async (req, res) => {
	const {email, password} = req.body;
	// Find user by email
    if(!email || !password)
        return res.status(200).json({msg: "Please enter all the required details!"});
	const user= await User.findOne({ email: email });
    if(!user)
        return res.status(200).json({msg: "No account with this email found"});
    //console.log(password);
    //console.log(user.password);
    const ismatch = await bcrypt.compare(password, user.password);
    if(!ismatch)
    {
        return res.status(200).json({msg: "Incorrect password"});
    }
    const token = jwt.sign({ id: user._id}, "abc");
    res.json({
        token,
        user
    })
});

router.post("/RecProfile", async (req, res) => {
    var query={_id: req.body.id};
    var newval={name: req.body.name, email: req.body.email, number: req.body.number, Bio: req.body.Bio};
    //console.log(req.body);
    User.updateOne(query, newval, function(err, final)
    {
        //if(err)
          //  throw err;
        //console.log("deleted");
        return res.status(200).json({msg: "updated Profile"});
    })
});
router.post("/update", async (req, res) => {
    const user= await User.findOne({ _id: req.body.id });
    //var newval={name: req.body.name, email: req.body.email, number: req.body.number, Bio: req.body.Bio};
    //console.log(req.body);
    return res.status(200).json(user);
});
router.post("/AppProfile", async (req, res) => {
    var query={_id: req.body.id};
    var newval={name: req.body.name, email: req.body.email};
    //console.log(req.body);
    User.updateOne(query, newval, function(err, final)
    {
        //if(err)
          //  throw err;
        //console.log("deleted");
        return res.status(200).json({msg: "updated Profile"});
    })
});

module.exports = router;
