const { Router } = require("express");
const router = Router();
const fileController = require("../controller/file.controller");
//
router.post("/", fileController.createFile);
router.get("/", fileController.getFilees);
router.patch("/:id", fileController.updateFile);
router.delete("/:id", fileController.deleteFile);
//
module.exports = router;
