const fs = require('fs');
var db = require('../Config/db');
var s3 = require('../Config/s3');

const imageToBase64 = require('image-to-base64');
var base64ToImage = require('base64-to-image');
module.exports.ImageUpload = (req, res) => {


  let file = req.files.myfile;
	let grade = req.query.grade;
	let crop = req.query.crop;
	let disease = req.body.disease;
	let plot_name = req.body.plot_name;
	let strain = req.body.strain;
	let plant_number = req.body.plant_number;

	let comments = req.body.comments;

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
					sql = `insert into seedworks.data_repository (grade,crop,disease,plot_name,strain,plant_number,image,comments) values ('${grade}','${crop}','${disease}','${plot_name}','${strain}','${plant_number}','${data.Location}','${comments}')`;
					let result = db.query(sql);

						res.send({ success: true, url: data.Location });

				});
				fs.unlinkSync(__dirname + "/uploads/" + file.name);
			});
		});
	} else {
		res.send("invalid file type");
	}
}

module.exports.VideoUpload = (req, res) => {
  res.status(200).json({"message":"Video Uploaded Successfully"})
}

module.exports.SaveData = (req, res) => {
  let date = req.query.date;
  let time = req.query.time;
  let experiment_id = req.query.experiment_id;
  let plot_id =   req.query.plot_id;
  let hybrid =   req.query.hybrid;
  //let image =   req.files.image;
  let length = req.query.length;
  let girth = req.query.girth;
  let count = req.query.count;
  let base64image = req.body.image;
  let user_id = req.body.user_id;

  var imageinfo = base64ToImage(base64image,__dirname + "/uploads/",{'fileName': new Date().valueOf(), 'type':'png'});

		// if(file.mimetype === 'image/jpeg' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/pdf' || file.mimetype === 'image/png'){
		// if(file.name.split('.')[1] === 'pdf' || file.name.split('.')[1] === 'docx' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'jpeg'){
		// let warehouse_id = req.body.warehouse_id;
	if(imageinfo){
			fs.readFile(__dirname + "/uploads/"+imageinfo.fileName , (err, data) => {
				if (err) throw err;
				const params = {
					Bucket: "bucket-big-basket", // pass your bucket name
					Key: imageinfo.fileName, // file will be saved as testBucket/contacts.csv
					Body: data,
				};

				s3.upload(params, function (s3Err, data) {
					if (s3Err) throw s3Err;

   // console.log('s3 uploaded');
					 sql = `insert into seedworks.chili_new (date,time,experiment_id,plot_id,hybrid,length,girth,chili_count,image,user_id) values ('${date}','${time}','${experiment_id}','${plot_id}','${hybrid}','${length}','${girth}','${count}','${data.Location}','${user_id}')`;
					let result = db.query(sql);

						res.send({ success: true, url: data.Location });

				});
				fs.unlinkSync(__dirname + "/uploads/" + imageinfo.fileName);
			});
		}

}


module.exports.SaveDataSeed = (req, res) => {


	let date = req.query.date;
	let time = req.query.time;
	let experiment_id = req.query.experiment_id;
	let plot_id =   req.query.plot_id;
	let hybrid =   req.query.hybrid;
	//let image =   req.files.image;
	let seed_count = req.query.seed_count;
	let base64image = req.body.image;
	let user_id = req.body.user_id;
  
	var imageinfo = base64ToImage(base64image,__dirname + "/uploads/",{'fileName': new Date().valueOf(), 'type':'png'});

  
		  // if(file.mimetype === 'image/jpeg' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/pdf' || file.mimetype === 'image/png'){
		  // if(file.name.split('.')[1] === 'pdf' || file.name.split('.')[1] === 'docx' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'jpeg'){
		  // let warehouse_id = req.body.warehouse_id;
	  if(imageinfo){
			  fs.readFile(__dirname + "/uploads/"+imageinfo.fileName , (err, data) => {
				  if (err) throw err;
				  const params = {
					  Bucket: "bucket-big-basket", // pass your bucket name
					  Key: imageinfo.fileName, // file will be saved as testBucket/contacts.csv
					  Body: data,
				  };
  
				  s3.upload(params, function (s3Err, data) {
					  if (s3Err) throw s3Err;
  
	 // console.log('s3 uploaded');
					   sql = `insert into seedworks.seed_new (date,time,experiment_id,plot_id,hybrid,seed_count,image,user_id) values ('${date}','${time}','${experiment_id}','${plot_id}','${hybrid}','${seed_count}','${data.Location}','${user_id}')`;
					  let result = db.query(sql);
  
						  res.send({ success: true, url: data.Location });
  
				  });
				  fs.unlinkSync(__dirname + "/uploads/" + imageinfo.fileName);
			  });
  
			}
  
  }


module.exports.PlantRepositoryImageUpload = (req, res) => {
 
  let experiment_id = req.query.experiment_id;
  let plot_id =   req.query.plot_id;
  let hybrid =   req.query.hybrid;
  let image =   req.files.image;
  let yourDate = new Date()
  let datetext = yourDate.toTimeString();
  let image2 = '';
let result = {};
  image.mv(__dirname + "/uploads/" + image.name, function (err) {
    if (err) return res.status(500).send(err);

  

datetext = datetext.split(' ')[0];
  
imageToBase64(__dirname + "/uploads/" + image.name) // Path to the image
    .then(
        (response) => {
          result = {
            date:yourDate.toISOString().split('T')[0],
            time:datetext,
            experiment_id:experiment_id,
            plot_id:plot_id,
            hybrid:hybrid,
            image:response,
            length:'12',
            girth:'12',
            count:'0'
           }

           res.status(200).json({"message":"your data","data":result})

            // "cGF0aC90by9maWxlLmpwZw=="
        }
    )
    
      
    

     .catch(
      (error) => {
          console.log(error); // Logs an error if there was one
      }
  )

    });


}





module.exports.predict = (req, res) => {
  const { imageUrl, mobileNumber, date, time } = req.body
  let imageBase64 = Buffer.from(imageUrl).toString('base64')
  res.status(200).json({ "message": "Predict Click", data: { "imageBase64":imageBase64, "mobileNumber":mobileNumber, "Date":date, "Time":time }})
}