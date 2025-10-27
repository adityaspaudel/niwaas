const express = require("express");

const router = express.Router();
const {
	createRoom,
	updateRoom,
	deleteRoom,
} = require("../controllers/roomController");

router.post("/room/:adminId/createRoom", createRoom);
router.put("/room/:adminId/updateRoom", updateRoom);
router.delete("/room/deleteRoom", deleteRoom);

module.exports = router;
