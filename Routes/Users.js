const express = require("express");
const Router = express.Router();
// const MediaUploadController = require("../Controllers/MediaUpload")
const userController =require("../Controllers/Users")

// Router.get("/ListTest", ListController)
Router.post("/createUser", userController.createUser);
Router.get("/getUsers", userController.getUsers);
Router.get("/getUser", userController.getUser);
Router.patch("/editUser", userController.editUser);
Router.delete("/deleteUser", userController.deleteUser);


module.exports = Router;