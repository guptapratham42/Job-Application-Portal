const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roles=['Applicant', 'Recruiter']
// Create Schema
const UserSchema = new Schema
({
	name: 
	{
		type: String,
		required: true
	},
	email: 
	{
		type: String,
		required: true,
		unique: true
	},
	password:
	{
		type: String,
		required: true
	},
	role:
	{
		type: String,
		required: true,
		enum: roles
	},
	date:
	{
		type: Date,
		required: false
	},
	number:
	{
		type: Number,
		required: false,
		default: parseInt("00"),
	},
	Bio:
	{
		type: String,
		required: false,
		default: "Bio not yet entered"
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
