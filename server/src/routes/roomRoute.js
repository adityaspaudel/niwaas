const express = require("express");

const router = express.Router();
const {createRoom}=require('../controllers/roomController')



router.post("/room/:adminId/createRoom/", createRoom);
module.exports=router