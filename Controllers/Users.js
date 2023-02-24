const bcrypt = require('bcrypt');
const saltRounds = 10;
const usersModal = require("../Models/Seedworks");
const { successJson, errorJson } = require("../utils/response");
var db = require('../Config/db');

module.exports.createUser =  async(req, res) => {
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	let access = req.body.access;
	// const encryptedPassword = await bcrypt.hash(password, saltRounds);
	let data = db.query(`INSERT INTO GWR.users
  (name,email,password,access) VALUES ('${name}','${email}','${password}','${access}');`);

	res.status(200).json({ message: "User created", data: data });
};

module.exports.getUsers = (req, res) => {
	const data = db.query(`SELECT * FROM seedworks.users`);
	if (data) {
		const successResponse = successJson("User list", data);
		res.send(successResponse);
	} else {
		const errorResponse = errorJson();
		res.send(errorResponse);
	}

	// {
	// 	"message": "User list",
	// 	"data": [
	// 		{
	// 			"_id": "63bfc79aa0931dac813edd78",
	// 			"userName": "Harshit",
	// 			"mobileNumber": "9873538906",
	// 			"state": "Delhi",
	// 			"city": "New Delhi",
	// 			"otp": "038171",
	// 			"__v": 0
	// 		},
	// 		{
	// 			"_id": "63c7ef26e0647dd5306541f7",
	// 			"userName": "Harsh Mishra",
	// 			"mobileNumber": "9695417639",
	// 			"state": "UttarPradesh",
	// 			"city": "Renukoot",
	// 			"__v": 0,
	// 			"otp": "058362"
	// 		},
	// 		{
	// 			"_id": "63c83719e0647dd53065420b",
	// 			"userName": "Prayag",
	// 			"mobileNumber": "7778865503",
	// 			"state": "Maharashtra",
	// 			"city": "Mumbai",
	// 			"__v": 0,
	// 			"otp": "385740"
	// 		},
	// 		{
	// 			"_id": "63d3b3716f2d45fbcf922fef",
	// 			"userName": "Anukul Moon",
	// 			"mobileNumber": "8983644645",
	// 			"state": "Maharashtra",
	// 			"city": "Nasik",
	// 			"__v": 0,
	// 			"otp": "892994"
	// 		},
	// 		{
	// 			"_id": "63d8b4328f64cf9333531194",
	// 			"userName": "VVS Narayana",
	// 			"mobileNumber": "8447318289",
	// 			"state": "Telangana",
	// 			"city": "Hyderabad",
	// 			"__v": 0,
	// 			"otp": "551289"
	// 		},
	// 		{
	// 			"_id": "63d8bfa31b13c69df4bdad4f",
	// 			"userName": "Ravi Vikas",
	// 			"mobileNumber": "8106696618",
	// 			"state": "Telangana",
	// 			"city": "Hyderabad",
	// 			"__v": 0,
	// 			"otp": "777872"
	// 		},
	// 		{
	// 			"_id": "63d8e44a80634e4b13853ae3",
	// 			"userName": "anukul",
	// 			"mobileNumber": "9822735117",
	// 			"state": "Maharashtra",
	// 			"city": "Mumbai",
	// 			"__v": 0
	// 		}
	// 	]
	// }
};

module.exports.getUser = (req, res) => {
	const data = db.query(`SELECT * FROM seedworks.users where id= '${req.query.id }'`);
	if (data) {
		console.log(data);
		res.status(200).json({ message: "User details ", data: data[0] });
	} else {
		res.status(400).json({ message: "Error in getting User Details" });
	}
};

module.exports.editUser = (req, res) => {

	let userdata = db.query(`select * from seedworks.users where id= '${req.query.id}'`);


	let userName = req.body.userName ? req.body.userName:userdata[0].userName;
	let mobileNumber = req.body.mobileNumber ? req.body.mobileNumber:userdata[0].mobileNumber;
	let state = req.body.state ? req.body.state:userdata[0].state;
	let city = req.body.city ? req.body.city:userdata[0].city;
	let access = req.body.access ? req.body.access:userdata[0].access;

	// {
	// 	"message": "User edited",
	// 	"data": {
	// 		"_id": "63d3b3716f2d45fbcf922fef",
	// 		"userName": "Anukul Moon",
	// 		"mobileNumber": "7276813783",
	// 		"state": "Maharashtra",
	// 		"city": "Nasik",
	// 		"__v": 0,
	// 		"otp": "892994"
	// 	}
	// }
	const data = db.query(`UPDATE seedworks.users SET userName = '${userName}',mobileNumber='${mobileNumber}',state='${state}',city='${city}',access='${access}' WHERE id='${req.query.id}'`)


	if (data) {
		res.status(200).json({ message: "User edited", data: data });
	} else {
		res.status(400).json({ message: "Error in editing the User" });
	}
};

module.exports.deleteUser = (req, res) => {
const data = db.query(`delete from seedworks.users where id= '${req.query.id}'`);

	if (data) {
		res.status(200).json({ message: "User deleted", data: data });
	} else {
		res.status(400).json({ message: "Error in editing the User" });
	}
};
