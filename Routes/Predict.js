const express = require("express");
const Router = express.Router();
const PredictController=require("../Controllers/Predict")

Router.post("/chili_image_predict", PredictController.chili_image_predict)

Router.post("/chili_video_predict", PredictController.chili_video_predict)

Router.post("/seed_image_predict", PredictController.seed_image_predict)

Router.post("/seed_video_predict", PredictController.seed_video_predict)


module.exports = Router;