var db = require('../Config/db');

const list = [
  {
    "Date": "2022-12-15T00:00:00Z",
    "Time": "11:52:11",
    "ExperimentId": "123456",
    "PlotId": "789012",
    "chilliCount": 10,
    "TotalSeeds": 10,
    "AverageSeeds":10
  },
  {
    "Date": "2022-12-16T00:00:00Z",
    "Time": "11:52:11",
    "ExperimentId": "789012",
    "PlotId": "345678",
    "chilliCount": 11,
    "TotalSeeds": 11,
    "AverageSeeds":11
  },
  {
    "Date": "2022-12-17T00:00:00Z",
    "Time": "11:52:11",
    "ExperimentId": "345678",
    "PlotId": "901234",
    "chilliCount": 12,
    "TotalSeeds": 12,
    "AverageSeeds":12
  }
]

module.exports.LAGList = (req, res) => {
  res.status(200).json({ "message": "List Of Length And Girths",data: list})
}

module.exports.ChilliList = (req, res) => {
 let startDate = req.query.start_date;
 let endDate = req.query.end_date;
 let experiment_id = req.query.experiment_id;
 let city = req.query.city;
 let state = req.query.state;
 let result = [];

 if(experiment_id){
   result = db.query(`select chili_new.id, date, time, experiment_id, plot_id, hybrid,length,girth, chili_count, image,userName,mobileNumber,city,state 
   from chili_new join users on chili_new.user_id = users.id 
   where date BETWEEN '${startDate}' AND '${endDate}' and experiment_id = '${experiment_id}' 
   order by date desc, time desc;`);
 }else{

  result = db.query(`select chili_new.id, date, time, experiment_id, plot_id, hybrid,length,girth, chili_count, image,userName,mobileNumber,city,state
  from chili_new join users on chili_new.user_id = users.id 
  where date BETWEEN '${startDate}' AND '${endDate}'
  order by date desc, time desc;`);

 }

  res.status(200).json({ "message": "Chilli List",data: result})
}

module.exports.SeedCountList = (req, res) => {
  let startDate = req.query.start_date;
 let endDate = req.query.end_date;
 let experiment_id = req.query.experiment_id;
 let result = [];

 if(experiment_id){
  result = db.query(`select seed_new.id, date, time, experiment_id, plot_id, hybrid,seed_count, image,userName,mobileNumber,city,state
  from seed_new join users on seed_new.user_id = users.id 
  where date BETWEEN '${startDate}' AND '${endDate}' and experiment_id = '${experiment_id}'
  order by date desc, time desc;`);
}else{

 result = db.query(`select seed_new.id, date, time, experiment_id, plot_id, hybrid,seed_count, image,userName,mobileNumber,city,state
 from seed_new join users on seed_new.user_id = users.id 
 where date BETWEEN '${startDate}' AND '${endDate}'
 order by date desc, time desc;`);

}


  res.status(200).json({ "message": "List Of Seed Counts",data: result})
}


const ExperimentIds = [
  {
    "ExperimentId": "12345",
    "plotIds": [
      12345,67890
    ]
    
  },
  {
    "ExperimentId": "00000",
     "plotIds": [
      88812,12888
    ]
  },
  // {
  //   "ExperimentId": "12345",
  // },
  // {
  //   "ExperimentId":"67890"
  // },
]

const PlotIds = [
  {
    "PlotId":"12345"
  },
  {
    "PlotId":"67890"
  },
  {
    "PlotId":"88812"
  },
  {
    "PlotId":"12888"
  },
]

const HybridNameList = [
  {
    "ExperimentId": "12345",
    "PlotId":"12345",
    "name":["Hybrid_1","Hybrid_2"]
  },
  {
    "ExperimentId": "88812",
    "PlotId":"88812",
    "name":["Hybrid_2","Hybrid_3"]
  },
  {
    "name":"Hybrid_3"
  },
  {
    "name":"Hybrid_4"
  },
]

module.exports.ExperimentIdList = (req, res) => {

 let result =  db.query('select distinct(experiment_id) from id_new order by id desc;')
  res.status(200).json({ "message": "List Of Experiment Ids",data: result})
}

module.exports.PlotIdList = (req, res) => {
  const { experimentId } = req.query
  let experimentIdList = ExperimentIds

  let results = db.query(`select distinct(plot_id)
  from id_new
  where experiment_id = '${experimentId}'
  order by id desc;`);

    res.status(200).json({ "message": "List Of Plot Ids",data: results})
  
 
}

