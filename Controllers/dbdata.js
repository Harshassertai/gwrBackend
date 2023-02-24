const moment = require('moment/moment');
var db = require('../Config/db');

module.exports.getFootfall = (req, res) => {
  const { startDate, endDate } = req.query;
  console.log(startDate)
  const queryUrl = `select * from GWR.Footfall where date between '${startDate}' and '${endDate}' order by date desc;`;
  console.log(queryUrl)
  const data = db.query(queryUrl);
  let dataList = data.map((item) => {
    if (item.date) {
      
      let newdate = new Date(item.date);
      let x = newdate.setHours(newdate.getHours() + 5);
      console.log(x.toDateString())

    }
  })
  console.log('DATA LIST --> ',dataList)
  if (data.length > 0) {
    res.status(200).json({message:'footfall list',data:data})
  } else {
    res.status(404).json({message:'No Records'})
  }
}
module.exports.getAlertDesk = (req, res) => {
  const data = db.query('select * from GWR.gwr_alerts_desk');
  if (data.length > 0) {
    res.status(200).json({message:'Alerts_desk list',data:data})
  } else {
    res.status(404).json({message:'No Records'})
  }
}
module.exports.getBucketPool = (req, res) => {
  const data = db.query('select * from GWR.gwr_bucket_pool');
  if (data.length > 0) {
    res.status(200).json({message:'Bucket_pool List',data:data})
  } else {
    res.status(404).json({message:'No Records'})
  }
}
module.exports.regStats = (req, res) => {
  const data = db.query('select * from GWR.gwr_reg_stats');
  if (data.length > 0) {
    res.status(200).json({message:'Reg_stats List',data:data})
  } else {
    res.status(404).json({message:'No Records'})
  }
}

// module.exports.getFootfall = (req, res) => {
//   const data = db.query('select * from GWR.gwr_reg_stats');
//   if (data.length > 0) {
//     res.status(200).json({message:'Reg_stats List',data:data[0]})
//   } else {
//     res.status(404).json({message:'No Records'})
//   }
// }