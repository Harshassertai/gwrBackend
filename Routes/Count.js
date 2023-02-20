const express = require("express");
const Router = express.Router();
const CountController=require("../Controllers/Count")

Router.get("/userscount", CountController.UsersCount)
Router.get("/seedcount", CountController.SeedCount)
Router.get("/chilicount", CountController.ChiliCount)
Router.get("/DataRepositorycount",CountController.DataRepositoryCount)


module.exports = Router;