module.exports.HybridNameList = (req, res) => {
  const { experimentId, PlotId } = req.query

  let results = db.query(`select distinct(hybrid) from id_new where experiment_id = '${experimentId}' and plot_id = '${PlotId}' order by id desc;`);
    res.status(200).json({ "message": "List Of Hybrid Names",data: results})
 
}

const previousDataList = [
  {
    "Date": "2022-12-15T00:00:00Z",
    "Time": "11:52:11",
    "ExperimentId": "123456",
    "PlotId": "789012",
    "chilliCount": 10,
    "TotalSeeds": 10,
    "AverageSeeds": 10,
    "image":"sample.jpeg"
  },
   {
    "Date": "2022-12-16T00:00:00Z",
    "Time": "11:52:11",
    "ExperimentId": "123456",
    "PlotId": "789012",
    "chilliCount": 10,
    "TotalSeeds": 10,
    "AverageSeeds": 10,
    "image":"sample.jpeg"
  },
  {
    "Date": "2022-12-17T00:00:00Z",
    "Time": "11:52:11",
    "ExperimentId": "123456",
    "PlotId": "789012",
    "chilliCount": 10,
    "TotalSeeds": 10,
    "AverageSeeds": 10,
    "image":"sample.jpeg"
  }
]

module.exports.previousData = (req, res) => {
  const { experimentId, PlotId,hybrid } = req.query
let results = '';
  // if(type){
  //   if(type == 'chili'){

  //    results = db.query(`select *
  //     from chili_new
  //     where experiment_id = '${experimentId}' and plot_id= '${PlotId}' and hybrid = '${hybrid}'
  //     order by id desc;`);
  //   }
    
  //   if(type == 'seed'){
  //    results = db.query(`select *
  //     from seed_new
  //     where experiment_id = '${experimentId}' and plot_id= '${PlotId}' and hybrid = '${hybrid}'
  //     order by id desc;`);
  
  //   }
  // }else{
  //   results2 = db.query(`select *
  //   from seed_new
  //   where experiment_id = '${experimentId}' and plot_id= '${PlotId}' and hybrid = '${hybrid}'
  //   order by id desc;`);

  //   results = db.query(`select *
  //     from chili_new
  //     where experiment_id = '${experimentId}' and plot_id= '${PlotId}' and hybrid = '${hybrid}'
  //     order by id desc;`);

  //     results = [...results,...results2]

  //   }
    if(experimentId && !PlotId && !hybrid){
      results = db.query(`select chili_new.date, chili_new.time, chili_new.experiment_id, 
      chili_new.plot_id, chili_new.hybrid, length, girth, chili_count, seed_count,
      chili_new.image as chili_image, seed_new.image as seed_image
      from chili_new left join seed_new 
      on chili_new.experiment_id = seed_new.experiment_id 
      and chili_new.plot_id = seed_new.plot_id 
      and chili_new.hybrid = seed_new.hybrid
      where chili_new.experiment_id = '${experimentId}'
      order by chili_new.date desc, chili_new.time desc`);
     }else if(experimentId && PlotId && !hybrid){
      results = db.query(`select chili_new.date, chili_new.time, chili_new.experiment_id, 
      chili_new.plot_id, chili_new.hybrid, length, girth, chili_count, seed_count,
      chili_new.image as chili_image, seed_new.image as seed_image
      from chili_new left join seed_new 
      on chili_new.experiment_id = seed_new.experiment_id 
      and chili_new.plot_id = seed_new.plot_id 
      and chili_new.hybrid = seed_new.hybrid
      where chili_new.experiment_id = '${experimentId}' and chili_new.plot_id = '${PlotId}'
      order by chili_new.date desc, chili_new.time desc`);
     }else if(experimentId && PlotId && hybrid){
      results = db.query(`select chili_new.date, chili_new.time, chili_new.experiment_id, 
      chili_new.plot_id, chili_new.hybrid, length, girth, chili_count, seed_count,
      chili_new.image as chili_image, seed_new.image as seed_image
      from chili_new left join seed_new 
      on chili_new.experiment_id = seed_new.experiment_id 
      and chili_new.plot_id = seed_new.plot_id 
      and chili_new.hybrid = seed_new.hybrid
      where chili_new.experiment_id = '${experimentId}' and chili_new.plot_id = '${PlotId}' and chili_new.hybrid = '${hybrid}'
      order by chili_new.date desc, chili_new.time desc`);
     }
 
  


  



  res.status(200).json({ "message": "Previous Data",data: results})
}



module.exports.IdList = (req, res) => {


  results = db.query(`select * from id_new`);
  res.status(200).json({ "message": "Id List",data: results})


}


