var MySql = require('sync-mysql');

var connection = new MySql({
	host: 'db-seedworks-production.cubaxiuycgsa.ap-south-1.rds.amazonaws.com',
	user: 'admin',
	password: 'seedworks123',
    database: "seedworks",
  });


  module.exports = connection;