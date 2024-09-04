const { Router } = require("express");
const router = Router();
const dashboradController = require("../controller/dashboard.controller");

 
router.get("/", dashboradController.getOverviews); 

module.exports = router;
