const express = require("express");
const Router = express.Router();
// const ListController = require("../Controllers/List")
const {LAGList,ChilliList,SeedCountList,ExperimentIdList,PlotIdList,HybridNameList,previousData,IdList,PlantRepositoryList,DataRepositoryList,CityList,StateList,PlantRepositoryDataByCrop,PlantRepositoryUserSpecific,PlantRepositoryDataByCrop2,PlantRepositoryById,getPlantRepositoryById,deleteRepo}= require("../Controllers/List")
// Router.get("/ListTest", ListController)
Router.get("/LAGList", LAGList)
Router.get("/ChilliList", ChilliList)
Router.get("/SeedCountList", SeedCountList)
Router.get("/ExperimentIdList",ExperimentIdList)
Router.get("/PlotIdList",PlotIdList)
Router.get("/HybridNameList", HybridNameList)
Router.get("/IdList", IdList)
Router.get('/PlantRepositoryList',PlantRepositoryList)
Router.get('/DataRepositoryList',DataRepositoryList)
Router.get("/CityList",CityList)
Router.get("/StateList",StateList)
Router.get("/previousData",previousData)
Router.get("/PlantRepositoryDataByCrop", PlantRepositoryDataByCrop)
Router.get("/PlantRepositoryUserSpecific/:user",PlantRepositoryUserSpecific)
Router.get("/PlantRepositoryDataByCrop2", PlantRepositoryDataByCrop2)
Router.patch("/editRepository", PlantRepositoryById)
Router.get("/getRepository", getPlantRepositoryById)
Router.delete("/deleteRepo",deleteRepo)





module.exports = Router;