const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	// region: 'ap-south-1',
	accessKeyId: "AKIAVUIZU62PZRBFNQTA",
	secretAccessKey: "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",
});


module.exports = s3;