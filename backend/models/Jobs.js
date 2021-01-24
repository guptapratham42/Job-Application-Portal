const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const roles=['Applicant', 'Recruiter']
// Create Schema
const JobSchema = new Schema
({
	rec:
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	title:
	{
		type: String,
		required: true
	},
	name_of_recruiter: 
	{
		type: String,
		required: true
	},
	email_of_recruiter:
	{
		type: String,
		required: true
	},
	no_of_applicants:
	{
		type: Number,
		required: true
	},
	no_of_positions:
	{
		type: Number,
		required: true
	},
	date_of_posting:
	{
		type: Date,
		required: true
	},
	deadline:
	{
		type: Date,
		//required:true
	},
	skills:
	{
		type: [],
		//required: true
	},
	type:
	{
		type: String,
		required: true
	},
	duration:
	{
		type: Number,
		required: true
	},
	salary:
	{
		type: Number,
		required:true
	},
	rating:
	{
		type: Number,
		//required: true
	},
	isDeleted:
	{
		type: Boolean,
		required: true
	},
	isActive:
	{
		type: Boolean,
		required: true
	}
});

module.exports = Jobs = mongoose.model("Jobs", JobSchema);
