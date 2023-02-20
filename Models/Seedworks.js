const mongoose = require("mongoose");
const otpGenerator = require("otp-generator");

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		default: "",
	},
	// modules: {
	// 	type: Array,
	// 	default: [],
	// },
	// alerts: {
	// 	type: Array,
	// 	default: [],
	// },
	mobileNumber: {
		type: String,
		unique: true,
	},
	state: {
		type: String,
		default: "",
	},
	city: {
		type: String,
		default: "",
	},
	otp: {
		type: String,
	},
	token: {
		type: String,
	},
	expiresIn: {
		type: String,
	}
},  { collection: "Seedworks" }
);
module.exports = mongoose.model("Seedworks", userSchema);
