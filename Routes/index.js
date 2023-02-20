const express = require("express");
const Router = express.Router();

const AuthRoutes = require("../Routes/Auth")
const ListRoutes = require("../Routes/List")
const MediaRoutes=require("./MediaUpload")
const ExcelImport = require("./ExcelImport");
const CountRoutes = require("./Count");
const UsersRoutes = require("./Users");
const PredictRoutes = require("./Predict");



Router.use("/Auth", AuthRoutes)
Router.use("/List", ListRoutes)
Router.use("/upload",MediaRoutes)
Router.use("/import",ExcelImport)
Router.use("/count",CountRoutes)
Router.use("/users",UsersRoutes)
Router.use("/predict",PredictRoutes)



module.exports = Router;