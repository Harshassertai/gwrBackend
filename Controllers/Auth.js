const axios = require("axios");
const mobileusers = require("../Models/Seedworks");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "otp-secret-key";
var db = require('../Config/db');
const accountSid = "AC73c6b8922eddd09e03f901a8477a7361";
const authToken = "c2e239ca71dde2dde5351dc2e65b7f0a";
const jwt = require("jsonwebtoken");

module.exports.AuthTest = (req, res) => {
	res.send("Auth is working fine");
};

//function to generate OTP
function generateOTP(otp_length) {
	let otp = otpGenerator.generate(otp_length, {
		upperCaseAlphabets: false,
		alphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});
	return otp;
}

//function to Create OTP
function createOTP(mobileNumber) {
	let otp = generateOTP(6);

	//time in milliseconds
	const ttl = 5 * 60 * 1000;
	const expires = Date.now() + ttl;
	//format for hash
	const data = `${mobileNumber}.${otp}.${expires}`;
	//Creating hash
	const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
	//hash with time restriction
	const fullHash = `${hash}.${expires}`;
	console.log(`Your OTP is : ${otp}`);
	return [fullHash, otp];
}

//function to Verify OTP
function verifyOTP(mobileNumber, otp, hash, token) {
	//seperating Hash Value from expiry
	let [hashValue, expires] = hash.split(".");
	let now = Date.now();

	if (now > parseInt(expires)) return "OTP Expired";

	let data = mobileNumber + "." + otp + "." + expires;

	let newCalculateHash = crypto
		.createHmac("sha256", key)
		.update(data)
		.digest("hex");

	//checking hash value from mobile with server
	if (newCalculateHash == hashValue) {
		return "Success";
	}
	return "Invalid OTP";
}

module.exports.SendOtp = async (req, res) => {
	if (Object.entries(req.body).length === 0 && req.body.constructor === Object) {
		// If no body is provider send error mess
		res.status(400).json({ message: "Please provide a body" });
	} else {
		let mobileNumber = req.body.mobileNumber;

		let hashandotp = createOTP(mobileNumber);
		const Otp = hashandotp[1]


		 
		const existingUser = db.query(`select * from seedworks.users where mobileNumber ='${mobileNumber}'`);


		// await axios.post(`http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=usagriseeds&passwd=$eed7890&mobilenumber=91${mobileNumber}&message=YOUR OTP IS ${Otp} DO NOT DISCLOSE THIS OTP TO ANY ONE. THIS IS ONLY FOR CUSTOMER. - Seedworks&sid=USAgri&mtype=N&DR=Y`)

		//Existing Logic before restriction
		// if (!existingUser) {

		// 		await mobileusers.create({
		// 			mobileNumber,
		// 			otp: hashandotp[1],
		// 			userName: "",
		// 			state: "",
		// 			city: "",
		// 		});

		// } else {
		// 	await mobileusers.findOneAndUpdate(
		// 		{ mobileNumber: mobileNumber },
		// 		{ otp: hashandotp[1] },
		// 		{},
		// 	);
		// }

		// {
		// 	"otp hash": "ad90affe48dc8cf70c4094344d2c42502b677319aea9f84c85fc85b0eda07953.1675161836916",
		// 	"otp": "047227"
		// }

		//Logic After Restriction
		if (existingUser.length > 0) {
	  await axios.post(`http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=usagriseeds&passwd=$eed7890&mobilenumber=91${mobileNumber}&message=YOUR OTP IS ${Otp} DO NOT DISCLOSE THIS OTP TO ANY ONE. THIS IS ONLY FOR CUSTOMER. - Seedworks&sid=USAgri&mtype=N&DR=Y`)

			// await mobileusers.findOneAndUpdate(
			// 	{ mobileNumber: mobileNumber },
			// 	{ otp: hashandotp[1] },
			// 	{},
			// );

			db.query(`update seedworks.users set otp = '${hashandotp[1]}' where mobileNumber= ${mobileNumber}`);


        res.status(200).json({ "otp hash": hashandotp[0], "otp": hashandotp[1] })
		}
		else {
			res.status(401).json({message:'You Are Not Authorized'})
		}

			res.status(200).json({ "otp hash": hashandotp[0], otp: hashandotp[1] });
		} 
		await mobileusers.findOneAndUpdate(
			{ mobileNumber: mobileNumber },
			{ otp: hashandotp[1] },
			{}
		);
	}


module.exports.VerifyOtp =  (req, res) => {
  const { mobileNumber, otp, hash } = req.body;

	try {
		let user = db.query(`select * from seedworks.users where mobileNumber = '${req.body.mobileNumber}'`);

		if (user.length > 0) {
			if (user[0].otp === otp) {
				// res.status(200).json({ data: user });
				let verifyOTPResponse = verifyOTP(mobileNumber, otp, hash);
				if (verifyOTPResponse === "Success") {

					// await mobileusers.findOneAndUpdate(
					// 	{ mobileNumber: mobileNumber },
					// 	{ new: true },
					// );    

				}

				let fccToken;
				try {
					fccToken = jwt.sign(
						{
							mobileNumber: mobileNumber,
						},
						"B4A372D57ED959FBD52BCCB19E9CB"
					);
				} catch (error) {
					res.status(500).json(error);
				}

				return res.status(200).json({"status":verifyOTP(mobileNumber, otp, hash),"jwttoken":fccToken,"user_id":user[0].id,"access":user[0].access});
			} else {
				return res.status(200).json("Invalid");
			}
		} else {
			return res.status(200).send("No record in database");
		}
	} catch (err) {
		res.status(500).json(err);
	}

	// res.status(200).json({"message":"Success"})
};
