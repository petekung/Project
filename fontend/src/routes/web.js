const express = require('../../../backend/express');
const router = express.Router();
const homeController = require('../controllers/hom')
const uploadController = require('../controllers/upload')
const upload = require("../middlewere/upload")

let routes = (app)=>{

    router.get("/",homeController.getHome)
    router.post("/upload",upload.single('file'),uploadController.uploadFile)
    return app.use("/Repassmail",router);

}
module.exports = router;