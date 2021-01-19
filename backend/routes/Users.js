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

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
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
    //const existingUser= await User.findOne({ email: email });
    //     User.findOne({ email }).then(Existinguser => {
    //     // Check if user email exists
        // if (Existinguser) {
        //     return res.status(404).json({
        //         msg: "Account with this email already exists",
        //     });
        //     return;
  // }
    // });
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

module.exports = router;
