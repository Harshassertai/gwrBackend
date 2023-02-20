const express = require("express");
const morgan = require('morgan')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require('fs');
var s3 = require('./Config/s3');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mainRoutes = require("./Routes/index");
require("dotenv").config();
const port = process.env.PORT;
app.use("*", cors());
// app.use(cors());
app.set("host", "*.*.*.*");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(cookieParser());
var fileupload = require("express-fileupload");
app.use(fileupload());

mongoose
	.connect(
		"mongodb+srv://hb:0709@cluster0.mkorr.mongodb.net/user_login?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		//	useCreateIndex: true,
		},
	)
	.then(() => console.log("DB connection established"))
	.catch((err) => {
		console.log(err);
	});
// const dbconfig = require("./Config/db");
app.use(morgan(':method :url :status :res[content-length] - :response-time ms [:date[clf]]'))

app.use(function (req, res, next) {
	if (
		req.method === "POST" ||
		req.method === "GET" ||
		req.method === "PUT" ||
		req.method === "DELETE" ||
		req.method === "PATCH"
	)
		next();
	else res.send(false);
});

app.use(mainRoutes);

app.get('/test', function (req, res) {
  res.send('server Working fine')
})


app.post('/uploadimagetos3',function(req,res){
	
	let file = req.files.myfile;

	let mag1 = file.data[0];
	let mag2 = file.data[1];
	let magtot = "" + mag1 + mag2;

	if (
		magtot === "255216" ||
		magtot === "3780" ||
		magtot === "13780" ||
		magtot === "12310"
	) {
		// if(file.mimetype === 'image/jpeg' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/pdf' || file.mimetype === 'image/png'){
		// if(file.name.split('.')[1] === 'pdf' || file.name.split('.')[1] === 'docx' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'jpeg'){
		// let warehouse_id = req.body.warehouse_id;
		file.mv(__dirname + "/uploads/" + file.name, function (err) {
			if (err) return res.status(500).send(err);

			console.log("File uploaded!");

			fs.readFile(__dirname + "/uploads/" + file.name, (err, data) => {
				if (err) throw err;
				const params = {
					Bucket: "bucket-big-basket", // pass your bucket name
					Key: file.name, // file will be saved as testBucket/contacts.csv
					Body: data,
				};
				s3.upload(params, function (s3Err, data) {
					if (s3Err) throw s3Err;

						res.send({ success: true, url: data.Location });

				});
				fs.unlinkSync(__dirname + "/uploads/" + file.name);
			});
		});
	} else {
		res.send("invalid file type");
	}
})

app.listen(port, (err) => {
	if (err) {
		console.log("There is error in running the server!!");
	}
	console.log(`Server is running at port :- ${port}`);
});
