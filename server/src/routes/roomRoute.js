const express = require("express");

const router = express.Router();
const { createRoom, updateRoom } = require("../controllers/roomController");

router.post("/room/:adminId/createRoom/", createRoom);
router.put("/room/:adminId/updateRoom", updateRoom);

module.exports = router;
