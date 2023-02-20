var db = require('../Config/db');
var s3 = require('../Config/s3');
var fetch = require('node-fetch');
var axios = require('axios');
var FormData = require('form-data');
const fs = require('fs');


module.exports.chili_image_predict = async (req, res) => {


    let image = req.body.image;
    let experiment_id = req.body.experiment_id;
    let plot_id= req.body.plot_id;
    let hybrid_name= req.body.hybrid_name;

var data = JSON.stringify({
  "experiment_id": experiment_id,
  "plot_id": plot_id,
  "hybrid_name": hybrid_name,
  "base64str":image
});

var config = {
  method: 'post',
  url: 'https://seedworks.app-assertai.com:8000/predict_chili',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
 res.send({
            image:response.data.image_chili,
			experiment_id:response.data.experiment_id,
			plot_id:response.data.plotno,
			hybrid_name:response.data.hybrid,
			count:response.data.chili_count,
			length:response.data.average_length,
			girth:response.data.average_girth,
    })


})
.catch(function (error) {
  console.log(error);
});

      
   


}


module.exports.chili_video_predict= async (req, res) => {


    let file =   req.files.video;
    let experiment_id = req.query.experiment_id;
    let plot_id= req.query.plot_id;
    let hybrid_name= req.query.hybrid_name;

    // console.log(video);
    // return;

    file.mv(__dirname + "/uploads/" + file.name, function (err) {
        if (err) return res.status(500).send(err);

        console.log("File uploaded!");

    var data = new FormData();
    data.append('files',fs.createReadStream(__dirname + "/uploads/" + file.name));
    
    var config = {
      method: 'post',
      url: 'https://seedworks.app-assertai.com:8000/predict_chili_video?experiment_id='+experiment_id+'&plot_id='+plot_id+'&hybrid_name='+hybrid_name+'',
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {


        res.send({
            image:response.data.image_chili,
			experiment_id:response.data.id,
			plot_id:response.data.plotno,
			hybrid_name:response.data.hybrid,
			count:response.data.chili_count,
			length:response.data.average_length,
			girth:response.data.average_girth,
    })

    fs.unlinkSync(__dirname + "/uploads/" + file.name);


    })
    .catch(function (error) {
      console.log(error);
    });


});
  



}



module.exports.seed_image_predict= async (req, res) => {


    let image = req.body.image;
    let experiment_id = req.body.experiment_id;
    let plot_id= req.body.plot_id;
    let hybrid_name= req.body.hybrid_name;

var data = JSON.stringify({
  "experiment_id": experiment_id,
  "plot_id": plot_id,
  "hybrid_name": hybrid_name,
  "base64str": image
});

var config = {
  method: 'post',
  url: 'https://seedworks.app-assertai.com:8000/predict_seed',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {

    res.send({
        image:response.data.image_seed,
        experiment_id:response.id,
        plot_id:response.data.plotno,
        hybrid_name:response.data.hybrid,
        seed_count:response.data.seed_count,
    
})})
.catch(function (error) {
  console.log(error);
});



}


module.exports.seed_video_predict= async (req, res) => {


    let file =   req.files.video;
    let experiment_id = req.query.experiment_id;
    let plot_id= req.query.plot_id;
    let hybrid_name= req.query.hybrid_name;

    file.mv(__dirname + "/uploads/" + file.name, function (err) {
        if (err) return res.status(500).send(err);

        console.log("File uploaded!");
    
    var data = new FormData();
data.append('files', fs.createReadStream(__dirname + "/uploads/" + file.name));

var config = {
  method: 'post',
  url: 'https://seedworks.app-assertai.com:8000/predict_seed_video?experiment_id='+experiment_id+'&plot_id='+plot_id+'&hybrid_name='+hybrid_name+'',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
   
    res.send({
        image:response.data.image_seed,
        experiment_id:response.data.id,
        plot_id:response.data.plotno,
        hybrid_name:response.data.hybrid,
        seed_count:response.data.seed_count,
    
})

fs.unlinkSync(__dirname + "/uploads/" + file.name);


})
.catch(function (error) {
  console.log(error);
});


    });


  



}