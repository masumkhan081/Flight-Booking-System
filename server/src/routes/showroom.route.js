const { Router } = require("express");
const router = Router();
const showroomController = require("../controller/showroom.controller");
//
router.post("/", showroomController.createShowroom);
router.get("/", showroomController.getShowrooms);
router.patch("/:id", showroomController.updateShowroom);
router.delete("/:id", showroomController.deleteShowroom);

module.exports = router;
