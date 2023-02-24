const express = require("express");
const Router = express.Router();
const AuthController=require("../Controllers/Auth")

Router.get("/AuthTest", AuthController.AuthTest)
Router.get("/login",AuthController.login)
Router.post("/SendOtp",AuthController.SendOtp)
Router.post("/VerifyOtp",AuthController.VerifyOtp)


module.exports = Router;