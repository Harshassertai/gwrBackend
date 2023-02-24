const express = require("express");
const Router = express.Router();
const dbDataController=require("../Controllers/dbdata")

Router.get("/footfall", dbDataController.getFootfall)
Router.get("/alertdesk",dbDataController.getAlertDesk)
Router.get("/bucketpool",dbDataController.getBucketPool)
Router.get("/regstats",dbDataController.regStats)


module.exports = Router;