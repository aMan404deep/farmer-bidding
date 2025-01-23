const express = require("express");
const { placeBid } = require("../controllers/transporter");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/bid", authenticate, placeBid);

module.exports = router;
