const express = require("express");
const Router = express.Router();
const ExcelImportController=require("../Controllers/ExcelImport")
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })  
 // var uploads = multer({ storage: storage });


Router.post("/importdatafromexcel", upload.single('recfile'), ExcelImportController.ImportFromExcel)
Router.post("/importdatafromexcelplantrepository", upload.single('recfile'), ExcelImportController.ImportFromExcelPlantRepository)


module.exports = Router;