module.exports.CityList = (req, res) => {


  let results = db.query(`select DISTINCT(city) from users`);
  let result2 = [];

  results.map((item,index) => {
    result2[index] = {"label":item.city,"value":item.city};
  });
  res.status(200).json({ "message": "City List",data: result2})


}


module.exports.StateList = (req, res) => {


  let results = db.query(`select DISTINCT(state) from users`);
  let result2 = [];

  results.map((item,index) => {
    result2[index] = {"label":item.state,"value":item.state};
  });
  res.status(200).json({ "message": "State List",data: result2})


}


module.exports.PlantRepositoryList = (req, res) => {


  results = db.query(`select * from plant_repository`);
  res.status(200).json({ "message": "Plant Repository List",data: results})


}


module.exports.DataRepositoryList = (req, res) => {


  results = db.query(`select * from data_repository`);
  res.status(200).json({ "message": "Data Repository List",data: results})


}



module.exports.PlantRepositoryDataByCrop = (req, res) => {

let crop = req.query.crop;
  results = db.query(`select * from plant_repository where crop = '${crop}'`);
  res.status(200).json({ "message": "Plant Repository data",data: results})


}

module.exports.PlantRepositoryUserSpecific = (req, res) => {
  const {user}=req.params
  let data = db.query(`select * from data_repository where user_id=${user}`)
  if (data) {
    res.status(200).json({ "message": "Plant Repository data",data: data})
  } else {
    res.status(404).json({ "message": "Data Not Found"})
  }
}

module.exports.PlantRepositoryById = (req, res) => {
  let repodata = db.query(`select * from seedworks.plant_repository where id= '${req.query.id}'`);

	let crop = req.body.crop ? req.body.crop:repodata[0].crop;
	let disease = req.body.disease ? req.body.disease:repodata[0].disease;
	let plot_name = req.body.plotName ? req.body.plotName:repodata[0].plot_name;
	let strain = req.body.strain ? req.body.strain:repodata[0].strain;
  let grade_start = req.body.gradeStart ? req.body.gradeStart : repodata[0].grade_start;
  let grade_end = req.body.gradeEnd ? req.body.gradeEnd : repodata[0].grade_end;
  
	const data = db.query(`UPDATE seedworks.plant_repository SET crop = '${crop}',disease='${disease}',plot_name='${plot_name}',strain='${strain}',grade_start='${grade_start}',grade_end='${grade_end}' WHERE id='${req.query.id}'`)

	if (data) {
		res.status(200).json({ message: "Repo edited", data: data });
	} else {
		res.status(400).json({ message: "Error in editing the Repo" });
	}
}

module.exports.getPlantRepositoryById = (req, res) => {
  const data = db.query(`SELECT * FROM seedworks.plant_repository where id= '${req.query.id }'`);
	if (data) {
		res.status(200).json({ message: "Repo details ", data: data[0] });
	} else {
		res.status(400).json({ message: "Error in getting Repo Details" });
	}
}

module.exports.deleteRepo = (req, res) => {
const data = db.query(`delete from seedworks.plant_repository where id= '${req.query.id}'`);

	if (data) {
		res.status(200).json({ message: "Plant Repo deleted", data: data });
	} else {
		res.status(400).json({ message: "Error in Deleting the Repo" });
	}
};


module.exports.PlantRepositoryDataByCrop2= (req,res) => {
  let crop = req.query.crop;

  let disease_array = [];
  let disease =  db.query(`select disease from plant_repository where crop = '${crop}'`);
  disease.map((item)=>{
    disease_array.push(item.disease);
  })
 
  let plot_name_array = [];
  let plot_name =  db.query(`select plot_name from plant_repository where crop = '${crop}'`);
  plot_name.map((item)=>{
    plot_name_array.push(item.plot_name);
  })


   
  let strain_array = [];
  let strain =  db.query(`select strain from plant_repository where crop = '${crop}'`);
  strain.map((item)=>{
    strain_array.push(item.strain);
  })


  let grade_start_array = [];
 let grade_start =  db.query(`select grade_start from plant_repository where crop = '${crop}'`);
 grade_start.map((item)=>{
  grade_start_array.push(item.grade_start);
 })

 let grade_end_array = [];
 let grade_end =  db.query(`select grade_end from plant_repository where crop = '${crop}'`);
 grade_end.map((item)=>{
  grade_end_array.push(item.grade_end);
 })


  let resultfinal = [{
    "crop":crop,
    "disease":disease_array,
    "plot_name":plot_name_array,
    "strain":strain_array,
    "grade_start":grade_start_array,
    "grade_end":grade_end_array,
  }];

res.send(resultfinal);

}



