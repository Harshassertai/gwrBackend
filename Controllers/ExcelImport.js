var csv = require('node-csv').createParser();
let filepath = `${__dirname}/uploadedCSV/id_seedworks.csv`;
var db = require('../Config/db');


const fs = require('fs');

  module.exports.ImportFromExcel = (req, res) => {
   

     let file = req.files.recfile;
     let files = 0;

     file.mv(__dirname + "/uploads/" + file.name, function (err) {
			if (err) return res.status(500).send(err);

			console.log("File uploaded!");

      csv.parseFile(__dirname + "/uploads/" + file.name, function(err, data) {

        // if(data[0][0] !== 'experiment_id'){
        //    res.status(400).send('first column name must be "experiment_id"');
        // }
        // if(data[0][1] !== 'plot_id'){
        //     res.status(400).send('first column name must be "plot_id"');
        //  }
        //  if(data[0][2] !== 'hybrid'){
        //     res.status(400).send('first column name must be "hybrid"');
        //  }

        console.log(data);

         for(var i=1; i <= data.length-1;i++){
              
           let res = db.query(`select * from seedworks.id_new where experiment_id = '${data[i][0]}' and plot_id = '${data[i][1]}' and hybrid = '${data[i][2]}'`);
       
           if(!res.length >0){
            files = files +1;
            db.query(`insert into seedworks.id_new  (experiment_id,plot_id,hybrid) values ('${data[i][0]}','${data[i][1]}','${data[i][2]}')`);

           }
         }

         res.send(files+' columns were inserted!!');
         fs.unlinkSync(__dirname + "/uploads/" + file.name);
    });
		});
	}      
   



  module.exports.ImportFromExcelPlantRepository = (req, res) => {
   

    let file = req.files.recfile2;
    let files = 0;

    file.mv(__dirname + "/uploads/" + file.name, function (err) {
     if (err) return res.status(500).send(err);

     console.log("File uploaded!");

     csv.parseFile(__dirname + "/uploads/" + file.name, function(err, data) {

       // if(data[0][0] !== 'experiment_id'){
       //    res.status(400).send('first column name must be "experiment_id"');
       // }
       // if(data[0][1] !== 'plot_id'){
       //     res.status(400).send('first column name must be "plot_id"');
       //  }
       //  if(data[0][2] !== 'hybrid'){
       //     res.status(400).send('first column name must be "hybrid"');
       //  }

       console.log(data);

        for(var i=1; i <= data.length-1;i++){
             
          let res = db.query(`select * from seedworks.plant_repository where crop = '${data[i][0]}' and disease = '${data[i][1]}' and plot_name = '${data[i][2]}' and strain = '${data[i][3]}' and grade_start = '${data[i][4]}' and grade_end = '${data[i][5]}'`);

          console.log(`select * from seedworks.plant_repository where crop = '${data[i][0]}' and disease = '${data[i][1]}' and plot_name = '${data[i][2]}' and strain = '${data[i][3]}' and grade_start = '${data[i][4]}' and grade_end = '${data[i][5]}'`);
      
          if(!res.length >0){
           files = files +1;
           db.query(`insert into seedworks.plant_repository  (crop,disease,plot_name,strain,grade_start,grade_end) values ('${data[i][0]}','${data[i][1]}','${data[i][2]}','${data[i][3]}','${data[i][4]}','${data[i][5]}')`);

          }
        }

        res.send(files+' columns were inserted!!');
        fs.unlinkSync(__dirname + "/uploads/" + file.name);
   });
   });
 }      
  
  
