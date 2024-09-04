const express = require("express");
const router = express.Router();
const playerController = require("../../controller/cardgen/player.controller");
const validateRequest = require("../../middlewares/validateRequest");

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);
//  validateRequest(playerSchema)
router.post("/", playerController.createPlayer);
router.patch("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router;

