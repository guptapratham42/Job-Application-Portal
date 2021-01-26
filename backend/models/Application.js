const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const roles=['Applicant', 'Recruiter']
// Create Schema
const applicationSchema = new Schema
({
	applicant_name:
	{
		type: String,
		required: true
	},
	applicant_id:
	{
		type: String,
		required: true
	},
	date_of_application: 
	{
		type: Date,
		required: true
	},
	sop:
	{
		type: String,
		required: true
	},
	rating:
	{
		type: Number,
		//required: true
	},
	stage_of_application:
	{
		type: String,
		default: "Applied"
		//required: true
	},
	email_of_recruiter:
	{
		type: String,
		required: true
	},
	job_id:
	{
		type: String,
		required: true
	},
	job_title:
	{
		type: String,
		required: true
	},
	salary:
	{
		type: Number,
		required: true
	},
	name_of_recruiter:
	{
		type: String,
		required: true
	}
});

module.exports = application = mongoose.model("application", applicationSchema);
