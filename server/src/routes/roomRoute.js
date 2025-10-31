const express = require("express");

const router = express.Router();
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getSingleRoomData,
} = require("../controllers/roomController");

const upload = require("../middlewares/multerConfig");

router.post("/room/:adminId/createRoom", upload.array("images", 5), createRoom);
router.put("/room/:adminId/updateRoom", updateRoom);
router.delete("/room/:adminId/deleteRoom", deleteRoom);
router.get("/room/:adminId/getRoom", getRoom);
router.get("/room/:roomId/getSingleRoomData", getSingleRoomData);

module.exports = router;
