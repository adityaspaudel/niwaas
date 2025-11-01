const {
  userRegistration,
  userLogin,
  getGuestData,
} = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/user/userRegistration", userRegistration);

router.post("/user/userLogin", userLogin);
router.get("/user/:guestId/getGuestData", getGuestData);
module.exports = router;
