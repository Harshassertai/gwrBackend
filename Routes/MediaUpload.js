const express = require("express");
const Router = express.Router();
// const MediaUploadController = require("../Controllers/MediaUpload")
const {predict,SaveData,ImageUpload,VideoUpload,PlantRepositoryImageUpload,SaveDataSeed}=require("../Controllers/MediaUpload")

// Router.get("/ListTest", ListController)
Router.post("/ImageUpload",ImageUpload)
Router.post("/PlantRepositoryImageUpload", PlantRepositoryImageUpload)
Router.post("/VideoUpload", VideoUpload)
Router.post("/saveData",SaveData)
Router.post("/saveDataSeed",SaveDataSeed)
Router.post ("/predict",predict)



module.exports = Router;