var csv = require('node-csv').createParser();
var db = require('../Config/db');
const mobileusers = require("../Models/Seedworks");


module.exports.UsersCount = async (req, res) => {
let count = await mobileusers.countDocuments([]);
res.send({"count":count});
}

module.exports.ChiliCount = async (req, res) => {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    
    let results = db.query(`select sum(chili_count)  as count from chili_new where date BETWEEN '${startDate}' AND '${endDate}'`);
    res.send(results[0]);
    }

    
module.exports.SeedCount = async (req, res) => {

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    
    let results = db.query(`select sum(seed_count)  as count from seed_new where date BETWEEN '${startDate}' AND '${endDate}'`);
    res.send(results[0]);

}

module.exports.DataRepositoryCount = async (req, res) => {
    let results = db.query(`select * from data_repository`);
    res.status(200).json({count:results.length})
}